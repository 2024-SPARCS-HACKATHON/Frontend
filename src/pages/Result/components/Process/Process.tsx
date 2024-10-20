import React, { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

// Props 인터페이스 정의
interface ProcessProps {
  data: {
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
      background_color_start: string;
      title: string;
    };
  };
}

// 이미지 경로를 동적으로 생성하는 함수
const getImagePath = (title: string, imageNumber: number): string => {
  const normalizedTitle = title.toLowerCase().replace(/\s+/g, "-");
  return `/public/assets/${normalizedTitle}-${imageNumber}.png`;
};

const Process: React.FC<ProcessProps> = ({ data }) => {
  const stepRefs = useRef<HTMLDivElement[]>([]); // 각 Step에 대한 ref
  const [isFirstContent, setIsFirstContent] = useState(true); // 첫 번째 내용인지 여부를 관리하는 상태

  // 이미지 경로를 함수로 처리하여 여러 종류에 대응
  const image1 = getImagePath(data.ui_theme.title, 1);
  const image2 = getImagePath(data.ui_theme.title, 2);
  const image3 = getImagePath(data.ui_theme.title, 3);
  const image4 = getImagePath(data.ui_theme.title, 4);

  const handleChange = (inView: boolean, targetIndex: number) => {
    stepRefs.current.forEach((step, index) => {
      const brightness = Math.max(40, 100 - (targetIndex - index) * 20);
      const scale = Math.max(0.6, 1 - (targetIndex - index) * 0.1);
      const height = Math.max(60, 100 - (targetIndex - index) * 10);

      if (inView && index < targetIndex) {
        step.style.filter = `brightness(${brightness}%)`;
        step.style.transform = `translateY(${(index - targetIndex) * 20}px) scale(${scale})`;
        step.style.height = `${height}vh`;
      } else if (inView && index === targetIndex) {
        step.style.filter = "brightness(100%)";
        step.style.transform = `translateY(0px) scale(1)`;
        step.style.height = "100vh";
      } else {
        step.style.filter = "brightness(100%)";
        step.style.transform = `translateY(0px) scale(1)`;
        step.style.height = "100vh";
      }
    });
  };

  const [ref1, inView1] = useInView({ threshold: 0.6 });
  const [ref2, inView2] = useInView({ threshold: 0.6 });
  const [ref3, inView3] = useInView({ threshold: 0.6 });

  useEffect(() => {
    handleChange(inView1, 0);
  }, [inView1]);

  useEffect(() => {
    handleChange(inView2, 1);
  }, [inView2]);

  useEffect(() => {
    handleChange(inView3, 2);
  }, [inView3]);

  // 버튼 클릭 시 첫 번째 섹션의 내용을 교대로 변경하는 함수
  const handleButtonClick = () => {
    setIsFirstContent((prev) => !prev); // 이전 상태를 토글하여 교대로 바뀌도록 설정
  };

  return (
    <div className="z-[100] min-h-screen w-full">
      <main role="main">
        <section className="process relative transition-transform duration-700 ease-in-out">
          <div className="process__container mx-auto max-w-screen-xl px-5 py-2 md:px-12">
            <div id="process" className="relative space-y-10">
              {/* 첫 번째 섹션 */}
              <div
                ref={(el) => {
                  stepRefs.current[0] = el!;
                  ref1(el);
                }}
                data-index="0"
                className="sticky top-0 z-[1] flex h-screen transform flex-col items-center justify-center transition-all duration-500 ease-in-out"
              >
                <div
                  className="relative mb-5 min-h-[70vh] w-[1600px] rounded-[100px] p-8 text-center shadow-lg"
                  style={{
                    backgroundColor: data.ui_theme.background_color_start,
                  }} // 배경색 설정
                >
                  <div className="flex items-center">
                    <div className="m-[30px] flex h-[70px] w-[70px] items-center justify-center rounded-[100px] bg-white font-phudu text-[35px]">
                      1
                    </div>
                    <div className="h-[1px] w-[63px] bg-white"></div>
                    <div className="m-[30px] font-noto text-[35px] text-white">
                      분석 결과를 알려드려요
                    </div>
                  </div>
                  {isFirstContent ? (
                    <div className="flex h-[50vh] w-full items-center justify-center">
                      <button className="h-[53px] w-[53px]" />
                      <div className="w-[1400px]">이미지</div>
                      <div>
                        <button
                          onClick={handleButtonClick}
                          className="h-[53px] w-[53px]"
                          style={{
                            backgroundImage:
                              "url(/public/assets/arrow-right.png)",
                            backgroundSize: "contain",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                          }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="flex h-[50vh] w-full items-center justify-center">
                      <div>
                        <button
                          onClick={handleButtonClick}
                          className="h-[53px] w-[53px]"
                          style={{
                            backgroundImage:
                              "url(/public/assets/arrow-left.png)",
                            backgroundSize: "contain",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                          }}
                        />
                      </div>
                      <div className="w-[1400px]"></div>
                      <button className="h-[53px] w-[53px]" />
                    </div>
                  )}
                </div>
              </div>

              {/* 두 번째 섹션 */}
              <div
                ref={(el) => {
                  stepRefs.current[1] = el!;
                  ref2(el);
                }}
                data-index="1"
                className="sticky top-0 z-[2] flex h-screen transform flex-col items-center justify-center transition-all duration-500 ease-in-out"
              >
                <div
                  className="relative mb-5 min-h-[70vh] w-[1600px] rounded-[100px] p-8 text-center shadow-lg"
                  style={{
                    backgroundColor: data.ui_theme.background_color_start,
                  }}
                >
                  <div className="flex items-center">
                    <div className="m-[30px] flex h-[70px] w-[70px] items-center justify-center rounded-[100px] bg-white font-phudu text-[35px]">
                      2
                    </div>
                    <div className="h-[1px] w-[63px] bg-white"></div>
                    <div className="m-[30px] font-noto text-[35px] text-white">
                      비슷한 목소리를 가진 인물
                    </div>
                  </div>
                  <div className="flex justify-evenly">
                    <div className="w-[800px]">
                      <div>
                        당신의 목소리는
                        {data.matching_names_and_descriptions.name}님과
                        비슷하네요!
                      </div>
                      <div>
                        {data.matching_names_and_descriptions.description}
                      </div>
                    </div>
                    <img className="w-[600px]" src={image1} alt="voice match" />
                  </div>
                </div>
              </div>

              {/* 세 번째 섹션 */}
              <div
                ref={(el) => {
                  stepRefs.current[2] = el!;
                  ref3(el);
                }}
                data-index="2"
                className="sticky top-0 z-[3] flex h-screen transform flex-col items-center justify-center transition-all duration-500 ease-in-out"
              >
                <div
                  className="relative mb-5 min-h-[70vh] w-[1600px] rounded-[100px] p-8 text-center shadow-lg"
                  style={{
                    backgroundColor: data.ui_theme.background_color_start,
                  }}
                >
                  <div className="flex items-center">
                    <div className="m-[30px] flex h-[70px] w-[70px] items-center justify-center rounded-[100px] bg-white font-phudu text-[35px]">
                      3
                    </div>
                    <div className="h-[1px] w-[63px] bg-white"></div>
                    <div className="m-[30px] font-noto text-[35px] text-white">
                      목소리에 고민이 있다면
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center text-white">
                    <div className="font-noto text-[30px]">
                      {/* TODO: 이거 값 추가 */}
                      목소리가 너무 맑고 깨끗해서, 사람들이 가끔 차갑거나
                      거리감이 <br />
                      느껴진다는 말을 할 수 있어요.
                    </div>
                    <div className="my-5 font-noto text-[34px] font-bold text-white">
                      이렇게 해 보세요!
                    </div>
                    <div className="flex w-full items-center justify-evenly">
                      <div className="flex flex-col items-center justify-center">
                        <div className="flex h-[280px] w-[280px] items-center justify-center rounded-[316px] bg-gradient-to-b from-[#ffffff] via-[#ffffff] to-[#fff3df]">
                          <img src={image2} alt="solution 1" />
                        </div>
                        <div className="mt-[22px] font-noto text-[28px] text-white">
                          {data.solutions.solution1}
                        </div>
                      </div>
                      <div className="flex flex-col items-center justify-center">
                        <div className="flex h-[280px] w-[280px] items-center justify-center rounded-[316px] bg-gradient-to-b from-[#ffffff] via-[#ffffff] to-[#fff3df]">
                          <img src={image3} alt="solution 2" />
                        </div>
                        <div className="mt-[22px] font-noto text-[28px] text-white">
                          {data.solutions.solution2}
                        </div>
                      </div>
                      <div className="flex flex-col items-center justify-center">
                        <div className="flex h-[280px] w-[280px] items-center justify-center rounded-[316px] bg-gradient-to-b from-[#ffffff] via-[#ffffff] to-[#fff3df]">
                          <img src={image4} alt="solution 3" />
                        </div>
                        <div className="mt-[22px] font-noto text-[28px] text-white">
                          {data.solutions.solution3}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Process;
