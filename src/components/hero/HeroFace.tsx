"use client";

import { useEffect, useState, useRef } from "react";

type EyeState = "center" | "left" | "right";
type FaceAction = "idle" | "look-left" | "look-right" | "wink";

// Same timing as explore button
const EYES_APPEAR_DELAY = 8000;

export default function HeroFace() {
  const [eyeState, setEyeState] = useState<EyeState>("center");
  const [isWinking, setIsWinking] = useState(false);
  const [eyesVisible, setEyesVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const actionQueueRef = useRef<FaceAction[]>([]);
  const isAnimatingRef = useRef(false);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(motionQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };
    motionQuery.addEventListener("change", handleMotionChange);

    return () => {
      motionQuery.removeEventListener("change", handleMotionChange);
    };
  }, []);

  // Eyes fade in after 8 seconds (same as explore button)
  useEffect(() => {
    const timer = setTimeout(() => setEyesVisible(true), EYES_APPEAR_DELAY);
    return () => clearTimeout(timer);
  }, []);

  // Random face actions - start after eyes are visible
  useEffect(() => {
    if (reducedMotion || !eyesVisible) return;

    const performAction = (action: FaceAction) => {
      return new Promise<void>((resolve) => {
        switch (action) {
          case "look-left":
            setEyeState("left");
            setTimeout(() => {
              setEyeState("center");
              setTimeout(resolve, 300);
            }, 800);
            break;
          case "look-right":
            setEyeState("right");
            setTimeout(() => {
              setEyeState("center");
              setTimeout(resolve, 300);
            }, 800);
            break;
          case "wink":
            setIsWinking(true);
            setTimeout(() => {
              setIsWinking(false);
              setTimeout(resolve, 400);
            }, 500);
            break;
          default:
            setTimeout(resolve, 1000);
        }
      });
    };

    const runActions = async () => {
      if (isAnimatingRef.current) return;
      isAnimatingRef.current = true;

      while (actionQueueRef.current.length > 0) {
        const action = actionQueueRef.current.shift()!;
        await performAction(action);
      }

      isAnimatingRef.current = false;
    };

    const scheduleRandomAction = () => {
      // Random delay between 2-4 seconds
      const delay = 2000 + Math.random() * 2000;
      
      setTimeout(() => {
        // Pick a random action
        const actions: FaceAction[] = ["look-left", "look-right", "wink", "look-left", "look-right"];
        const randomAction = actions[Math.floor(Math.random() * actions.length)];
        
        actionQueueRef.current.push(randomAction);
        runActions();
        
        scheduleRandomAction();
      }, delay);
    };

    // Start random actions 2 seconds after eyes appear
    const startTimer = setTimeout(() => {
      scheduleRandomAction();
    }, 2000);

    return () => {
      clearTimeout(startTimer);
    };
  }, [reducedMotion, eyesVisible]);

  // Calculate eye positions based on state (arc movement)
  const getEyeTransform = (isLeftEye: boolean) => {
    const arcRadius = 10; // pixels - larger movement
    switch (eyeState) {
      case "left":
        // Both eyes look left (arc up-left)
        return `translate(${-arcRadius}px, ${-arcRadius * 0.25}px)`;
      case "right":
        // Both eyes look right (arc up-right)
        return `translate(${arcRadius}px, ${-arcRadius * 0.25}px)`;
      default:
        return "translate(0, 0)";
    }
  };

  return (
    <>
      {/* Mobile headline with animated eyebrows */}
      <h1 className="text-4xl font-bold leading-tight tracking-tight sm:hidden">
        <span className="inline-block">Full-stack</span>{" "}
        <span
          className="inline-block transition-transform duration-300 ease-out"
          style={{
            transform: isWinking ? "translateY(18px)" : "translateY(0)",
          }}
        >
          Engineer
        </span>
      </h1>

      {/* Desktop headline (unchanged) */}
      <h1 className="hidden sm:block text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
        <span className="interactive-headline relative inline cursor-default">
          Full-stack Engineer
        </span>
      </h1>

      {/* Eyes - mobile only, fade in with explore button */}
      <div
        className={`flex items-center justify-center gap-32 h-0 relative sm:hidden transition-all duration-700 ease-out ${
          eyesVisible ? "opacity-100 blur-0" : "opacity-0 blur-sm"
        }`}
        style={{ top: "12px" }}
        aria-hidden="true"
      >
        {/* Left eye */}
        <span
          className="block w-2.5 h-2.5 rounded-full bg-white transition-transform duration-200 ease-out"
          style={{
            transformOrigin: "center center",
            transform: getEyeTransform(true),
          }}
        />
        {/* Right eye */}
        <span
          className="block w-2.5 h-2.5 rounded-full bg-white transition-transform duration-200 ease-out"
          style={{
            transformOrigin: "center center",
            transform: getEyeTransform(false),
            opacity: isWinking ? 0 : 1,
            transition: "transform 0.2s ease-out, opacity 0.15s ease-out",
          }}
        />
      </div>
    </>
  );
}

