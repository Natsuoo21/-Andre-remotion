import React from "react";
import { interpolate, useCurrentFrame, spring, useVideoConfig } from "remotion";

interface NoreumLogoProps {
  size?: number;
  glowColor?: string;
  showText?: boolean;
  assembleFromParticles?: boolean;
}

export const NoreumLogo: React.FC<NoreumLogoProps> = ({
  size = 80,
  glowColor = "#22D3EE",
  showText = true,
  assembleFromParticles = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pulseScale = interpolate(
    Math.sin(frame * 0.1),
    [-1, 1],
    [0.95, 1.05]
  );

  const glowOpacity = interpolate(
    Math.sin(frame * 0.15),
    [-1, 1],
    [0.4, 0.8]
  );

  const assembleProgress = assembleFromParticles
    ? spring({ frame, fps, config: { damping: 15, stiffness: 80 } })
    : 1;

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Logo with glow */}
      <div
        className="relative"
        style={{ transform: `scale(${pulseScale})` }}
      >
        {/* Glow effect */}
        <div
          className="absolute inset-0 rounded-2xl"
          style={{
            background: glowColor,
            filter: "blur(30px)",
            opacity: glowOpacity * 0.6,
            transform: "scale(1.5)",
          }}
        />

        {/* Logo container */}
        <div
          className="relative rounded-2xl flex items-center justify-center"
          style={{
            width: size,
            height: size,
            background: `linear-gradient(135deg, ${glowColor}20, ${glowColor}40)`,
            border: `2px solid ${glowColor}60`,
            opacity: assembleProgress,
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              width: size * 0.6,
              height: size * 0.6,
            }}
          >
            <path
              d="M12 2L2 7L12 12L22 7L12 2Z"
              stroke={glowColor}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill={`${glowColor}30`}
            />
            <path
              d="M2 17L12 22L22 17"
              stroke={glowColor}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 12L12 17L22 12"
              stroke={glowColor}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* Text */}
      {showText && (
        <span
          className="font-bold tracking-wider"
          style={{
            fontSize: size * 0.4,
            color: glowColor,
            textShadow: `0 0 20px ${glowColor}80`,
            opacity: assembleProgress,
          }}
        >
          NOREUM
        </span>
      )}
    </div>
  );
};
