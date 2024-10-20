import "/public/css/styles.css";
import micIcon from "/public/assets/mic.png";
import resetIcon from "/public/assets/reset.png";
import stopIcon from "/public/assets/stop.png";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useAudioRecorder } from "react-audio-voice-recorder";
import api from "../../api/baseUrl/baseUrl";
import { ProcessData } from "../Result/Result";

function Voice() {
  const navigate = useNavigate();
  const location = useLocation();
  const { gender, isSelected } = location.state;
  const [recordFile, setRecordFile] = useState<File | null>(null);

  // 음성녹음 관련
  const recorderControls = useAudioRecorder();

  const btnRef = useRef<HTMLButtonElement | null>(null);
  const instRef = useRef<HTMLDivElement | null>(null);

  // 녹음 시작 메소드
  const handleRecordingStart = () => {
    setTimeout(() => {
      recorderControls.startRecording();
      btnRef.current?.style.setProperty("visibility", "visible");
      instRef.current?.style.setProperty("visibility", "visible");
    }, 1000);
  };

  // 녹음 중지
  const handleStopButtonClick = () => {
    if (recorderControls.isRecording) {
      recorderControls.stopRecording(); // 녹음 중지
    }
  };

  // 녹음이 중지될 때 실행할 effect
  useEffect(() => {
    if (recorderControls.recordingBlob) {
      const mimeType = recorderControls.recordingBlob.type;
      const extension = mimeType.split("/")[1]; // 'webm' 또는 'ogg'
      const fileName = `recording.${extension}`;
      const file = new File([recorderControls.recordingBlob], fileName, {
        type: mimeType,
      });
      console.log(file);
      setRecordFile(file);
      navigate("/analysis");
      postVoice(file); // 녹음이 끝난 후 파일 전송
    }
  }, [recorderControls.recordingBlob]);
  const postVoice = async (file: File) => {
    try {
      if (!file) {
        console.error("녹음 파일이 없습니다.");
        return;
      }

      const formData = new FormData();
      console.log(file);
      formData.append("file", file);
      formData.append("gender", gender);
      formData.append("age", isSelected);

      const response = await api.post("/audio/analyze_audio", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response.data);

      navigate("/result", { state: response.data });
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    console.log(location.state);
    handleRecordingStart();
  }, []);

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
          제 목소리 유형을 분석해주세요!
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
          onClick={handleStopButtonClick}
        />
      </div>
    </div>
  );
}

export default Voice;
