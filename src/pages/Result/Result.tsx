import {
  FullpageContainer,
  FullpageSection,
} from "@shinyongjun/react-fullpage";
import "@shinyongjun/react-fullpage/css";
import { useState, useEffect } from "react";
import axios from "axios";
import Process from "./components/Process";
import WavePage from "./components/WavePage";
import { useLocation } from "react-router-dom";

interface MatchingNamesAndDescriptions {
  name: string;
  description: string;
}

// API 응답 데이터 타입 정의
export interface ProcessData {
  f0_mean: number;
  mean_rms: number;
  mfcc_1_to_20: number[];
  final_analysis: {
    voice_name: string;
    description: string;
  };
  matching_names_and_descriptions: MatchingNamesAndDescriptions[];
  solutions: {
    solution1: string;
    solution2: string;
    solution3: string;
  };
  chatgpt_explanation: string;
  ui_theme: {
    title: string;
    description: string;
    background_color_start: string;
    background_color_end: string;
  };
}

function Fullpage() {
  const location = useLocation();
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [processData, setProcessData] = useState<ProcessData | null>(null); // API에서 가져온 데이터 저장

  useEffect(() => {
    if (location.state) {
      setProcessData(location.state as ProcessData);
    }
  }, []);

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
            {/* 데이터가 성공적으로 로드되면 WavePage 컴포넌트로 전달 */}
            {processData && (
              <WavePage
                startColor={`#${processData.ui_theme.background_color_start}`}
                endColor={`#${processData.ui_theme.background_color_end}`}
                title={processData.ui_theme.title}
                description={processData.ui_theme.description}
              />
            )}
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
            {processData && <Process data={processData} />}
          </div>
        </FullpageSection>
      </FullpageContainer>
    </>
  );
}

export default Fullpage;
