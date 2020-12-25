import React, { useEffect, useRef } from "react";
import LottieView from "lottie-react-native";

export default function Wave() {
  const animationRef = useRef(null);

  useEffect(() => {
    animationRef.current.play();
  }, []);

  return (
    <LottieView
      ref={animationRef}
      style={{
        height:160,
      }}
      source={require("../../wave.json")}
    />
  );
}
