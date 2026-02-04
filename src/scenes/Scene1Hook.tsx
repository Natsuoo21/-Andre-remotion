import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  spring,
  useVideoConfig,
  Img,
  staticFile,
} from "remotion";

// Noreum Design System
const COLORS = {
  primary: "#3B82F6",
  background: "#0F172A",
  foreground: "#F8FAFC",
  muted: "#64748B",
};

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Background gradient animation
  const gradientRotation = interpolate(frame, [0, 150], [0, 45]);

  // Logo entrance with spring
  const logoProgress = spring({
    frame: frame - 10,
    fps,
    config: { damping: 15, stiffness: 80 },
  });
  const logoScale = interpolate(Math.min(logoProgress, 1), [0, 1], [0.5, 1]);
  const logoOpacity = interpolate(frame, [10, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Title animation
  const titleProgress = spring({
    frame: frame - 35,
    fps,
    config: { damping: 18, stiffness: 70 },
  });
  const titleY = interpolate(Math.min(titleProgress, 1), [0, 1], [40, 0]);
  const titleOpacity = interpolate(frame, [35, 55], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Subtitle animation
  const subtitleOpacity = interpolate(frame, [60, 80], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Glow pulse
  const glowPulse = interpolate(
    Math.sin(frame * 0.06),
    [-1, 1],
    [0.4, 0.8]
  );

  // Particles floating
  const particles = React.useMemo(() => {
    return Array.from({ length: 30 }).map((_, i) => ({
      x: Math.random() * 1920,
      y: Math.random() * 1080,
      size: Math.random() * 4 + 2,
      speed: Math.random() * 0.5 + 0.3,
      delay: Math.random() * 50,
    }));
  }, []);

  // Smooth transition out - quick fade, no scale
  const opacityOut = interpolate(frame, [140, 150], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.background,
        opacity: opacityOut,
      }}
    >
      {/* Animated Gradient Background */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 30% 20%, ${COLORS.primary}15 0%, transparent 50%),
            radial-gradient(ellipse at 70% 80%, ${COLORS.primary}10 0%, transparent 50%),
            linear-gradient(${gradientRotation}deg, ${COLORS.background} 0%, #1a2744 50%, ${COLORS.background} 100%)
          `,
        }}
      />

      {/* Floating Particles */}
      {particles.map((p, i) => {
        const particleY = (p.y - (frame - p.delay) * p.speed * 2) % 1200 - 60;
        const particleOpacity = interpolate(
          frame,
          [p.delay, p.delay + 30, 140, 150],
          [0, 0.6, 0.6, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );

        return (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: p.x,
              top: particleY,
              width: p.size,
              height: p.size,
              backgroundColor: COLORS.primary,
              opacity: particleOpacity * 0.5,
              filter: "blur(1px)",
            }}
          />
        );
      })}

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(${COLORS.primary}08 1px, transparent 1px),
            linear-gradient(90deg, ${COLORS.primary}08 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          opacity: 0.5,
        }}
      />

      {/* Center Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {/* Logo Glow */}
        <div
          className="absolute"
          style={{
            width: 300,
            height: 300,
            background: `radial-gradient(circle, ${COLORS.primary}${Math.round(glowPulse * 40).toString(16).padStart(2, '0')} 0%, transparent 70%)`,
            opacity: logoOpacity,
            filter: "blur(40px)",
          }}
        />

        {/* Logo Container */}
        <div
          className="relative mb-8"
          style={{
            opacity: logoOpacity,
            transform: `scale(${logoScale})`,
          }}
        >
          <div
            className="rounded-3xl p-8 flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${COLORS.primary}20, ${COLORS.primary}05)`,
              border: `2px solid ${COLORS.primary}40`,
              boxShadow: `
                0 0 60px ${COLORS.primary}30,
                inset 0 0 60px ${COLORS.primary}10
              `,
            }}
          >
            <Img
              src={staticFile("noreum-logo.png")}
              style={{
                width: 120,
                height: 120,
                objectFit: "contain",
              }}
            />
          </div>
        </div>

        {/* Title */}
        <h1
          className="text-8xl font-bold tracking-wider mb-4"
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            color: COLORS.foreground,
            fontFamily: "Inter, system-ui, sans-serif",
            textShadow: `0 0 80px ${COLORS.primary}60`,
          }}
        >
          NOREUM
        </h1>

        {/* Subtitle */}
        <p
          className="text-2xl font-light tracking-widest"
          style={{
            opacity: subtitleOpacity,
            color: COLORS.muted,
            fontFamily: "Inter, system-ui, sans-serif",
          }}
        >
          GESTÃO DE RISCOS PSICOSSOCIAIS
        </p>

        {/* Decorative Line */}
        <div
          className="mt-8 h-px"
          style={{
            width: interpolate(frame, [70, 100], [0, 400], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            background: `linear-gradient(90deg, transparent, ${COLORS.primary}, transparent)`,
          }}
        />

        {/* Badge */}
        <div
          className="mt-8 px-6 py-3 rounded-full"
          style={{
            opacity: subtitleOpacity,
            background: `linear-gradient(135deg, ${COLORS.primary}20, ${COLORS.primary}10)`,
            border: `1px solid ${COLORS.primary}40`,
          }}
        >
          <span
            className="text-lg font-medium tracking-wide"
            style={{ color: COLORS.primary }}
          >
            NR-1 Compliance
          </span>
        </div>
      </div>

      {/* Corner Accents */}
      {[
        { position: "top-12 left-12", rotation: 0 },
        { position: "top-12 right-12", rotation: 90 },
        { position: "bottom-12 left-12", rotation: -90 },
        { position: "bottom-12 right-12", rotation: 180 },
      ].map((corner, i) => (
        <div
          key={i}
          className={`absolute ${corner.position}`}
          style={{
            opacity: subtitleOpacity * 0.6,
            transform: `rotate(${corner.rotation}deg)`,
          }}
        >
          <div
            className="w-16 h-16"
            style={{
              borderLeft: `2px solid ${COLORS.primary}60`,
              borderTop: `2px solid ${COLORS.primary}60`,
              borderRadius: "4px 0 0 0",
            }}
          />
        </div>
      ))}
    </AbsoluteFill>
  );
};
