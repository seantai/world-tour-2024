import React, { useRef, useEffect } from "react";
import { CameraControls } from "@react-three/drei";
import { MathUtils, Vector3 } from "three";

import { currentPosition } from "../../data/state";
import { useSnapshot } from "valtio";

export default function Camera(props) {
  const camRef = useRef();
  const readCurrentPosition = useSnapshot(currentPosition);

  useEffect(() => {
    if (camRef.current) {
      camRef.current.mouseButtons.wheel = 3;
      camRef.current.minPolarAngle = MathUtils.degToRad(60);
      camRef.current.maxPolarAngle = MathUtils.degToRad(100);
    }
  }, []);

  useEffect(() => {
    // console.log(readCurrentPosition.state);
    if (readCurrentPosition.state == null) return;
    // console.log(readCurrentPosition.state);
    const timeout = setTimeout(() => {
      // console.log(readCurrentPosition.state);
      const direction = new Vector3();
      direction
        .subVectors(readCurrentPosition.state, new Vector3(0, 0, 0))
        .normalize();

      const offset = new Vector3();
      offset.copy(direction).multiplyScalar(4);
      camRef.current.setLookAt(offset.x, offset.y, offset.z, 0, 0, 0, true);
    }, 400);
    return () => clearTimeout(timeout);
  }, [readCurrentPosition.state]);

  return <CameraControls ref={camRef} makeDefault />;
}
