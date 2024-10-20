import { useState } from "react";
import womanFace from "/public/assets/woman-face.png";
import manFace from "/public/assets/man-face.png";
import womanFaceWhite from "/public/assets/woman-face-white.png";
import manFaceWhite from "/public/assets/man-face-white.png";
import nextEmpty from "/public/assets/next-empty.png";
import nextFilled from "/public/assets/next-filled.png";
import { useNavigate } from "react-router-dom";

function Gender() {
  const navigate = useNavigate();
  const [isSelected, setIsSelected] = useState<string>("");

  return (
    <div
      className="flex h-full w-full flex-col items-center bg-main p-24"
      style={{
        backgroundImage: "url(/public/assets/bg-gender.png)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "bottom center",
      }}
    >
      <div className="flex flex-col items-center">
        <div className="flex items-center justify-center gap-[25px]">
          <div className="h-12 w-12 rounded-full bg-[#EE868E]"></div>
          <div className="h-12 w-12 rounded-full border-[3px] border-solid border-[#EE868E] bg-transparent"></div>
        </div>
        <span className="mt-20 font-noto text-[35px] font-medium">
          당신의 성별을 선택해 주세요
        </span>
        <div className="mt-20 flex items-center justify-center gap-[75px]">
          <div className="flex flex-col items-center gap-10">
            <div
              className="flex h-[348px] w-[348px] cursor-pointer items-center justify-center rounded-[100px]"
              style={{
                background:
                  isSelected === "여자"
                    ? "linear-gradient(to bottom, #FF7373, #F8BABA)"
                    : "transparent",
                border: isSelected === "여자" ? "none" : "2px solid #EE868E",
              }}
              onClick={() => setIsSelected("여자")}
            >
              {isSelected === "여자" ? (
                <img src={womanFaceWhite} alt="여성" className="w-[140px]" />
              ) : (
                <img src={womanFace} alt="여성" className="w-[140px]" />
              )}
            </div>
            <span className="font-noto text-[32px]">여성</span>
          </div>
          <div className="flex flex-col items-center gap-10">
            <div
              className="flex h-[348px] w-[348px] cursor-pointer items-center justify-center rounded-[100px]"
              style={{
                background:
                  isSelected === "남자"
                    ? "linear-gradient(to bottom, #FF7373, #F8BABA)"
                    : "transparent",
                border: isSelected === "남자" ? "none" : "2px solid #EE868E",
              }}
              onClick={() => setIsSelected("남자")}
            >
              {isSelected === "남자" ? (
                <img src={manFaceWhite} alt="남성" className="w-[140px]" />
              ) : (
                <img src={manFace} alt="남성" className="w-[140px]" />
              )}
            </div>
            <span className="font-noto text-[32px]">남성</span>
          </div>
        </div>
        {isSelected ? (
          <img
            src={nextFilled}
            alt="다음"
            className="mt-14 w-11 cursor-pointer"
            onClick={() => navigate("/age", { state: isSelected })}
          />
        ) : (
          <img
            src={nextEmpty}
            alt="다음"
            className="mt-14 w-11 cursor-pointer"
          />
        )}
      </div>
    </div>
  );
}

export default Gender;
