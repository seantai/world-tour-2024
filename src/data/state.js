import { proxy } from "valtio";

export const state = proxy({
  camRef: "",
  inViewFeature: "",
  view: [0.32, 0.09, -0.87],
  clickedLocation: "venezuela",
});
