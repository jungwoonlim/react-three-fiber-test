import React, { useRef } from "react";
import { useFrame, useThree } from "react-three-fiber";
import lerp from "lerp";
import state from "./state";

function Section({ children, offset, factor, ...props }) {
  const { offset: parentOffset, sectionHeight, aspect } = useSection();
  const ref = useRef();
  offset = offset !== undefined ? offset : parentOffset;
  useFrame(() => {
    const curY = ref.current.position.y;
    const curTop = state.top.current / aspect;
    ref.current.position.y = lerp(curY, (curTop / state.zoom) * factor, 0.1);
  });

  return (
    <group {...props} position={[0, -sectionHeight * offset * factor, 0]}>
      <group ref={ref}>{children}</group>
    </group>
  );
}

function useSection() {
  const { sections, pages, zoom } = state;
  const { size, viewport } = useThree();
  const viewportWidth = viewport.width;
  const viewportHeight = viewport.height;
  const canvasWidth = viewportWidth / zoom;
  const canvasHeight = viewportHeight / zoom;
  const mobile = size.width < 700;
  const margin = canvasWidth * (mobile ? 0.2 : 0.1);
  const contentMaxWidth = canvasWidth * (mobile ? 0.8 : 0.6);
  const sectionHeight = canvasHeight * ((pages - 1) / (sections - 1));
  const aspect = size.height / viewportHeight;
  return {
    aspect,
    viewport,
    viewportWidth,
    viewportHeight,
    canvasWidth,
    canvasHeight,
    mobile,
    margin,
    contentMaxWidth,
    sectionHeight,
  };
}

export { Section, useSection };
