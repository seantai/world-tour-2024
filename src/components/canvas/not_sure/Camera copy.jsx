import React, { useRef, useEffect } from "react";
import { CameraControls } from "@react-three/drei";
import { Vector3 } from "three";

import { state, currentName } from "../../data/state";
import { useSnapshot } from "valtio";

export default function Camera(props) {
  const camRef = useRef();
  const readCurrentName = useSnapshot(currentName);

  useEffect(() => {
    if (camRef.current) {
      camRef.current.mouseButtons.wheel = 3;
    }
  }, []);

  useEffect(() => {
    if (readCurrentName.state == null) return;
    const timeout = setTimeout(() => {
      const direction = new Vector3();
      direction
        .subVectors(readCurrentName.state, new Vector3(0, 0, 0))
        .normalize();
      const offset = new Vector3();
      offset.copy(direction).multiplyScalar(4);
      camRef.current.setLookAt(offset.x, offset.y, offset.z, 0, 0, 0, true);
    }, 500);
    return () => clearTimeout(timeout);
  }, [state.currentName]);

  // useEffect(() =>, [])

  // useFrame(({ clock }) => {
  //   if (earthRef.current) {
  //     earthRef.current.material.uniforms.u_time.value = clock.elapsedTime * 1;
  //   }
  // });

  // const snapFooState = useSnapshot
  // const { buttonRef } = useSnapshot(fooState);

  // useEffect(() => {
  //   if (buttonRef.current) {
  //     console.log(buttonRef.current);
  //   }
  // });

  return <CameraControls ref={camRef} makeDefault />;
}
