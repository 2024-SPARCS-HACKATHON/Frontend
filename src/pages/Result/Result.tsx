import {
  FullpageContainer,
  FullpageSection,
} from "@shinyongjun/react-fullpage";
import "@shinyongjun/react-fullpage/css";
import { useState } from "react";
import Process from "./components/Process";
import WavePage from "./components/WavePage";

function Fullpage() {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <>
      <FullpageContainer
        transitionDuration={700}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        topScrollOnChange={false}
      >
        <FullpageSection name="first">
          <div
            style={{
              height: "100vh",
              width: "100vw",
            }}
            className="bg-[#FFFAF2]"
          >
            <WavePage startColor="#FF5733" endColor="#C70039" />
          </div>
        </FullpageSection>
        <FullpageSection name="second">
          <div
            style={{
              height: "250vh",
              width: "100vw",
            }}
            className="bg-[#FFFAF2]"
          >
            <Process sectionColors="#494BB3" />
          </div>
        </FullpageSection>
      </FullpageContainer>
    </>
  );
}

export default Fullpage;
