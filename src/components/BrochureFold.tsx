import { useEffect, useState, type CSSProperties } from "react";
import brochureImage from "../assets/gorod_brochure.png";
import "./BrochureFold.css";

const prompts = [
  "Click to open the right fold",
  "Click to open the left fold",
  "Click to fold the brochure again",
];

export default function BrochureFold() {
  const [fold, setFold] = useState(0);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (!closing) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const timeout = window.setTimeout(
      () => setClosing(false),
      reducedMotion ? 0 : 2450
    );

    return () => window.clearTimeout(timeout);
  }, [closing]);

  function handleClick() {
    if (fold === 2) {
      setClosing(true);
      setFold(0);
    } else {
      setFold(fold + 1);
    }
  }

  const instruction = closing ? "Folding the brochure" : prompts[fold];

  return (
    <section className="fold-brochure-section" aria-label="Interactive brochure">
      <button
        className={`fold-brochure fold-brochure--step-${fold}${
          closing ? " fold-brochure--closing" : ""
        }`}
        type="button"
        onClick={handleClick}
        disabled={closing}
        aria-label={instruction}
        style={
          { "--brochure-image": `url("${brochureImage}")` } as CSSProperties
        }
      >
        <span
          className="fold-brochure__panel fold-brochure__panel--middle"
          aria-hidden="true"
        />

        <span
          className="fold-brochure__panel fold-brochure__panel--right"
          aria-hidden="true"
        >
          <span className="fold-brochure__face fold-brochure__face--right" />
          <span className="fold-brochure__face fold-brochure__face--reverse" />
        </span>

        <span
          className="fold-brochure__panel fold-brochure__panel--left"
          aria-hidden="true"
        >
          <span className="fold-brochure__face fold-brochure__face--left" />
          <span className="fold-brochure__face fold-brochure__face--left fold-brochure__face--back" />
        </span>
      </button>

      <p className="fold-brochure__hint" aria-live="polite">
        {instruction}
      </p>
    </section>
  );
}
