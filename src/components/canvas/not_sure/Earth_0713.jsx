import React, { useRef, useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, CameraControls, useTexture, Float } from "@react-three/drei";
import { MathUtils, Vector3 } from "three";

import globeVert from "../glsl/globe.vert";
import globeFrag from "../glsl/globe.frag";

import { state, currentViewName } from "../data/state";
import { useSnapshot } from "valtio";

import { animate, useMotionValue } from "framer-motion";

import gsap from "gsap";

export default function Earth(props) {
  const { nodes, materials } = useGLTF("/Earth_0714.glb");

  const earthRef = useRef();
  const camRef = useRef();
  const snap = useSnapshot(state);
  const snapCurrentView = useSnapshot(currentViewName);

  const night = useTexture("./img/earth_night.jpg", (t) => {
    t.flipY = false;
  });
  // const day = useTexture("./img/earth_day.jpg", (t) => {
  //   t.flipY = false;
  // });
  const neon = useTexture("./img/earth_neon.jpg", (t) => {
    t.flipY = false;
  });

  const uniforms = useMemo(
    () => ({
      u_time: {
        value: 0,
      },
      u_neon: {
        value: neon,
      },
      // u_day: {
      //   value: day,
      // },
      u_night: {
        value: night,
      },
    }),
    []
  );

  useEffect(() => {
    if (camRef.current) {
      camRef.current.mouseButtons.wheel = 3;
    }
  }, []);

  // const influence = useMotionValue(
  //   nodes[`${snapCurrentView.state}`].morphTargetInfluences[0]
  // );

  useEffect(() => {
    if (snap.currentView == null) return;
    const timeout = setTimeout(() => {
      const direction = new Vector3();
      direction
        .subVectors(
          new Vector3(
            snap.currentView[0],
            snap.currentView[1],
            snap.currentView[2]
          ),
          new Vector3(0, 0, 0)
        )
        .normalize();
      const offset = new Vector3();
      offset.copy(direction).multiplyScalar(4);
      camRef.current.setLookAt(offset.x, offset.y, offset.z, 0, 0, 0, true);
      // console.log(snapCurrentView.state);
      // foo.set(1);
      // animate(nodes[`${snapCurrentView.state}`].morphTargetInfluences, { [0]: 1 });
      // console.log("hi");
      // animate(nodes[`${snapCurrentView.state}`].morphTargetInfluences[0], 1);
      // const x = useMotionValue(0)
      // x.set(1)
      // x.onChange((latest) => {
      //   console.log(latest);
      // });

      // animate(influence, 200, { duration: 2.5 });
      const tl = gsap.timeline();
      tl.to(nodes[`${snapCurrentView.state}`].morphTargetInfluences, {
        [0]: 1,
        [1]: 1,
        duration: 4,
      });
    }, 500);
    return () => clearTimeout(timeout);
  }, [state.currentView, currentViewName.state]);

  // useEffect(() =>, [])

  useFrame(({ clock }) => {
    if (earthRef.current) {
      earthRef.current.material.uniforms.u_time.value = clock.elapsedTime * 1;
    }
  });

  return (
    <>
      <Float
        speed={1}
        rotationIntensity={0.5}
        floatIntensity={0.6}
        floatingRange={[-0.05, 0.05]}
      >
        <group {...props} dispose={null} scale={1}>
          <mesh ref={earthRef} geometry={nodes.Globe.geometry}>
            <shaderMaterial
              vertexShader={globeVert}
              fragmentShader={globeFrag}
              uniforms={uniforms}
              // side={1}
              // wireframe
            />
          </mesh>
          {/* <mesh
            name="Venezuela"
            receiveShadow
            geometry={nodes.Venezuela.geometry}
            material={nodes.Venezuela.material}
            morphTargetDictionary={nodes.Venezuela.morphTargetDictionary}
            morphTargetInfluences={nodes.Venezuela.morphTargetInfluences}
            position={[-0.41, 0.07, -0.9]}
            rotation={[1.55, -0.33, -0.44]}
            scale={-0.02}
          >
            <meshStandardMaterial color="red" />
          </mesh> */}
        </group>
      </Float>
      <CameraControls ref={camRef} makeDefault />
    </>
  );
}
