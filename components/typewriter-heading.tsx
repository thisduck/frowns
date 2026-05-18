"use client";

import { useState, useEffect, useRef } from "react";

const CHAR_DELAY = 38;
const HOLD_MS = 3000;

export function TypewriterHeading({
  lines,
  tag: Tag = "h1",
}: {
  lines: string[];
  tag?: keyof JSX.IntrinsicElements;
}) {
  const [lineIdx, setLineIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout>>();
  useEffect(() => {
    const current = lines[lineIdx];
    let i = 0;
    setDisplayed("");

    const typeChar = () => {
      i++;
      setDisplayed(current.slice(0, i));

      if (i < current.length) {
        timer.current = setTimeout(typeChar, CHAR_DELAY);
      } else {
        timer.current = setTimeout(() => {
          setLineIdx((idx) => (idx + 1) % lines.length);
        }, HOLD_MS);
      }
    };

    timer.current = setTimeout(typeChar, CHAR_DELAY);
    return () => clearTimeout(timer.current);
  }, [lineIdx, lines]);

  return (
    <Tag className="typewriter" aria-label={lines[lineIdx]}>
      {lines.map((l) => (
        <span className="typewriter-sizer" aria-hidden="true" key={l}>{l}</span>
      ))}
      <span className="typewriter-text">
        {displayed}
        <span className="typewriter-cursor" aria-hidden="true" />
      </span>
    </Tag>
  );
}
