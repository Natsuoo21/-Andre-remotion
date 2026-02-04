import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { Scene1Hook } from "./scenes/Scene1Hook";
import { Scene2Dashboard } from "./scenes/Scene2Dashboard";
import { Scene3Radar } from "./scenes/Scene3Radar";
import { Scene4Heatmap } from "./scenes/Scene4Heatmap";
import { Scene5ActionPlans } from "./scenes/Scene5ActionPlans";
import { Scene6Collections } from "./scenes/Scene6Collections";
import { Scene7Mobile } from "./scenes/Scene7Mobile";
import { Scene8Ethics } from "./scenes/Scene8Ethics";
import { Scene9Outro } from "./scenes/Scene9Outro";

// Dark background color for transitions
const BACKGROUND_COLOR = "#0F172A";

/**
 * NOREUM — OFFICIAL TECHNICAL TUTORIAL (V1)
 * Total Duration: 66 seconds = 1980 frames @ 30fps
 *
 * Timeline:
 * - Scene 1 (Hook): 5.0s = 150 frames (0-150)
 * - Scene 2 (Dashboard): 8.0s = 240 frames (150-390)
 * - Scene 3 (Radar): 6.0s = 180 frames (390-570)
 * - Scene 4 (Heatmap): 8.0s = 240 frames (570-810)
 * - Scene 5 (Action Plans): 10.0s = 300 frames (810-1110)
 * - Scene 6 (Collections): 7.0s = 210 frames (1110-1320)
 * - Scene 7 (Mobile): 10.0s = 300 frames (1320-1620)
 * - Scene 8 (Ethics): 7.0s = 210 frames (1620-1830)
 * - Scene 9 (Outro): 5.0s = 150 frames (1830-1980)
 */

export const NoreumTutorial: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: BACKGROUND_COLOR }}>
      {/* Scene 1: Hook — Início da Jornada (5.0s) */}
      <Sequence from={0} durationInFrames={150}>
        <Scene1Hook />
      </Sequence>

      {/* Scene 2: Dashboard — Visão do Piloto (8.0s) */}
      <Sequence from={150} durationInFrames={240}>
        <Scene2Dashboard />
      </Sequence>

      {/* Scene 3: Radar — Equilíbrio de Domínios (6.0s) */}
      <Sequence from={390} durationInFrames={180}>
        <Scene3Radar />
      </Sequence>

      {/* Scene 4: Heatmap — Diagnóstico Cirúrgico (8.0s) */}
      <Sequence from={570} durationInFrames={240}>
        <Scene4Heatmap />
      </Sequence>

      {/* Scene 5: Action Plans — A Solução (10.0s) */}
      <Sequence from={810} durationInFrames={300}>
        <Scene5ActionPlans />
      </Sequence>

      {/* Scene 6: NR-1 Collections — Gerenciando Dados (7.0s) */}
      <Sequence from={1110} durationInFrames={210}>
        <Scene6Collections />
      </Sequence>

      {/* Scene 7: Mobile Experience — Coleta Segura (10.0s) */}
      <Sequence from={1320} durationInFrames={300}>
        <Scene7Mobile />
      </Sequence>

      {/* Scene 8: Ethics Channel — Compliance Total (7.0s) */}
      <Sequence from={1620} durationInFrames={210}>
        <Scene8Ethics />
      </Sequence>

      {/* Scene 9: Outro — Encerramento (5.0s) */}
      <Sequence from={1830} durationInFrames={150}>
        <Scene9Outro />
      </Sequence>
    </AbsoluteFill>
  );
};
