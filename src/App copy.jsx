import "./App.css";
// import { useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
// import { CameraControls, OrbitControls } from "@react-three/drei";
import Earth from "./components/Earth1";
// import { useSnapshot } from "valtio";
// import { state as s } from "./state";
import React, { useState, useRef, useEffect } from "react";
import { motion, useTransform } from "framer-motion";

const Scene = () => {
  // const state = useSnapshot(s)
  // console.log(s.camRef);

  return (
    <>
      <Earth />
      <ambientLight />
      {/* <OrbitControls makeDefault /> */}
      {/* <CameraControls makeDefault ref={s.camRef} /> */}
    </>
  );
};

const ScrollBox = () => {
  // const [scrollPosition, setScrollPosition] = useState([]);
  // const containerRef = useRef(null);

  // const translateX = useTransform(
  //   (scrollY) => scrollY.map((value) => -value),
  //   [scrollPosition]
  // );

  const items = [
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
    "Item 5",
    "Item 6",
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
    "Item 5",
    "Item 6",
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
    "Item 5",
    "Item 6",
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
    "Item 5",
    "Item 6",
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
    "Item 5",
    "Item 6",
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
    "Item 5",
    "Item 6",
    "Item 6",
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
    "Item 5",
    "Item 6",
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
    "Item 5",
    "Item 6",
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
    "Item 5",
    "Item 6",
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
    "Item 5",
    "Item 6",
    "Item 6",
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
    "Item 5",
    "Item 6",
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
    "Item 5",
    "Item 6",
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
    "Item 5",
    "Item 6",
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
    "Item 5",
    "Item 6",
    "Item 6",
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
    "Item 5",
    "Item 6",
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
    "Item 5",
    "Item 6",
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
    "Item 5",
    "Item 6",
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
    "Item 5",
    "Item 6",
    "Item 6",
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
    "Item 5",
    "Item 6",
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
    "Item 5",
    "Item 6",
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
    "Item 5",
    "Item 6",
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
    "Item 5",
    "Item 6",
    "Item 6",
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
    "Item 5",
    "Item 6",
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
    "Item 5",
    "Item 6",
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
    "Item 5",
    "Item 6",
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
    "Item 5",
    "Item 6",
  ];

  const [itemss, setItems] = useState(["Item 1", "Item 2", "Item 3"]);
  const [topVisible, setTopVisible] = useState(2);

  useEffect(() => {
    setTopVisible(2);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTopVisible(entry.target.index + 1);
        }
      },
      { threshold: 0.5 }
    );

    if (topVisible > 0) {
      const element = document.getElementById(`item-${topVisible - 1}`);
      if (element) {
        observer.observe(element);
      }
    }

    return () => {
      if (topVisible > 0) {
        const element = document.getElementById(`item-${topVisible - 1}`);
        if (element) {
          observer.unobserve(element);
        }
      }
    };
  }, [topVisible, items]);

  return (
    <div className="absolute h-full w-full overflow-x-auto overflow-y-auto">
      {itemss.slice(0, topVisible).map((item, i) => {
        return <MyMotionComponent key={i} text={item} index={i} />;
      })}
    </div>
  );
};

import { useInView } from "react-intersection-observer";

const MyMotionComponent = (props, index) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setVisible(inView);
  }, [inView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={visible ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      }}
      transition={{ duration: 2 }}
    >
      <p className="text-7xl">{props.text}</p>
    </motion.div>
  );
};
export default function App() {
  return (
    <>
      {/* <Canvas camera={{ position: [0, 0, 0.01] }}>
      <Scene />
    </Canvas> */}
      {/* <MyMotionComponent /> */}
      <ScrollBox />
    </>
  );
}
