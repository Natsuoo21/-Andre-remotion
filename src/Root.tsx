import { Composition } from "remotion";
import { NoreumTutorial } from "./NoreumTutorial";
import "./style.css";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Noreum Official Technical Tutorial - 66 seconds */}
      <Composition
        id="NoreumTutorial"
        component={NoreumTutorial}
        durationInFrames={1980}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
