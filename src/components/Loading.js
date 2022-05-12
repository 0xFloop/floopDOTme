import React from "react";
import { gsap } from "gsap";
import { Html, useProgress } from "@react-three/drei";
import "./Loading.css";

function Loading() {
  const { progress } = useProgress();
  return <Html center>{progress} % loaded</Html>;
  //   return (
  //     <div className="loading-container">
  //       <p className="loadingLetter">L</p>
  //       <p className="loadingLetter">o</p>
  //       <p className="loadingLetter">a</p>
  //       <p className="loadingLetter">d</p>
  //       <p className="loadingLetter">i</p>
  //       <p className="loadingLetter">n</p>
  //       <p className="loadingLetter">g</p>
  //     </div>
  //   );
}

export default Loading;
