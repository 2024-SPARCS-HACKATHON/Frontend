import { useState } from "react";
import nextEmpty from "/public/assets/next-empty.png";
import nextFilled from "/public/assets/next-filled.png";
import { useNavigate } from "react-router-dom";

function Age() {
  const navigate = useNavigate();
  const [isSelected, setIsSelected] = useState<string>("");

  return (
    <div
      className="bg-main flex h-full w-full flex-col items-center p-24"
      style={{
        backgroundImage: "url(/public/assets/bg-age.png)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "bottom center",
      }}
    >
      <div className="flex flex-col items-center">
        <div className="flex items-center justify-center gap-[25px]">
          <div className="h-12 w-12 rounded-full border-[3px] border-solid border-[#EE868E] bg-transparent"></div>
          <div className="h-12 w-12 rounded-full bg-[#EE868E]"></div>
        </div>
        <span className="font-noto mt-20 text-[35px] font-medium">
          당신의 성별을 선택해 주세요
        </span>
        <div className="mt-20 flex items-center justify-center gap-[75px]">
          <div
            className="flex h-[348px] w-[348px] cursor-pointer items-center justify-center rounded-[100px]"
            style={{
              background:
                isSelected === "10대"
                  ? "linear-gradient(to bottom, #FF7373, #F8BABA)"
                  : "transparent",
              border: isSelected === "10대" ? "none" : "2px solid #EE868E",
            }}
            onClick={() => setIsSelected("10대")}
          >
            <span
              className={`${isSelected === "10대" ? "font-semibold text-[#FFFAF2]" : "text-[#EE868E]"} font-noto text-[32px]`}
            >
              10대
            </span>
          </div>
          <div
            className="flex h-[348px] w-[348px] cursor-pointer items-center justify-center rounded-[100px]"
            style={{
              background:
                isSelected === "20대"
                  ? "linear-gradient(to bottom, #FF7373, #F8BABA)"
                  : "transparent",
              border: isSelected === "20대" ? "none" : "2px solid #EE868E",
            }}
            onClick={() => setIsSelected("20대")}
          >
            <span
              className={`${isSelected === "20대" ? "font-semibold text-[#FFFAF2]" : "text-[#EE868E]"} font-noto text-[32px]`}
            >
              20대
            </span>
          </div>
          <div
            className="flex h-[348px] w-[348px] cursor-pointer items-center justify-center rounded-[100px]"
            style={{
              background:
                isSelected === "30대 이상"
                  ? "linear-gradient(to bottom, #FF7373, #F8BABA)"
                  : "transparent",
              border: isSelected === "30대 이상" ? "none" : "2px solid #EE868E",
            }}
            onClick={() => setIsSelected("30대 이상")}
          >
            <span
              className={`${isSelected === "30대 이상" ? "font-semibold text-[#FFFAF2]" : "text-[#EE868E]"} font-noto text-[32px]`}
            >
              30대 이상
            </span>
          </div>
        </div>
        {isSelected ? (
          <img
            src={nextFilled}
            alt="다음"
            className="mt-36 w-11 cursor-pointer"
            onClick={() => navigate("/voice")}
          />
        ) : (
          <img
            src={nextEmpty}
            alt="다음"
            className="mt-36 w-11 cursor-pointer"
          />
        )}
      </div>
    </div>
  );
}

export default Age;
