import React, { useRef, useEffect, useState } from "react";
import { CameraControls } from "@react-three/drei";
import { MathUtils, Vector3 } from "three";

import { currentPosition } from "../../data/state";
import { useSnapshot } from "valtio";

import { locationsArray } from "../../data/state";

export default function Camera() {
  const camRef = useRef();
  const readCurrentPosition = useSnapshot(currentPosition);

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
      offset.copy(direction).multiplyScalar(4);
      camRef.current.setLookAt(
        offset.x + Math.random() * 1.1,
        offset.y,
        offset.z,
        0,
        0,
        0,
        true
      );
    }, 100);
    return () => clearTimeout(timeout);
  }, [readCurrentPosition.state]);

  useEffect(() => {
    if (camRef.current) {
      camRef.current.addEventListener("controlend", () => {
        const timeout = setTimeout(() => {
          let distances = locationsArray.arr.map((location, index) => {
            let distance = location.position.distanceTo(
              camRef.current.camera.position
            );
            return { distance, index };
          });

          distances.sort((a, b) => a.distance - b.distance);
          let closestPosition = locationsArray.arr[distances[0].index];

          const offset = new Vector3();
          offset.copy(closestPosition.position).multiplyScalar(4);

          locationsArray.arr.forEach((location) => {
            if (location.name == closestPosition.name) {
              location.ref.current?.scrollIntoView({
                behavior: "smooth",
                inline: "center",
              });
            }
          });
        }, 100);
        return () => clearTimeout(timeout);
      });

      return () => camRef.current?.removeEventListener("controlend");
    }
  }, []);

  return (
    <CameraControls
      ref={camRef}
      makeDefault
      maxDistance={5}
      minDistance={3}
      azimuthRotateSpeed={0.5}
      polarRotateSpeed={0.5}
    />
  );
}
