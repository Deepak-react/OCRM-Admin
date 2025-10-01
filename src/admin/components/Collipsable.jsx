// CollapsibleButton.jsx
import { Typography } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";

export default function CollapsibleButton({
  title = "Toggle",
  defaultOpen = false,
  children,
  className = "",
}) {
  const [open, setOpen] = useState(defaultOpen);
  const contentRef = useRef(null);
  const [maxHeight, setMaxHeight] = useState("0px");

  useEffect(() => {
    // update max-height to content's scrollHeight when open, else 0
    if (contentRef.current) {
      setMaxHeight(open ? `${contentRef.current.scrollHeight}px` : "0px");
    }
  }, [open, children]);

  return (
    <div className={`w-full ${className}`}>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((s) => !s)}
        className="w-full flex items-center justify-between rounded-md "
      >
        <Typography className="text-left font-medium">{title}</Typography>

        {/* simple chevron icon that rotates */}
        <svg
          className={`w-5 h-5 transform transition-transform duration-200 ${open ? "rotate-180" : "rotate-0"}`}
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M6 8l4 4 4-4" />
        </svg>
      </button>

      {/* animated container: transition on max-height */}
      <div
        ref={contentRef}
        style={{ maxHeight, transition: "max-height 240ms ease" }}
        className="overflow-hidden"
        aria-hidden={!open}
      >
        <div className="p-3 bg-white rounded-b-md">
          {children}
        </div>
      </div>
    </div>
  );
}
