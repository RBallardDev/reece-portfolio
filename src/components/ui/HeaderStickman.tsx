"use client";

import { useEffect, useRef, useState } from "react";

type StickmanState = "walking" | "running" | "cornered" | "caught" | "respawning" | "grateful" | "exiting";

type HeaderStickmanProps = {
  exiting?: boolean;
  onExitComplete?: () => void;
};

const CONFETTI_COLORS = [
  "#163CE0", "#FFD20F", "#F6082A",
  "#FF8509", "#17A745", "#EF9CE2",
];

const THANK_MESSAGES = ["Thanks!", "ありがとう"];
const HEAD_FACE_RIGHT = "50% 12% 12% 50%";
const HEAD_FACE_LEFT = "12% 50% 50% 12%";

function spawnConfetti(container: HTMLElement, x: number, y: number) {
  const particleCount = 30 + Math.floor(Math.random() * 15);
  const particles: HTMLDivElement[] = [];

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.className = "confetti-particle";
    const color = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
    const size = 4 + Math.random() * 4;
    const angle = Math.random() * Math.PI * 2;
    const velocity = 40 + Math.random() * 60;
    const vx = Math.cos(angle) * velocity;
    const vy = Math.sin(angle) * velocity - 30;
    const rotation = Math.random() * 360;

    particle.style.cssText = `
      position: absolute;
      left: ${x}px;
      top: ${y}px;
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      border-radius: ${Math.random() > 0.5 ? "50%" : "2px"};
      pointer-events: none;
      --vx: ${vx}px;
      --vy: ${vy}px;
      --rotation: ${rotation}deg;
    `;

    container.appendChild(particle);
    particles.push(particle);
  }

  setTimeout(() => {
    particles.forEach((p) => p.remove());
  }, 900);
}

export default function HeaderStickman({ exiting = false, onExitComplete }: HeaderStickmanProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const figureRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);
  const bubbleTextRef = useRef<HTMLSpanElement>(null);
  // Limb refs for per-frame transform updates
  const leftArmRef = useRef<HTMLDivElement>(null);
  const rightArmRef = useRef<HTMLDivElement>(null);
  const leftLegRef = useRef<HTMLDivElement>(null);
  const rightLegRef = useRef<HTMLDivElement>(null);
  // Head ref for direction-based face
  const headRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const exitingRef = useRef(false);

  // Refs for animation state (no re-renders)
  const stateRef = useRef<StickmanState>("walking");
  const xRef = useRef(0);
  const directionRef = useRef(1);
  const cursorXRef = useRef<number | null>(null);
  const cursorYRef = useRef<number | null>(null);
  const cooldownRef = useRef(false);
  const isTouchDevice = useRef(false);
  const walkPhaseRef = useRef(0);
  const corneredStartRef = useRef<number | null>(null);
  const releaseStartRef = useRef<number | null>(null);
  const corneredSideRef = useRef<"left" | "right">("left");
  // Locomotion blend: 0 = walk, 1 = run
  const locomotionBlendRef = useRef(0);

  useEffect(() => {
    isTouchDevice.current = "ontouchstart" in window || navigator.maxTouchPoints > 0;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const widthQuery = window.matchMedia("(max-width: 639px)");

    const updateVisibility = () => {
      setVisible(!motionQuery.matches && !widthQuery.matches);
    };

    updateVisibility();
    motionQuery.addEventListener("change", updateVisibility);
    widthQuery.addEventListener("change", updateVisibility);

    return () => {
      motionQuery.removeEventListener("change", updateVisibility);
      widthQuery.removeEventListener("change", updateVisibility);
    };
  }, []);

  // Handle exit animation when navigating away
  useEffect(() => {
    if (!exiting || exitingRef.current) return;
    exitingRef.current = true;

    const figure = figureRef.current;
    if (!figure) {
      onExitComplete?.();
      return;
    }

    // Stop current animation state
    stateRef.current = "exiting";
    figure.classList.remove("stickman-running", "stickman-cornered", "stickman-grateful");
    
    // Hands up pose (same as caught)
    figure.classList.add("stickman-caught");
    
    // Clear limb transforms
    const leftArm = leftArmRef.current;
    const rightArm = rightArmRef.current;
    const leftLeg = leftLegRef.current;
    const rightLeg = rightLegRef.current;
    if (leftArm) leftArm.style.transform = "";
    if (rightArm) rightArm.style.transform = "";
    if (leftLeg) leftLeg.style.transform = "";
    if (rightLeg) rightLeg.style.transform = "";

    // Start fadeout after brief hands-up moment
    setTimeout(() => {
      figure.classList.add("stickman-fadeout");
    }, 150);

    // Complete after fadeout animation
    setTimeout(() => {
      onExitComplete?.();
    }, 650);
  }, [exiting, onExitComplete]);

  useEffect(() => {
    if (!visible) return;

    const container = containerRef.current;
    const wrapper = wrapperRef.current;
    const figure = figureRef.current;
    const shadow = shadowRef.current;
    const bubble = bubbleRef.current;
    const bubbleText = bubbleTextRef.current;
    const leftArm = leftArmRef.current;
    const rightArm = rightArmRef.current;
    const leftLeg = leftLegRef.current;
    const rightLeg = rightLegRef.current;
    const head = headRef.current;
    if (!container || !wrapper || !figure || !shadow || !bubble || !bubbleText) return;
    if (!leftArm || !rightArm || !leftLeg || !rightLeg || !head) return;

    // Initialize position
    xRef.current = Math.random() * Math.max(0, container.offsetWidth - 16);
    directionRef.current = Math.random() > 0.5 ? 1 : -1;
    wrapper.style.transform = `translateX(${xRef.current}px)`;

    const baseSpeed = 0.6;
    const runSpeed = 2.5;
    const nearDistance = 80;
    const catchDistance = 20;
    const cornerThreshold = 8;
    const gratefulDuration = 1200;

    // Walk vs Run animation parameters
    const walkFreq = 0.008;      // slower cadence
    const runFreq = 0.018;       // faster cadence
    const walkArmAmp = 25;       // degrees - smaller swing
    const runArmAmp = 50;        // degrees - larger swing
    const walkLegAmp = 20;       // degrees - smaller stride
    const runLegAmp = 40;        // degrees - larger stride
    const walkLean = 7;          // degrees
    const runLean = 12;          // deeper forward lean
    const walkBounce = 2.0;      // px
    const runBounce = 3.5;       // px - stronger bounce
    const blendSpeed = 0.008;    // how fast to transition (per ms)

    // Lerp helper
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    let rafId: number;
    let lastTime = performance.now();

    const handlePointerMove = (e: PointerEvent) => {
      if (isTouchDevice.current) return;
      const rect = container.getBoundingClientRect();
      cursorXRef.current = e.clientX - rect.left;
      cursorYRef.current = e.clientY - rect.top;
    };

    const handlePointerLeave = () => {
      cursorXRef.current = null;
      cursorYRef.current = null;
    };

    container.addEventListener("pointermove", handlePointerMove);
    container.addEventListener("pointerleave", handlePointerLeave);

    const showBubble = (side: "left" | "right"): string => {
      // Pick random message
      const msg = THANK_MESSAGES[Math.floor(Math.random() * THANK_MESSAGES.length)];
      bubbleText.textContent = msg;
      // Set side via data attribute
      bubble.dataset.side = side;
      bubble.classList.add("stickman-bubble-visible");
      return msg;
    };

    const hideBubble = () => {
      bubble.classList.remove("stickman-bubble-visible");
    };

    // Clear inline limb transforms so CSS can take over
    const clearLimbTransforms = () => {
      leftArm.style.transform = "";
      rightArm.style.transform = "";
      leftLeg.style.transform = "";
      rightLeg.style.transform = "";
    };

    const triggerGratefulSequence = () => {
      stateRef.current = "grateful";
      figure.classList.remove("stickman-cornered");
      // Add grateful class to stop animations and lower arms
      figure.classList.add("stickman-grateful");
      // Clear inline transforms so CSS grateful styles apply
      clearLimbTransforms();
      // Show bubble on opposite side of corner (right if trapped left, left if trapped right)
      const bubbleSide = corneredSideRef.current === "left" ? "right" : "left";
      const msg = showBubble(bubbleSide);

      // Stand still
      figure.style.transform = `rotate(0deg) translateY(0px)`;
      figure.classList.remove("stickman-bow-left", "stickman-bow-right");

      // Face toward the bubble
      head.style.borderRadius = bubbleSide === "right" ? HEAD_FACE_RIGHT : HEAD_FACE_LEFT;

      // If Japanese message, bow toward the bubble using upper-body class
      if (msg === "ありがとう") {
        const bowClass = bubbleSide === "right" ? "stickman-bow-right" : "stickman-bow-left";
        figure.classList.add(bowClass);
      }

      setTimeout(() => {
        hideBubble();
        figure.classList.remove("stickman-grateful");
        figure.classList.remove("stickman-bow-left", "stickman-bow-right");
        figure.style.transform = `rotate(0deg) translateY(0px)`;
        stateRef.current = "walking";
        releaseStartRef.current = null;
        corneredStartRef.current = null;
      }, gratefulDuration);
    };

    const triggerCaughtSequence = () => {
      stateRef.current = "caught";
      figure.classList.add("stickman-caught");
      figure.classList.remove("stickman-cornered");
      // Clear inline transforms so CSS caught styles apply
      clearLimbTransforms();
      hideBubble();

      setTimeout(() => {
        const stickmanRect = wrapper.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        const confettiX = stickmanRect.left - containerRect.left + 8;
        const confettiY = stickmanRect.top - containerRect.top + 14;
        spawnConfetti(container, confettiX, confettiY);
      }, 350);

      setTimeout(() => {
        figure.classList.add("stickman-fadeout");
      }, 600);

      setTimeout(() => {
        stateRef.current = "respawning";
        figure.style.opacity = "0";
        figure.classList.remove("stickman-caught", "stickman-fadeout");

        const maxX = Math.max(0, container.offsetWidth - 16);
        xRef.current = Math.random() * maxX;
        directionRef.current = Math.random() > 0.5 ? 1 : -1;
        wrapper.style.transform = `translateX(${xRef.current}px)`;
        figure.style.transform = `rotate(0deg) translateY(0px)`;
        shadow.style.transform = `scaleX(1) scaleY(1)`;
      }, 1900);

      setTimeout(() => {
        figure.style.opacity = "1";
        figure.classList.add("stickman-fadein");
        stateRef.current = "walking";
        cooldownRef.current = true;
        figure.classList.remove("stickman-running");
        walkPhaseRef.current = 0;

        setTimeout(() => {
          figure.classList.remove("stickman-fadein");
        }, 300);

        setTimeout(() => {
          cooldownRef.current = false;
        }, 1500);
      }, 2300);
    };

    const animate = (time: number) => {
      const dt = time - lastTime;
      lastTime = time;

      const state = stateRef.current;
      if (state === "caught" || state === "respawning" || state === "grateful" || state === "exiting") {
        // Don't update transforms for these states - they're handled elsewhere
        rafId = requestAnimationFrame(animate);
        return;
      }

      const maxX = container.offsetWidth - 16;
      const stickmanCenterX = xRef.current + 8;
      const stickmanCenterY = 14;

      let speed = baseSpeed;
      let newState: StickmanState = "walking";
      let isCornered = false;

      // Check cursor proximity
      const cursorActive = cursorXRef.current !== null && cursorYRef.current !== null;

      if (cursorActive && !cooldownRef.current) {
        const dx = cursorXRef.current! - stickmanCenterX;
        const dy = cursorYRef.current! - stickmanCenterY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < catchDistance) {
          triggerCaughtSequence();
          rafId = requestAnimationFrame(animate);
          return;
        } else if (distance < nearDistance) {
          const escapeDirection = dx > 0 ? -1 : 1;
          const atLeftEdge = xRef.current <= cornerThreshold;
          const atRightEdge = xRef.current >= maxX - cornerThreshold;

          // Check if cornered
          if ((atLeftEdge && escapeDirection === -1) || (atRightEdge && escapeDirection === 1)) {
            isCornered = true;
            newState = "cornered";
            // Track which side he's cornered on
            corneredSideRef.current = atLeftEdge ? "left" : "right";

            if (stateRef.current !== "cornered") {
              corneredStartRef.current = time;
              releaseStartRef.current = null;
            }
          } else {
            newState = "running";
            speed = runSpeed;
            directionRef.current = escapeDirection;
            corneredStartRef.current = null;
            releaseStartRef.current = null;
          }
        } else {
          // Cursor far away - trigger grateful if was cornered
          if (stateRef.current === "cornered") {
            triggerGratefulSequence();
            rafId = requestAnimationFrame(animate);
            return;
          } else {
            corneredStartRef.current = null;
            releaseStartRef.current = null;
          }
        }
      } else {
        // Cursor not present - trigger grateful if was cornered
        if (stateRef.current === "cornered") {
          triggerGratefulSequence();
          rafId = requestAnimationFrame(animate);
          return;
        } else {
          corneredStartRef.current = null;
          releaseStartRef.current = null;
        }
      }

      // Update classes (for special states only, not for walk/run animation)
      if (newState === "running" && stateRef.current !== "running") {
        figure.classList.remove("stickman-cornered");
      } else if (newState === "cornered" && stateRef.current !== "cornered") {
        figure.classList.add("stickman-cornered");
        // Clear inline transforms so CSS cornered styles apply
        clearLimbTransforms();
        // Flip direction so he walks away from corner when released
        directionRef.current = corneredSideRef.current === "left" ? 1 : -1;
        // Update head to face away from corner
        head.style.borderRadius = directionRef.current === 1 ? HEAD_FACE_RIGHT : HEAD_FACE_LEFT;
      } else if (newState === "walking") {
        figure.classList.remove("stickman-cornered");
      }
      stateRef.current = newState;

      // Move (unless cornered)
      if (!isCornered) {
        xRef.current += speed * directionRef.current;

        // Bounce at edges
        if (xRef.current >= maxX) {
          xRef.current = maxX;
          directionRef.current = -1;
        } else if (xRef.current <= 0) {
          xRef.current = 0;
          directionRef.current = 1;
        }
      }

      // Determine target locomotion blend: 1 for running, 0 for walking
      const targetBlend = newState === "running" ? 1 : 0;
      // Ease toward target blend
      const blendDelta = blendSpeed * dt;
      if (locomotionBlendRef.current < targetBlend) {
        locomotionBlendRef.current = Math.min(locomotionBlendRef.current + blendDelta, targetBlend);
      } else if (locomotionBlendRef.current > targetBlend) {
        locomotionBlendRef.current = Math.max(locomotionBlendRef.current - blendDelta, targetBlend);
      }
      const blend = locomotionBlendRef.current;

      // Compute blended animation parameters
      const freq = lerp(walkFreq, runFreq, blend);
      const armAmp = lerp(walkArmAmp, runArmAmp, blend);
      const legAmp = lerp(walkLegAmp, runLegAmp, blend);
      const leanDeg = lerp(walkLean, runLean, blend);
      const maxBounce = lerp(walkBounce, runBounce, blend);

      // Update walk phase using blended frequency
      walkPhaseRef.current += dt * freq;
      const phase = walkPhaseRef.current;

      // Calculate limb rotations using sine wave
      // Arms and legs swing opposite to each other (left arm forward = right leg forward)
      const sinPhase = Math.sin(phase);
      const leftArmRot = sinPhase * armAmp;
      const rightArmRot = -sinPhase * armAmp;
      const leftLegRot = -sinPhase * legAmp;
      const rightLegRot = sinPhase * legAmp;

      // Apply limb transforms (unless in special state)
      if (!isCornered) {
        leftArm.style.transform = `rotate(${leftArmRot}deg)`;
        rightArm.style.transform = `rotate(${rightArmRot}deg)`;
        leftLeg.style.transform = `rotate(${leftLegRot}deg)`;
        rightLeg.style.transform = `rotate(${rightLegRot}deg)`;
      }

      // Update head shape to show face direction (flat side = face)
      // Direction 1 = moving right, flat on right; Direction -1 = moving left, flat on left
      const headRadius = directionRef.current === 1
        ? HEAD_FACE_RIGHT  // flat right (face right)
        : HEAD_FACE_LEFT; // flat left (face left)
      head.style.borderRadius = headRadius;

      // Calculate bounce (sharper dip at contact using abs(sin)^1.5)
      const bounce = isCornered ? 0 : Math.pow(Math.abs(Math.sin(phase)), 1.5) * maxBounce;

      // Calculate lean
      const lean = isCornered ? 0 : directionRef.current * leanDeg;

      // Apply transforms
      wrapper.style.transform = `translateX(${xRef.current}px)`;
      figure.style.transform = `rotate(${lean}deg) translateY(-${bounce}px)`;

      // Shadow scales inversely with bounce
      const shadowScale = 1 - (bounce / Math.max(walkBounce, runBounce)) * 0.3;
      shadow.style.transform = `scaleX(${shadowScale}) scaleY(${shadowScale * 0.6})`;
      shadow.style.opacity = isCornered ? "0.2" : `${0.25 + (1 - shadowScale) * 0.1}`;

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      ref={containerRef}
      className="relative w-full h-7 pointer-events-auto"
    >
      <div
        ref={wrapperRef}
        className="absolute bottom-0 left-0"
        style={{ width: "16px", height: "28px" }}
      >
        {/* Shadow */}
        <div
          ref={shadowRef}
          className="stickman-shadow absolute"
          style={{
            bottom: "-2px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "10px",
            height: "4px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.3)",
            opacity: 0.3,
          }}
        />
        {/* Figure container for lean/bounce */}
        <div
          ref={figureRef}
          className="stickman-body absolute w-full h-full"
          style={{ transformOrigin: "center bottom" }}
        >
          <div className="stickman-upper">
            {/* Head - D-shaped with flat side as face */}
            <div
              ref={headRef}
              className="absolute"
              style={{
                top: 0,
                left: "50%",
                transform: "translateX(-50%)",
                width: "8px",
                height: "8px",
                border: "2px solid rgba(255,255,255,1)",
                borderRadius: "50%", // Initial, will be updated by JS
              }}
            />
            {/* Body */}
            <div
              className="absolute bg-white"
              style={{
                top: "10px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "2px",
                height: "8px",
              }}
            />
            {/* Left arm */}
            <div
              ref={leftArmRef}
              className="stickman-left-arm absolute bg-white"
              style={{
                top: "11px",
                left: "50%",
                marginLeft: "-1px",
                width: "2px",
                height: "6px",
                transformOrigin: "top center",
              }}
            />
            {/* Right arm */}
            <div
              ref={rightArmRef}
              className="stickman-right-arm absolute bg-white"
              style={{
                top: "11px",
                left: "50%",
                width: "2px",
                height: "6px",
                transformOrigin: "top center",
              }}
            />
          </div>
          {/* Left leg */}
          <div
            ref={leftLegRef}
            className="stickman-left-leg absolute bg-white"
            style={{
              top: "18px",
              left: "50%",
              marginLeft: "-1px",
              width: "2px",
              height: "10px",
              transformOrigin: "top center",
            }}
          />
          {/* Right leg */}
          <div
            ref={rightLegRef}
            className="stickman-right-leg absolute bg-white"
            style={{
              top: "18px",
              left: "50%",
              width: "2px",
              height: "10px",
              transformOrigin: "top center",
            }}
          />
        </div>
        {/* Speech bubble */}
        <div
          ref={bubbleRef}
          className="stickman-bubble"
        >
          <div className="stickman-bubble-nub" />
          <span ref={bubbleTextRef}>Thanks!</span>
        </div>
      </div>
    </div>
  );
}
