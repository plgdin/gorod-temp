/**
 * Web Audio API synthesizer for industrial crane sounds
 * Realistic mechanical clanks, winch motor hum, and pneumatic releases
 */

class CraneAudioController {
  private ctx: AudioContext | null = null;
  private motorOsc: OscillatorNode | null = null;
  private motorGain: GainNode | null = null;
  public enabled: boolean = false;

  private initCtx() {
    if (this.ctx) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    } catch {
      // AudioContext not supported or blocked
    }
  }

  public setEnabled(enable: boolean) {
    this.enabled = enable;
    if (enable) {
      this.initCtx();
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    } else {
      this.stopMotor();
    }
  }

  public playTwistlock() {
    if (!this.enabled) return;
    this.initCtx();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    
    // Metallic impact 1
    const osc1 = this.ctx.createOscillator();
    const gain1 = this.ctx.createGain();
    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(140, t);
    osc1.frequency.exponentialRampToValueAtTime(45, t + 0.12);
    gain1.gain.setValueAtTime(0.3, t);
    gain1.gain.exponentialRampToValueAtTime(0.001, t + 0.15);

    osc1.connect(gain1);
    gain1.connect(this.ctx.destination);
    osc1.start(t);
    osc1.stop(t + 0.15);

    // Mechanical lock latch click 2 (slightly delayed)
    const osc2 = this.ctx.createOscillator();
    const gain2 = this.ctx.createGain();
    osc2.type = 'square';
    osc2.frequency.setValueAtTime(320, t + 0.08);
    osc2.frequency.exponentialRampToValueAtTime(110, t + 0.18);
    gain2.gain.setValueAtTime(0, t);
    gain2.gain.setValueAtTime(0.2, t + 0.08);
    gain2.gain.exponentialRampToValueAtTime(0.001, t + 0.22);

    osc2.connect(gain2);
    gain2.connect(this.ctx.destination);
    osc2.start(t + 0.08);
    osc2.stop(t + 0.25);
  }

  public startMotor() {
    if (!this.enabled) return;
    this.initCtx();
    if (!this.ctx) return;

    this.stopMotor();

    const t = this.ctx.currentTime;
    this.motorOsc = this.ctx.createOscillator();
    this.motorGain = this.ctx.createGain();

    this.motorOsc.type = 'sawtooth';
    this.motorOsc.frequency.setValueAtTime(55, t);
    this.motorOsc.frequency.linearRampToValueAtTime(78, t + 1.2);

    // Lowpass filter for deep heavy industrial rumble
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(180, t);

    this.motorGain.gain.setValueAtTime(0.001, t);
    this.motorGain.gain.linearRampToValueAtTime(0.07, t + 0.6);

    this.motorOsc.connect(filter);
    filter.connect(this.motorGain);
    this.motorGain.connect(this.ctx.destination);

    this.motorOsc.start(t);
  }

  public stopMotor() {
    if (!this.motorOsc || !this.motorGain || !this.ctx) return;
    try {
      const t = this.ctx.currentTime;
      this.motorGain.gain.linearRampToValueAtTime(0.001, t + 0.4);
      this.motorOsc.stop(t + 0.4);
      setTimeout(() => {
        this.motorOsc = null;
        this.motorGain = null;
      }, 450);
    } catch {
      this.motorOsc = null;
      this.motorGain = null;
    }
  }

  public playPneumatic() {
    if (!this.enabled) return;
    this.initCtx();
    if (!this.ctx) return;

    const bufferSize = this.ctx.sampleRate * 0.35;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 1200;
    filter.Q.value = 1.8;

    const gain = this.ctx.createGain();
    const t = this.ctx.currentTime;
    gain.gain.setValueAtTime(0.08, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start(t);
  }
}

export const craneAudio = new CraneAudioController();
