"use client";

import { useState } from "react";

function TextExpander({ children }) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (typeof children !== "string") return null;

  const words = children.split(" ");
  const isLong = words.length > 40;

  const displayText =
    isExpanded || !isLong ? children : words.slice(0, 40).join(" ") + "...";

  return (
    <span>
      {displayText}{" "}
      <button
        className="text-primary-700 border-b border-primary-700 leading-3 pb-1"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? "close" : "Show more"}
      </button>
    </span>
  );
}

export default TextExpander;
