"use client";

import { useState, useEffect } from "react";

export function TypewriterHeading({ text, tag: Tag = "h1" }: { text: string; tag?: keyof JSX.IntrinsicElements }) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;
    const tick = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(tick);
    }, 38);
    return () => clearInterval(tick);
  }, [text]);

  return (
    <Tag className="typewriter" aria-label={text}>
      {displayed}
      <span className="typewriter-cursor" aria-hidden="true" />
    </Tag>
  );
}
