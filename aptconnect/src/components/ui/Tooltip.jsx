import React from "react";
import { createPortal } from "react-dom";

// Helper for conditional class names
const clsx = (...classes) => classes.filter(Boolean).join(' ');

export default function TooltipPortal({ data }) {
  if (!data?.visible) return null;
  const { x, y, text, placement } = data;
  
  const style = {
    position: "fixed",
    left: `${x}px`,
    top: `${y}px`,
    pointerEvents: "none",
    zIndex: 9999,
    transform: placement === "top" ? "translate(-50%, -110%)" : "translate(0, -50%)",
  };

  const bubbleClasses = clsx(
    "bg-slate-200 text-slate-800 px-2 py-1.5 text-xs rounded-lg whitespace-nowrap shadow-xl"
  );

  return createPortal(
    <div style={style} role="tooltip" aria-hidden={!data.visible}>
      <div className={bubbleClasses}>{text}</div>
    </div>,
    document.body
  );
}
