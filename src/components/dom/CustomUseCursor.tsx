import * as React from "react";

export function useCursor(
  hovered: boolean,
  onPointerOver = "pointer",
  onPointerOut = "auto",
  url: string
) {
  React.useEffect(() => {
    if (hovered) {
      document.body.style.cursor = url ? url : onPointerOver;
      return () => void (document.body.style.cursor = onPointerOut);
    }
  }, [hovered]);
}
