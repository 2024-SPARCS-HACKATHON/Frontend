import { useState } from "react";
import nextEmpty from "/public/assets/next-empty.png";
import nextFilled from "/public/assets/next-filled.png";
import { useLocation, useNavigate } from "react-router-dom";

function Age() {
  const navigate = useNavigate();
  const location = useLocation();
  const gender = location.state;
  const [isSelected, setIsSelected] = useState<string>("");

  return (
    <div
      className="flex h-full w-full flex-col items-center bg-main p-24"
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
        <span className="mt-20 font-noto text-[35px] font-medium">
          당신의 성별을 선택해 주세요
        </span>
        <div className="mt-20 flex items-center justify-center gap-[75px]">
          <div
            className="flex h-[348px] w-[348px] cursor-pointer items-center justify-center rounded-[100px]"
            style={{
              background:
                isSelected === "10"
                  ? "linear-gradient(to bottom, #FF7373, #F8BABA)"
                  : "transparent",
              border: isSelected === "10" ? "none" : "2px solid #EE868E",
            }}
            onClick={() => setIsSelected("10")}
          >
            <span
              className={`${isSelected === "10" ? "font-semibold text-[#FFFAF2]" : "text-[#EE868E]"} font-noto text-[32px]`}
            >
              10대
            </span>
          </div>
          <div
            className="flex h-[348px] w-[348px] cursor-pointer items-center justify-center rounded-[100px]"
            style={{
              background:
                isSelected === "20"
                  ? "linear-gradient(to bottom, #FF7373, #F8BABA)"
                  : "transparent",
              border: isSelected === "20" ? "none" : "2px solid #EE868E",
            }}
            onClick={() => setIsSelected("20")}
          >
            <span
              className={`${isSelected === "20" ? "font-semibold text-[#FFFAF2]" : "text-[#EE868E]"} font-noto text-[32px]`}
            >
              20대
            </span>
          </div>
          <div
            className="flex h-[348px] w-[348px] cursor-pointer items-center justify-center rounded-[100px]"
            style={{
              background:
                isSelected === "30"
                  ? "linear-gradient(to bottom, #FF7373, #F8BABA)"
                  : "transparent",
              border: isSelected === "30" ? "none" : "2px solid #EE868E",
            }}
            onClick={() => setIsSelected("30")}
          >
            <span
              className={`${isSelected === "30" ? "font-semibold text-[#FFFAF2]" : "text-[#EE868E]"} font-noto text-[32px]`}
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
            onClick={() =>
              navigate("/voice", { state: { gender, isSelected } })
            }
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
