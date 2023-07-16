/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 Earth_0715.glb -I -T
*/

import React, { useRef, useMemo, useContext, createContext } from "react";
import { useGLTF, Merged } from "@react-three/drei";

const context = createContext();
export function MarkerInstances({ children, ...props }) {
  const { nodes } = useGLTF("/Earth_0715-transformed.glb");
  const instances = useMemo(
    () => ({
      Globe: nodes.Globe,
      Kenya: nodes.Kenya,
    }),
    [nodes]
  );
  return (
    <Merged meshes={instances} {...props}>
      {(instances) => (
        <context.Provider value={instances} children={children} />
      )}
    </Merged>
  );
}

export function Marker(props) {
  const instances = useContext(context);
  return (
    <group {...props} dispose={null}>
      {/* <instances.Globe /> */}
      <instances.Kenya
        position={[-0.79, 0.02, 0.6]}
        rotation={[0.78, 0.52, 1.14]}
      />
      <instances.Kenya
        position={[-0.42, 0.13, -0.89]}
        rotation={[0.99, -1, 2.28]}
      />
      <instances.Kenya
        position={[-0.34, 0.72, -0.61]}
        rotation={[1.24, -1.2, 1.91]}
      />
      <instances.Kenya
        position={[0.22, 0.23, 0.93]}
        rotation={[-1.72, -0.4, -2.88]}
      />
      <instances.Kenya
        position={[-0.13, 0.5, 0.85]}
        rotation={[-2.17, -0.4, 3]}
      />
      <instances.Kenya
        position={[-0.48, 0.54, 0.68]}
        rotation={[-2.44, -0.37, 2.56]}
      />
      <instances.Kenya
        position={[-0.92, 0.39, 0.06]}
        rotation={[-2.87, 0.08, 2.01]}
      />
    </group>
  );
}

useGLTF.preload("/Earth_0715-transformed.glb");
