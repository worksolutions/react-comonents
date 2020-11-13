import React, { useState } from "react";
import { animated } from "react-spring";

import { borderRadius, padding, backgroundColor, border, boxShadow, createAlphaColor } from "../../styles";

import Wrapper from "../Wrapper";
import Typography from "../Typography";

import { usePopper, getPopperMarginStyleForPlacement, PopperConfigInterface } from "./usePopper";
import { useVisibilityAnimation } from "./useVisibilityAnimation";
import { Colors } from "../../constants/colors";
import { zIndex_hint } from "../../constants/zIndexes";

export enum HintType {
  white,
  black,
}

interface HintInterface {
  force?: boolean;
  text?: string | null;
  type?: HintType;
  inline?: boolean;
  showDelay?: number;
  popperConfig?: PopperConfigInterface;
  showOnHover?: boolean;
  margin?: number;
  children: (initParent: (ref: HTMLElement | null) => void, hint?: React.ReactNode) => JSX.Element;
}

const styledForType = {
  [HintType.black]: {
    container: [padding("4px 8px"), backgroundColor("blue/10"), borderRadius(4), border(1, "gray-blue/03")],
    text: {
      color: "white" as Colors,
    },
  },
  [HintType.white]: {
    container: [
      padding("8px 12px"),
      backgroundColor("white"),
      borderRadius(4),
      boxShadow(
        [0, 0, 2, 0, createAlphaColor("black", 15)],
        [0, 4, 8, 0, createAlphaColor("black", 20)],
        [0, 0, 2, 0, "gray-blue/02"],
      ),
    ],
    text: {
      color: "gray-blue/09" as Colors,
    },
  },
};

function Hint({
  force,
  children,
  showDelay,
  popperConfig,
  text,
  inline,
  showOnHover = true,
  type = HintType.black,
  margin: marginProp,
}: HintInterface) {
  const { placement, opened, open, close, initPopper } = usePopper({
    ...popperConfig,
    showOnHover,
  });
  const [element, setElement] = useState<HTMLElement>();
  const { style } = useVisibilityAnimation(force || opened);

  const initParent = (ref: HTMLElement | null) => {
    if (!ref) return;
    initPopper("parent")(ref);
    setElement(ref);
  };

  React.useEffect(() => {
    if (!showOnHover) return;
    if (!element) return;

    let showTimer: any;

    const mouseEnterHandler = () => {
      clearTimeout(showTimer);
      showTimer = setTimeout(open, showDelay);
    };

    const mouseLeaveHandler = () => {
      clearTimeout(showTimer);
      close();
    };

    element.addEventListener("mouseenter", mouseEnterHandler);
    element.addEventListener("mouseleave", mouseLeaveHandler);

    return () => {
      element.removeEventListener("mouseenter", mouseEnterHandler);
      element.removeEventListener("mouseleave", mouseLeaveHandler);
    };
  }, [showDelay, element]);

  const themeStyles = styledForType[type];

  const hint =
    force || (opened && !!text) ? (
      <Wrapper
        as={animated.div}
        style={style}
        ref={initPopper("child")}
        styles={[getPopperMarginStyleForPlacement(placement, marginProp!), themeStyles.container, zIndex_hint]}
      >
        <Typography type="caption-regular" color={themeStyles.text.color} noWrap>
          {text}
        </Typography>
      </Wrapper>
    ) : null;

  if (inline) return children(initParent, hint);

  return (
    <>
      {children(initParent)}
      {hint}
    </>
  );
}

Hint.defaultProps = {
  showDelay: 200,
  margin: 8,
};

export default React.memo(Hint);
