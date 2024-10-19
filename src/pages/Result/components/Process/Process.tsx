import React, { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";

const Process: React.FC = () => {
  const stepRefs = useRef<HTMLDivElement[]>([]); // 각 Step에 대한 ref

  const handleChange = (inView: boolean, targetIndex: number) => {
    stepRefs.current.forEach((step, index) => {
      // 밝기 계산: index와 targetIndex의 차이에 따라 20%씩 감소
      const brightness = Math.max(40, 100 - (targetIndex - index) * 20); // 최소 밝기 40%로 제한

      // 크기 계산: 각 요소는 현재 요소보다 작아짐
      const scale = Math.max(0.6, 1 - (targetIndex - index) * 0.1); // 최소 크기 0.6으로 제한

      // 높이 계산: index가 targetIndex에서 멀어질수록 줄어듦
      const height = Math.max(60, 100 - (targetIndex - index) * 10); // 최소 높이 60vh로 제한

      if (inView && index < targetIndex) {
        // 이전 요소들 - 크기, 밝기, 높이 조정
        step.style.filter = `brightness(${brightness}%)`;
        step.style.transform = `translateY(${(index - targetIndex) * 20}px) scale(${scale})`;
        step.style.height = `${height}vh`;
      } else if (inView && index === targetIndex) {
        // 현재 요소 - 원래 크기와 밝기 유지
        step.style.filter = "brightness(100%)";
        step.style.transform = `translateY(0px) scale(1)`;
        step.style.height = "100vh";
      } else {
        // 이후 요소들 - 원래 상태 유지
        step.style.filter = "brightness(100%)";
        step.style.transform = `translateY(0px) scale(1)`;
        step.style.height = "100vh";
      }
    });
  };

  const [ref1, inView1] = useInView({ threshold: 0.6 });
  const [ref2, inView2] = useInView({ threshold: 0.6 });
  const [ref3, inView3] = useInView({ threshold: 0.6 });

  useEffect(() => {
    handleChange(inView1, 0);
  }, [inView1]);

  useEffect(() => {
    handleChange(inView2, 1);
  }, [inView2]);

  useEffect(() => {
    handleChange(inView3, 2);
  }, [inView3]);

  return (
    <div className="z-[100] min-h-screen w-full">
      <main role="main">
        <section className="process relative transition-transform duration-700 ease-in-out">
          <div className="process__container mx-auto max-w-screen-xl px-5 py-2 md:px-12">
            <div id="process" className="relative space-y-10">
              <div
                ref={(el) => {
                  stepRefs.current[0] = el!;
                  ref1(el);
                }}
                data-index="0"
                className="sticky top-0 z-[1] flex h-screen transform flex-col items-center justify-center transition-all duration-500 ease-in-out"
              >
                <div className="relative mb-5 min-h-[60vh] w-[1500px] rounded-lg bg-blue-500 p-8 text-center shadow-lg">
                  <p className="mb-4 inline-block rounded bg-white px-2 py-1 text-sm uppercase text-blue-500">
                    Première rencontre
                  </p>
                  <h2 className="mb-6 text-2xl text-white">
                    Nous voulons en connaître plus sur vous afin de mieux cibler
                    ce que vous recherchez
                  </h2>
                  <p className="mb-6 text-white">
                    Nous voulons connaître votre vision du projet, qu’il soit
                    simple ou grandiose, afin de trouver le produit répondant à
                    vos attentes.
                  </p>
                  <div className="absolute bottom-10 left-10 flex items-center">
                    <span className="mr-2 inline-block h-1 w-8 bg-white"></span>
                    <p className="text-xl text-white">01</p>
                  </div>
                </div>
              </div>
              <div
                ref={(el) => {
                  stepRefs.current[1] = el!;
                  ref2(el);
                }}
                data-index="1"
                className="sticky top-0 z-[2] flex h-screen transform flex-col items-center justify-center transition-all duration-500 ease-in-out"
              >
                <div className="relative mb-5 min-h-[60vh] w-[1500px] rounded-lg bg-blue-500 p-8 text-center shadow-lg">
                  <p className="mb-4 inline-block rounded bg-white px-2 py-1 text-sm uppercase text-blue-500">
                    Recherche de solution
                  </p>
                  <h2 className="mb-6 text-2xl text-white">
                    Nous travaillons fort pour vous afin de trouver le
                    fournisseur et le produit idéal
                  </h2>
                  <p className="mb-6 text-white">
                    Nous recherchons pour vous le produit le plus adéquat parmi
                    notre grande variété au meilleur prix pour répondre à votre
                    demande.
                  </p>
                  <div className="absolute bottom-10 left-10 flex items-center">
                    <span className="mr-2 inline-block h-1 w-8 bg-white"></span>
                    <p className="text-xl text-white">02</p>
                  </div>
                </div>
              </div>
              <div
                ref={(el) => {
                  stepRefs.current[2] = el!;
                  ref3(el); // useInView ref 적용
                }}
                data-index="2"
                className="sticky top-0 z-[3] flex h-screen transform flex-col items-center justify-center transition-all duration-500 ease-in-out"
              >
                <div className="relative mb-5 min-h-[60vh] w-[1500px] rounded-lg bg-blue-500 p-8 text-center shadow-lg">
                  <p className="mb-4 inline-block rounded bg-white px-2 py-1 text-sm uppercase text-blue-500">
                    Soumission
                  </p>
                  <h2 className="mb-6 text-2xl text-white">
                    Nous vous présentons une soumission détaillée pour votre
                    projet
                  </h2>
                  <p className="mb-6 text-white">
                    Vous aurez tous les détails nécessaires pour la réalisation
                    du projet. C’est le moment idéal pour faire des ajustements
                    avant de confirmer votre commande.
                  </p>
                  <div className="absolute bottom-10 left-10 flex items-center">
                    <span className="mr-2 inline-block h-1 w-8 bg-white"></span>
                    <p className="text-xl text-white">03</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Process;
