import { proxy } from "valtio";

export const state = proxy({
  currentView: null,
});
