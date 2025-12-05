"use client";

import React, { Suspense, useMemo, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Box3, Vector3, Scene, Group } from "three";

type ModelProps = {
  url: string;
  targetRot: React.MutableRefObject<{ x: number; y: number }>;
  reduceMotion: boolean;
};

function Model({ url, targetRot, reduceMotion }: ModelProps) {
  const { scene } = useGLTF(url) as unknown as { scene: Scene };

  const cloned = useMemo(() => {
    const c = scene.clone(true);
    const box = new Box3().setFromObject(c);
    const size = new Vector3();
    const center = new Vector3();
    box.getSize(size);
    box.getCenter(center);

    const maxAxis = Math.max(size.x, size.y, size.z);
    const targetSize = 1.8; // tweak to nicely fill the frame
    const scale = targetSize / maxAxis;

    c.scale.setScalar(scale);
    c.position.sub(center); // center at origin
    c.position.y -= size.y * 0.5; // lift so base rests near ground

    return c;
  }, [scene]);
  const groupRef = useRef<Group>(null);
  const currentRot = useRef({ x: 0, y: 0 });
  const baseY = 1.9; // raise the model higher in frame

  useFrame(({ clock }) => {
    if (!groupRef.current) return;

    if (reduceMotion) {
      groupRef.current.rotation.set(0, 0, 0);
      groupRef.current.position.y = baseY;
      return;
    }

    const t = clock.getElapsedTime();
    const idleY = Math.sin(t * 0.8) * 0.08; // gentle float
    const idleSpin = t * 0.35; // slow continuous rotation

    currentRot.current.x += (targetRot.current.x - currentRot.current.x) * 0.08;
    currentRot.current.y += (targetRot.current.y - currentRot.current.y) * 0.08;

    groupRef.current.rotation.x = currentRot.current.x;
    groupRef.current.rotation.y = idleSpin + currentRot.current.y;
    groupRef.current.position.y = baseY + idleY;
  });

  return (
    <group ref={groupRef}>
      <primitive object={cloned} />
    </group>
  );
}

function ModelFallback({ message }: { message: string }) {
  return (
    <div className="w-full h-full flex items-center justify-center text-white/40 text-sm">
      {message}
    </div>
  );
}

class ModelErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch() {
    // swallow
  }
  render() {
    if (this.state.hasError) {
      return <ModelFallback message="3D Render Placeholder" />;
    }
    return this.props.children;
  }
}

export default function HeroModelPreview() {
  const [loadError, setLoadError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const targetRot = useRef({ x: 0, y: 0 });
  const [reduceMotion, setReduceMotion] = useState(false);
  const [isTouch] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return "ontouchstart" in window || (navigator.maxTouchPoints ?? 0) > 0;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateRM = () => setReduceMotion(rm.matches);
    updateRM();
    rm.addEventListener("change", updateRM);

    return () => {
      rm.removeEventListener("change", updateRM);
    };
  }, []);

  const handlePointerMove = (e: React.PointerEvent) => {
    if (reduceMotion || isTouch) return;
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width;
    const ny = (e.clientY - rect.top) / rect.height;
    const x = nx * 2 - 1;
    const y = ny * 2 - 1;
    targetRot.current = {
      x: y * 0.15,
      y: x * 0.2,
    };
  };

  const handlePointerLeave = () => {
    targetRot.current = { x: 0, y: 0 };
  };

  return (
    <div
      ref={containerRef}
      className="w-full aspect-square max-w-md rounded-2xl overflow-hidden bg-black"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <ModelErrorBoundary>
        {loadError ? (
          <ModelFallback message="3D Render Placeholder" />
        ) : (
          <Suspense fallback={<ModelFallback message="Loading…" />}>
            <Canvas
              dpr={[1, 1.5]}
              gl={{ antialias: true, alpha: true }}
              camera={{ position: [0, 0.9, 2.5], fov: 45 }}
              onError={() => setLoadError(true)}
            >
              <ambientLight intensity={0.6} />
              <directionalLight position={[2, 3, 4]} intensity={1.0} />
              <pointLight position={[1.2, 1.8, 2.2]} intensity={1.15} distance={10} decay={2} />
              {/* Top accent light to brighten the star */}
              <pointLight position={[0, 2.4, 1.4]} intensity={1.2} distance={6} decay={2} />
              <Model
                url="/models/tree.glb"
                targetRot={targetRot}
                reduceMotion={reduceMotion}
              />
              <OrbitControls
                enableZoom={false}
                enablePan={false}
                target={[0, 1.2, 0]}
              />
            </Canvas>
          </Suspense>
        )}
      </ModelErrorBoundary>
    </div>
  );
}

useGLTF.preload("/models/tree.glb");


