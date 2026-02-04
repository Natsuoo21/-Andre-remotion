import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { Button } from "./ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./ui/card";

export const MyComposition: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: "clamp",
  });

  const cardScale = spring({
    frame: frame - 20,
    fps,
    config: {
      damping: 12,
      stiffness: 100,
    },
  });

  const buttonOpacity = interpolate(frame, [40, 60], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill className="bg-gradient-hero flex items-center justify-center p-12">
      <div className="flex flex-col items-center gap-8">
        <h1
          className="text-5xl font-bold text-white text-center"
          style={{ opacity: titleOpacity }}
        >
          Noreum
        </h1>

        <div style={{ transform: `scale(${cardScale})` }}>
          <Card className="w-[500px] bg-card/95 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-foreground">Welcome</CardTitle>
              <CardDescription>
                Your website components, now in video format
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <div style={{ opacity: buttonOpacity }}>
                <Button variant="hero" size="lg">
                  Get Started
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AbsoluteFill>
  );
};
