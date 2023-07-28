import { Vector3 } from "three";
import { proxy } from "valtio";

export const currentName = proxy({
  state: "...",
});

export const currentPosition = proxy({
  // state: new Vector3(
  //   -0.2031489610671997,
  //   0.3792084753513336,
  //   -0.8992786407470703
  // ),
  // state: new Vector3(-0.7873, 0.01798, 0.60249),
  // state: new V ector3(0.21964, 0.2267, 0.9302),
});

export const currentMarkerHover = proxy({
  state: "",
});

export const locationsArray = proxy({
  arr: null,
});

export const markersArray = proxy({
  arr: null,
});

export const markerHovered = proxy({
  state: false,
});

export const launch = proxy({
  state: "",
});
