import { useSpring } from "react-spring";

import { duration160Number } from "../../constants/durations";

export function useVisibilityAnimation(opened: boolean) {
  const spring = useSpring({
    config: { duration: duration160Number },
    opacity: opened ? 1 : 0,
  });

  return {
    style: {
      opacity: spring.opacity,
      visibility: spring.opacity.to((value) => (value === 0 ? "hidden" : "visible")),
    },
  };
}
