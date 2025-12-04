"use client";

import { useId } from "react";

type ToggleSwitchProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string; // Visible label
  srLabel?: string; // Screen-reader only label fallback
  color?: string;
  className?: string;
};

export default function ToggleSwitch({
  checked,
  onChange,
  label,
  srLabel,
  color = "#17A745", // Default green
  className = "",
}: ToggleSwitchProps) {
  const id = useId();
  const accessibleLabel = srLabel ?? label;
  const labelProps = accessibleLabel
    ? { "aria-label": accessibleLabel, title: accessibleLabel }
    : {};

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {label && (
        <span className="text-xs text-white/40">{label}</span>
      )}
      <label
        htmlFor={id}
        className="toggle-switch"
        {...labelProps}
        style={{
          fontSize: "14px",
          position: "relative",
          display: "inline-block",
          width: "1.2em",
          height: "2.8em",
        }}
      >
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="toggle-switch-input"
          style={{
            opacity: 0,
            width: 0,
            height: 0,
            position: "absolute",
          }}
        />
        <span
          className="toggle-switch-slider"
          style={{
            position: "absolute",
            cursor: "pointer",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: checked ? color : "rgba(255,255,255,0.2)",
            transition: "0.3s",
            borderRadius: "4px",
          }}
        >
          {/* The toggle knob */}
          <span
            style={{
              position: "absolute",
              content: '""',
              height: "0.5em",
              width: "2em",
              borderRadius: "3px",
              left: "-0.4em",
              top: checked ? "calc(100% - 0.7em)" : "0.2em",
              backgroundColor: "white",
              boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
              transition: "0.3s",
            }}
          />
          {/* Power icon */}
          <span
            style={{
              position: "absolute",
              top: checked ? "0.3em" : "calc(100% - 1.1em)",
              left: "50%",
              transform: "translateX(-50%)",
              width: "0.4em",
              height: "0.6em",
              transition: "0.3s",
            }}
          >
            {/* Vertical line of power icon */}
            <span
              style={{
                position: "absolute",
                top: 0,
                left: "50%",
                transform: "translateX(-50%)",
                width: "2px",
                height: "0.3em",
                backgroundColor: checked ? "white" : "rgba(255,255,255,0.5)",
                borderRadius: "1px",
                transition: "0.3s",
              }}
            />
            {/* Circle of power icon */}
            <span
              style={{
                position: "absolute",
                bottom: 0,
                left: "50%",
                transform: "translateX(-50%)",
                width: "0.35em",
                height: "0.35em",
                borderStyle: "solid",
                borderWidth: "2px",
                borderTopColor: "transparent",
                borderRightColor: checked ? "white" : "rgba(255,255,255,0.5)",
                borderBottomColor: checked ? "white" : "rgba(255,255,255,0.5)",
                borderLeftColor: checked ? "white" : "rgba(255,255,255,0.5)",
                borderRadius: "50%",
                transition: "0.3s",
              }}
            />
          </span>
        </span>
      </label>
    </div>
  );
}

