import React, { useState, useEffect } from "react";
import Wave from "react-wavify";

// Props 인터페이스 정의
interface WavePageProps {
  startColor: string;
  endColor: string;
  title: string;
  description: string; // 설명 문구
}

const WavePage: React.FC<WavePageProps> = ({
  startColor,
  endColor,
  title,
  description,
}) => {
  const [showText, setShowText] = useState(false); // 두 텍스트에 동일한 상태 적용
  const [showDescription, setShowDescription] = useState(false);

  const [mainTitle, subtitle] = title.split(" "); // 제목을 두 부분으로 나눔

  // 2초 후에 두 텍스트를 동시에 표시
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowText(true);
    }, 2000); // 2초 후에 나타나게 설정

    return () => clearTimeout(timer); // 타이머를 정리
  }, []);

  // 2.3초 후에 설명을 표시
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowDescription(true);
    }, 2300); // 2.3초 후에 설명이 나타나게 설정

    return () => clearTimeout(timer); // 타이머 정리
  }, []);

  return (
    <>
      <div>
        <Wave
          fill="url(#gradient)"
          paused={false}
          className="animate-waveDrop absolute h-[150vh] w-full"
          style={{ transform: "scaleY(-1)" }} // Y축 반전 (필요한 경우 유지)
          options={{
            height: 100,
            amplitude: 100,
            speed: 0.5,
            points: 5,
          }}
        />

        <svg width="0" height="0">
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={startColor} stopOpacity="1" />
              <stop offset="100%" stopColor={endColor} stopOpacity="1" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* 메인 제목 (Deep) */}
      <div
        className={`font-bruno fixed left-[180px] top-[210px] z-10 transform text-[203px] transition-opacity duration-1000 ${
          showText ? "opacity-100" : "opacity-0"
        }`}
      >
        {mainTitle}
      </div>

      {/* 서브 제목 (Navy) */}
      <div
        className={`font-bruno fixed left-[180px] top-[413px] z-10 transform text-[203px] transition-opacity duration-1000 ${
          showText ? "opacity-100" : "opacity-0"
        }`}
      >
        {subtitle}
      </div>

      {/* 설명 */}
      <div
        className={`fixed left-[200px] top-[700px] font-noto text-[30px] transition-opacity duration-1000 ${
          showDescription ? "opacity-100" : "opacity-0"
        }`}
      >
        {description.split("\n").map((line, index) => (
          <span key={index}>
            {line}
            <br />
          </span>
        ))}
      </div>
    </>
  );
};

export default WavePage;
