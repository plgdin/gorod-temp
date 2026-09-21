const fs = require('fs');
const zlib = require('zlib');

// Read input PNG
const buf = fs.readFileSync('public/images/Gorod_Shipping_color.png');

let offset = 8;
const idatChunks = [];
while (offset < buf.length) {
  const len = buf.readUInt32BE(offset);
  const type = buf.toString('ascii', offset + 4, offset + 8);
  if (type === 'IDAT') idatChunks.push(buf.subarray(offset + 8, offset + 8 + len));
  offset += 12 + len;
}

const idat = Buffer.concat(idatChunks);
const raw = zlib.inflateSync(idat);

const srcWidth = 4961;
const srcHeight = 3508;
const srcRowSize = 1 + srcWidth * 4;

const img = Buffer.alloc(srcWidth * srcHeight * 4);

for (let y = 0; y < srcHeight; y++) {
  const filter = raw[y * srcRowSize];
  const rowOffset = y * srcRowSize + 1;
  const destRowOffset = y * srcWidth * 4;
  for (let x = 0; x < srcWidth; x++) {
    for (let c = 0; c < 4; c++) {
      const rawByte = raw[rowOffset + x * 4 + c];
      const a = x > 0 ? img[destRowOffset + (x - 1) * 4 + c] : 0;
      const b = y > 0 ? img[(y - 1) * srcWidth * 4 + x * 4 + c] : 0;
      const cVal = (x > 0 && y > 0) ? img[(y - 1) * srcWidth * 4 + (x - 1) * 4 + c] : 0;
      let val = rawByte;
      if (filter === 1) val = (rawByte + a) & 0xff;
      else if (filter === 2) val = (rawByte + b) & 0xff;
      else if (filter === 3) val = (rawByte + Math.floor((a + b) / 2)) & 0xff;
      else if (filter === 4) {
        const p = a + b - cVal;
        const pa = Math.abs(p - a);
        const pb = Math.abs(p - b);
        const pc = Math.abs(p - cVal);
        let pr = a;
        if (pb < pa && pb < pc) pr = b;
        else if (pc < pa) pr = cVal;
        val = (rawByte + pr) & 0xff;
      }
      img[destRowOffset + x * 4 + c] = val;
    }
  }
}

// Exact logo bounds without distant single-pixel noise
const minX = 1650;
const maxX = 3310;
const minY = 1360;
const maxY = 2100;
const pad = 10;
const cropX = minX - pad;
const cropY = minY - pad;
const cropW = (maxX - minX + 1) + pad * 2;
const cropH = (maxY - minY + 1) + pad * 2;

console.log('Crop geometry:', { cropX, cropY, cropW, cropH });

// Downsample or keep crisp: let's downscale to max 1200px width for fast web loading and sharp display
const scale = Math.min(1, 1200 / cropW);
const targetW = Math.round(cropW * scale);
const targetH = Math.round(cropH * scale);

console.log('Target size:', { targetW, targetH });

// Create output uncompressed scanlines with filter byte 0
const outRaw = Buffer.alloc(targetH * (1 + targetW * 4));
for (let ty = 0; ty < targetH; ty++) {
  outRaw[ty * (1 + targetW * 4)] = 0; // filter 0
  const sy = cropY + Math.min(cropH - 1, Math.floor(ty / scale));
  for (let tx = 0; tx < targetW; tx++) {
    const sx = cropX + Math.min(cropW - 1, Math.floor(tx / scale));
    const srcPos = (sy * srcWidth + sx) * 4;
    const destPos = ty * (1 + targetW * 4) + 1 + tx * 4;
    outRaw[destPos] = img[srcPos];
    outRaw[destPos + 1] = img[srcPos + 1];
    outRaw[destPos + 2] = img[srcPos + 2];
    outRaw[destPos + 3] = img[srcPos + 3];
  }
}

// Deflate
const compressed = zlib.deflateSync(outRaw);

// CRC32 table
const crcTable = [];
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    if (c & 1) c = 0xedb88320 ^ (c >>> 1);
    else c = c >>> 1;
  }
  crcTable[n] = c >>> 0;
}
function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  }
  return (c ^ 0xffffffff) >>> 0;
}

function makeChunk(type, data) {
  const len = data.length;
  const chunk = Buffer.alloc(12 + len);
  chunk.writeUInt32BE(len, 0);
  chunk.write(type, 4, 4, 'ascii');
  data.copy(chunk, 8);
  const typeAndData = chunk.subarray(4, 8 + len);
  chunk.writeUInt32BE(crc32(typeAndData), 8 + len);
  return chunk;
}

// Build PNG
const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

// IHDR
const ihdrData = Buffer.alloc(13);
ihdrData.writeUInt32BE(targetW, 0);
ihdrData.writeUInt32BE(targetH, 4);
ihdrData[8] = 8; // 8 bit
ihdrData[9] = 6; // RGBA
ihdrData[10] = 0; // compression
ihdrData[11] = 0; // filter
ihdrData[12] = 0; // interlace
const ihdrChunk = makeChunk('IHDR', ihdrData);

// IDAT
const idatChunk = makeChunk('IDAT', compressed);

// IEND
const iendChunk = makeChunk('IEND', Buffer.alloc(0));

const finalPng = Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);

fs.writeFileSync('public/images/gorod-shipping-logo.png', finalPng);
fs.writeFileSync('public/gorod-shipping.png', finalPng);
console.log('Successfully written cropped logo to public/images/gorod-shipping-logo.png and public/gorod-shipping.png!');
