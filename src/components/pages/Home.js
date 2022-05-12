import { React, useState, useRef, useEffect, useLayoutEffect, lazy, Suspense } from "react";
import "./Home.css";
import "../Loading.css";
import { gsap } from "gsap";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls, ContactShadows, Environment, Shadow } from "@react-three/drei";
import Model from "../CreamLogo3D.js";

const Home = () => {
  const [display3D, setDisplay3D] = useState(false);
  const [loading, setloading] = useState(true);
  const [infoHover, setInfoHover] = useState(false);

  const vw = (coef) => window.innerWidth * (coef / 100);
  const vh = (coef) => window.innerHeight * (coef / 100);

  let circumferece = 2 * 3.1416 * vh(10);
  let numOfRolls = vw(50) / circumferece;
  let degreesOfRotation = numOfRolls * 360;
  let startDegrees = degreesOfRotation - 360;

  function reverseInfoHover() {
    console.log("hover");
    setInfoHover(!infoHover);
  }

  const mobileTl = gsap
    .timeline({ paused: true })
    .fromTo(".xSign", { transform: "rotate(90deg)" }, { transform: "rotate(90deg) translateX(13px)" })
    .fromTo(".one", { transform: "rotate(-360deg)" }, { transform: "rotate(225deg)" }, "<")
    .fromTo(".two", { transform: "rotate(0deg)" }, { transform: `translateX(-11px) rotate(135deg)` }, "<")
    .fromTo(".three", { opacity: 1, transform: "rotate(0deg)" }, { transform: "rotate(135deg) translateX(0.84ch) translateY(0.9rem)", opacity: 0 }, "<")
    .to(".home-container", { width: vw(70), height: vh(85), borderRadius: vh(10), left: vw(5), top: vh(7.5), duration: 0.5 }, "<")
    .to(".line", { color: "#d9d4a9" }, "<")
    .to(".logo-container", { top: -vh(7.5) }, "<")
    .fromTo(".about-text", { x: 50, opacity: 0 }, { x: 0, opacity: 1 }, "<0.15")
    .fromTo(".logo", { y: vh(7.5), opacity: 0 }, { y: 0, opacity: 1, stagger: 0.05 }, "<")
    .reversed(true);

  const menuClick = () => {
    mobileTl.reversed(!mobileTl.reversed()); // swaps the reversed state
    console.log(mobileTl.reversed());
    mobileTl.resume();
  };

  const logoTl = gsap.timeline();

  useLayoutEffect(() => {
    var infoIcon = document.getElementById("infoIcon");
    var infoText = document.getElementById("info-on-hover");

    infoIcon.addEventListener(
      "click",
      function () {
        if (infoText.style.opacity == 0) {
          infoText.style.opacity = 1;
          infoText.style.backgroundColor = "#d9d4a9";
        } else {
          infoText.style.opacity = 0;
          infoText.style.backgroundColor = "transparent";
        }
      },
      false
    );

    logoTl
      .to(".char", { y: -30, ease: "Power2.easeInOut", stagger: 0.05 })
      .to(".char", { y: 0, ease: "Power2.easeInOut", stagger: 0.05 }, "<0.35")
      .to(".char", { y: -30, ease: "Power2.easeInOut", stagger: 0.05 })
      .to(".char", { y: 0, ease: "Power2.easeInOut", stagger: 0.05 }, "<0.35")
      .to(".char", { y: -30, ease: "Power2.easeInOut", stagger: 0.05 })
      .to(".char", { y: 0, ease: "Power2.easeInOut", stagger: 0.05, onComplete: setloading, onCompleteParams: false }, "<0.35")
      .fromTo(
        ".smile-logo",
        {
          display: "none",
          x: "50vw",
          rotation: degreesOfRotation,
        },
        {
          display: "",
          x: 0,
          rotation: 0,
          duration: 4,
          ease: "back.out(2)",
        }
      )
      .to(".smile-logo", { duration: 0.1, rotation: "-180_ccw", display: "none", delay: 0.2 })
      .fromTo(".threeD", { opacity: 0, rotation: "-180_ccw" }, { opacity: 1, rotation: "-360_ccw", duration: 0.1 })
      .fromTo(".main-text-char", { opacity: 0 }, { opacity: 1, y: -30, ease: "back.out(4.4)", stagger: 0.05 }, "<")
      .fromTo(".xSign", { display: "none", opacity: 0, y: 30 }, { display: "flex", opacity: 1, y: 0, ease: "back.out(4.4)" }, "<");
  }, []);

  return (
    <div>
      {loading && (
        <div className="loading-container">
          <p className="char">L</p>
          <p className="char">o</p>
          <p className="char">a</p>
          <p className="char">d</p>
          <p className="char">i</p>
          <p className="char">n</p>
          <p className="char">g</p>
        </div>
      )}
      <p className="info-on-hover" id="info-on-hover">
        This site is heavily inspired by the far more talented Arno Di Nunzio. Check them out&nbsp;
        <a href="https://adinunz.io/" target="_blank">
          here
        </a>
      </p>
      <img src="images/tanInfo.png" alt="" className="info-image logo" id="infoIcon" />

      <div className="xSign animate-menu" id="menu-btn" onClick={() => menuClick()}>
        <p className="line one"> | </p>
        <p className="line two"> | </p>
        <p className="line three"> | </p>
      </div>
      <div className="about-text">
        <p className="about-line">Hi, I'm Floop</p>
        <p className="about-line">
          I am a self-taught software developer working in the crypto space. <br></br>
          <br></br> Here are some links to things I've built:
          <br></br>
          <br></br>-{" "}
          <a href="https://www.fudderverse.com" target="_blank" className="underline-on-hover">
            Fudderverse
          </a>
          <br></br>
          <br></br>-{" "}
          <a href="https://www.somethingtoken.com/" target="_blank" className="underline-on-hover">
            SomethingToken
          </a>
          <br></br>
          <br></br>-{" "}
          <a href="http://149.28.122.125/" target="_blank" className="underline-on-hover">
            MidnightNFT
          </a>
          <br></br>
          <br></br>
        </p>
        <div className="logos">
          <a href="https://www.twitter.com/0xFloop" target="_blank">
            {" "}
            <img src="images/tanTwitter.png" alt="" className="logo" />
          </a>
          <a href="https://www.github.com/0xfloop" target="_blank">
            {" "}
            <img src="images/tanGithub.png" alt="" className="logo" />
          </a>
          <a href="mailto:floopcrypto@yahoo.com">
            {" "}
            <img src="images/tanEmail.png" alt="" className="logo" />
          </a>
        </div>
      </div>
      <div className="home-container">
        <div className="welcome-text">
          <p className="main-text-char">W</p>
          <p className="main-text-char">e</p>
          <p className="main-text-char">l</p>
          <p className="main-text-char">c</p>
          <p className="main-text-char">o</p>
          <p className="main-text-char">m</p>
          <p className="main-text-char">e</p>
          <p className="main-text-char">,</p>
        </div>
        <div className="im-floop-text">
          <p className="main-text-char">I</p>
          <p className="main-text-char">'</p>
          <p className="main-text-char">m</p>
          <p className="main-text-char">&nbsp;</p>
          <p className="main-text-char">F</p>
          <p className="main-text-char">l</p>
          <p className="main-text-char">o</p>
          <p className="main-text-char">o</p>
          <p className="main-text-char">p</p>
        </div>
        <div className="logo-container">
          <div className="threeD">
            <Suspense>
              <Canvas camera={{ position: [0, 0, 20], fov: 25 }}>
                <ambientLight intensity={0.3} />
                <spotLight intensity={0.3} angle={0.1} penumbra={1} position={[5, 25, 20]} />
                <Model />
                <OrbitControls enableZoom={false} />
                <Environment preset={"sunset"} />
              </Canvas>
            </Suspense>
          </div>
          <img className="smile-logo" id="smile-logo" src="images/creamLogo.png" alt="" />
        </div>

        {/* <h1 className="title"> Stuff I've made</h1> */}
        {/* <ul className="links">
          <li className="link-item">
            <a href="https://www.fudderverse.com" target="_blank">
              FudderVerse
            </a>{" "}
            NFT Project I am sole developer of
          </li>
          <br></br>
          <li className="link-item">
            <a href="https://github.com/0xFloop/notrainbow" target="_blank">
              NotRainbow
            </a>{" "}
            Rainbow.me redesign
          </li>
          <br></br>

          <li className="link-item">
            <a href="https://github.com/0xFloop/YieldFarmAutoHarvest" target="_blank">
              Yield Harvestor
            </a>{" "}
            Bot to auto harvest and swap yield farm rewards
          </li>
          <br></br>

          <li className="link-item">
            <a href="https://github.com/0xFloop/NFTSniper" target="_blank">
              NFT Sniper
            </a>{" "}
            Bot to snipe and time mints for NFT's with desirable characteristics
          </li>
          <br></br>
          <li className="link-item">
            <a href="https://twitter.com/0xFloop" target="_blank">
              Twitter
            </a>{" "}
          </li>
          <br></br>
        </ul> */}
      </div>
    </div>
  );
};

export default Home;
