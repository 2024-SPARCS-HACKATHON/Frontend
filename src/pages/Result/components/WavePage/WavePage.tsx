import Wave from "react-wavify";

const WavePage = () => {
  return (
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
            <stop offset="0%" stopColor="#494BB3" stopOpacity="1" />
            <stop offset="100%" stopColor="#1F204D" stopOpacity="1" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default WavePage;
