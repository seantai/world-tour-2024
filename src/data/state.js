import { proxy } from "valtio";

export const currentName = proxy({
  state: "",
});

export const currentPosition = proxy({
  state: "",
});

export const locationsArray = proxy({
  arr: null,
});

export const markersArray = proxy({
  arr: null,
});
