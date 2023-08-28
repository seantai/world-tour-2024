import React, { useRef, useEffect, useState } from "react";
import { CameraControls } from "@react-three/drei";
import { MathUtils, Vector3 } from "three";

import { currentPosition } from "../../data/state";
import { useSnapshot } from "valtio";

import { locationsArray, spin } from "../../data/state";

export default function Camera() {
  const camRef = useRef();
  const readCurrentPosition = useSnapshot(currentPosition);
  const readSpin = useSnapshot(spin);

  useEffect(() => {
    if (camRef.current) {
      camRef.current.mouseButtons.right = 0;

      camRef.current.touches.three = 0;
      camRef.current.minPolarAngle = MathUtils.degToRad(40);
      camRef.current.maxPolarAngle = MathUtils.degToRad(120);
      camRef.current.smoothTime = 0.4;
      camRef.current.restThreshold = 0.01;
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
      offset.copy(direction).multiplyScalar(3);
      camRef.current.setLookAt(offset.x, offset.y, offset.z, 0, 0, 0, true);
    }, 100);
    return () => clearTimeout(timeout);
  }, [readCurrentPosition.state]);

  useEffect(() => {
    if (readSpin.state == "") return;

    const randomLocation =
      locationsArray.arr[Math.floor(Math.random() * locationsArray.arr.length)];

    const direction = new Vector3();
    direction
      .subVectors(randomLocation.position, new Vector3(0, 0, 0))
      .normalize();

    const offset = new Vector3();
    offset.copy(direction).multiplyScalar(3);
    camRef.current.setLookAt(offset.x, offset.y, offset.z, 0, 0, 0, true);
  }, [spin.state]);

  return (
    <CameraControls
      ref={camRef}
      makeDefault
      maxDistance={5}
      minDistance={3.5}
      azimuthRotateSpeed={0.5}
      polarRotateSpeed={0.5}
    />
  );
}
