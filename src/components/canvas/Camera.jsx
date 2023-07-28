import React, { useRef, useEffect } from "react";
import { CameraControls } from "@react-three/drei";
import { MathUtils, Vector3 } from "three";

import { currentPosition, launch } from "../../data/state";
import { useSnapshot } from "valtio";

export default function Camera() {
  const camRef = useRef();
  const readCurrentPosition = useSnapshot(currentPosition);
  const readLaunch = useSnapshot(launch);

  useEffect(() => {
    if (camRef.current) {
      camRef.current.mouseButtons.wheel = 0;
      camRef.current.mouseButtons.middle = 0;
      camRef.current.mouseButtons.right = 0;

      // camRef.current.touches.one = 0;
      camRef.current.touches.two = 0;
      camRef.current.touches.three = 0;
      camRef.current.minPolarAngle = MathUtils.degToRad(45);
      camRef.current.maxPolarAngle = MathUtils.degToRad(100);
    }
  }, []);

  useEffect(() => {
    if (readCurrentPosition.state == null) return;
    const timeout = setTimeout(() => {
      const direction = new Vector3();
      direction
        .subVectors(readCurrentPosition.state, new Vector3(0, 0, 0))
        .normalize();

      const offset = new Vector3();
      offset.copy(direction).multiplyScalar(4 + Math.random() * 1.3);
      camRef.current.setLookAt(
        offset.x + Math.random() * 1.3,
        offset.y,
        offset.z,
        0,
        0,
        0,
        true
      );
    }, 250);
    return () => clearTimeout(timeout);
  }, [readCurrentPosition.state]);

  useEffect(() => {
    if (readLaunch.state !== null) {
      camRef.current.setLookAt(
        Math.random() * 120,
        Math.random() * 80,
        Math.random() * 100,
        0,
        0,
        0,
        true
      );
    }
  }, [readLaunch.state]);

  return <CameraControls ref={camRef} makeDefault />;
}
