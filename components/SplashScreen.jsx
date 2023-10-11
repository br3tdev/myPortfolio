import { useEffect, useState } from "react";
import Image from "next/image";
import anime from "animejs";
import Logo from "../public/logo.png";
import IconLoader from "./IconLoader";
import { cn } from "@/lib/utils";
export function SplashScreen({ finishLoading }) {
  const [ismounted, setismounted] = useState(false);

  const animate = () => {
    const loader = anime.timeline({
      complete: () => finishLoading(),
    });

    loader
      .add({
        targets: "#logo path",
        delay: 300,
        duration: 1500,
        easing: "easeInOutQuart",
        strokeDashoffset: [anime.setDashoffset, 0],
      })
      .add({
        targets: "#logo #B",
        duration: 700,
        easing: "easeInOutQuart",
        opacity: 1,
      })
      .add({
        targets: "#logo",
        delay: 500,
        duration: 300,
        easing: "easeInOutQuart",
        opacity: 0,
        scale: 0.1,
      })
      .add({
        targets: ".loader",
        duration: 200,
        easing: "easeInOutQuart",
        opacity: 0,
        zIndex: -1,
      });
  };

  useEffect(() => {
    const timeout = setTimeout(() => setismounted(true), 10);
    animate();

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className="flex h-screen items-center justify-center z-50"
      ismounted={ismounted}
    >
      {/* <Image id="logo" src={Logo} width={60} height={60} alt="logo" /> */}
      <div
        className={cn(
          "w-max max-w-[100px] transition",
          ismounted ? "opacity-100" : "opacity-0"
        )}
      >
        <IconLoader />
      </div>
    </div>
  );
}
