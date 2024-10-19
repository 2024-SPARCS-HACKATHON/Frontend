import { useEffect, useState } from "react";
import Loading from "../../components/Loading";

function Analysis() {
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
          className="bg-main flex h-full w-full flex-col items-center justify-center"
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
