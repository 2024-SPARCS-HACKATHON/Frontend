import { useNavigate } from "react-router-dom";
import "/public/css/styles.css";

function Main() {
  const navigate = useNavigate();

  return (
    <div
      className="bg-main flex h-full w-full items-center justify-center"
      style={{
        backgroundImage: "url(/public/assets/bg-main.png)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col items-center">
        <div className="bg-wave flex flex-col items-center">
          <h1 className="font-climate text-stroke text-[246px] leading-tight text-transparent">
            Voice
          </h1>
          <h2 className="font-climate text-stroke -mt-5 text-[152px] leading-tight text-transparent">
            palette
          </h2>
        </div>
        <span className="font-phudu mt-24 text-[42px] tracking-[18px] text-[#FD5151]">
          What Color is your Voice?
        </span>
        <div className="mt-24 h-[43px] w-[155px] overflow-hidden rounded-full border-2 border-solid border-[#fd5151]">
          <button
            className="font-courier mask-btn flex h-full w-full items-center justify-center text-[20px] font-bold"
            onClick={() => navigate("/gender")}
          >
            test start
          </button>
        </div>
      </div>
    </div>
  );
}

export default Main;
