import { proxy } from "valtio";

export const currentName = proxy({
  state: "...",
});

export const currentPosition = proxy({});

export const locationsArray = proxy({
  arr: null,
});

export const markersArray = proxy({
  arr: null,
});

export const spin = proxy({
  state: "",
});
