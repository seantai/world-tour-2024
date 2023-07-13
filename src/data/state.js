import { proxy } from "valtio";

export const state = proxy({
  currentView: null,
});

export const currentViewName = proxy({
  state: "venezuela",
});
