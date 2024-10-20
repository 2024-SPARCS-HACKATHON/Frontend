import {
  FullpageContainer,
  FullpageSection,
} from "@shinyongjun/react-fullpage";
import "@shinyongjun/react-fullpage/css";
import { useState, useEffect } from "react";
import axios from "axios";
import Process from "./components/Process";
import WavePage from "./components/WavePage";

// API 응답 데이터 타입 정의
interface ProcessData {
  f0_mean: number;
  mean_rms: number;
  mfcc_1_to_20: number[];
  final_analysis: {
    voice_name: string;
    description: string;
  };
  matching_names_and_descriptions: {
    name: string;
    description: string;
  };
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
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [processData, setProcessData] = useState<ProcessData | null>(null); // API에서 가져온 데이터 저장
  const [loading, setLoading] = useState(true); // 로딩 상태 관리
  const [error, setError] = useState<string | null>(null); // 에러 상태 관리

  // API 호출하여 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<ProcessData>(
          "http://localhost:8000/audio/audio_analyze",
        );

        setProcessData(response.data);
      } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
          setError(err.response.data.message || "Something went wrong");
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setLoading(false); // 로딩 상태 종료
      }
    };

    fetchData();
  }, []);

  // voice_name이 "크리스탈 화이트"이면 배경색을 #3D3D3D로 설정
  const backgroundColor =
    processData?.final_analysis.voice_name === "크리스탈 화이트"
      ? "#3D3D3D"
      : "#FFFAF2";

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
              backgroundColor, // 조건에 따라 배경색 설정
            }}
          >
            {/* 로딩 중일 때 */}
            {loading && <p>Loading...</p>}

            {/* 에러 발생 시 */}
            {error && <p>{error}</p>}

            {/* 데이터가 성공적으로 로드되면 WavePage 컴포넌트로 전달 */}
            {processData && (
              <WavePage
                startColor={processData.ui_theme.background_color_start}
                endColor={processData.ui_theme.background_color_end}
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
              backgroundColor, // 동일한 배경색 설정
            }}
          >
            {/* 로딩 중일 때 */}
            {loading && <p>Loading...</p>}

            {/* 에러 발생 시 */}
            {error && <p>{error}</p>}

            {/* 데이터가 성공적으로 로드되면 Process 컴포넌트로 전달 */}
            {processData && <Process data={processData} />}
          </div>
        </FullpageSection>
      </FullpageContainer>
    </>
  );
}

export default Fullpage;
