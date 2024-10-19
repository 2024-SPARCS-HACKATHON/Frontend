import "/public/css/styles.css";
import micIcon from "/public/assets/mic.png";
import resetIcon from "/public/assets/reset.png";
import stopIcon from "/public/assets/stop.png";
import { useNavigate } from "react-router-dom";

function Voice() {
  const navigate = useNavigate();

  return (
    <div
      className="flex h-full w-full flex-col items-center justify-center"
      style={{
        backgroundImage: "linear-gradient(to bottom, #FFFAF2, #FFE9C5)",
      }}
    >
      <h1 className="font-noto text-[30px] font-semibold">
        마이크에 대고 해당 문장을 말해보세요
      </h1>
      <hr className="mt-8 w-[364px] border border-solid border-[#FF9390]" />
      <div className="mt-10 flex items-center justify-center gap-6 text-[#FF9390]">
        <span className="font-noto text-[68px] font-black">“</span>
        <span className="font-noto text-[43px] font-extrabold">
          문장문장문장문장문장문장문장문장
        </span>
        <span className="font-noto text-[68px] font-black">”</span>
      </div>
      <div className="mt-72 flex items-center justify-center">
        <div className="circle circle-1 flex items-center justify-center">
          <img src={micIcon} alt="녹음" className="w-[208px]" />
        </div>
        <div className="circle circle-2"></div>
        <div className="circle circle-3"></div>
      </div>
      <div className="mt-80 flex items-center gap-5">
        <img
          src={resetIcon}
          alt="다시하기"
          className="w-[62px] cursor-pointer"
        />
        <img
          src={stopIcon}
          alt="정지"
          className="w-[62px] cursor-pointer"
          onClick={() => navigate("/analysis")}
        />
      </div>
    </div>
  );
}

export default Voice;
