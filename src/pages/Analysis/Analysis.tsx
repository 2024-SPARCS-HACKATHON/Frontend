import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import { useLocation } from "react-router-dom";

function Analysis() {
  const location = useLocation();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 3000);
  }, []);

  return (
    <>
      {isLoaded ? (
        <Loading />
      ) : (
        <div
          className="flex h-full w-full flex-col items-center justify-center bg-main"
          style={{
            backgroundImage: "url(/public/assets/bg-analysis.png)",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        ></div>
      )}
    </>
  );
}

export default Analysis;
