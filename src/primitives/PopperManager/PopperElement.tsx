import React, { forwardRef, useCallback, useEffect, useMemo } from "react";
import { Popper } from "react-popper";
import Wrapper from "../Wrapper";
import Arrow from "./Arrow";
import { backgroundColor, border, borderRadius, boxShadow } from "../../styles";
import { elevation16Raw } from "../../constants/shadows";
import { Placement } from "@popperjs/core/lib/enums";
import { StrictModifiers } from "@popperjs/core";

function getPopperStyles() {
  return [
    border(1, "definitions.Popper.border", "solid"),
    backgroundColor("white"),
    boxShadow(...elevation16Raw, [0, 0, 0, 1, "definitions.Popper.boxShadow"]),
    borderRadius(6),
  ];
}

function getTranslateXY(element: HTMLElement) {
  const style = window.getComputedStyle(element);
  const matrix = new DOMMatrixReadOnly(style.transform);
  return {
    x: matrix.m41,
    y: matrix.m42,
  };
}

function getModifiers(modifiers: StrictModifiers[], offset?: [number, number]) {
  return [
    ...modifiers,
    {
      name: "offset",
      options: { offset: () => offset },
    },
    {
      name: "arrow",
      options: {
        padding: 20,
      },
    },
  ];
}

interface PopperElementProps {
  offset?: [number, number];
  placement?: Placement;
  children?: React.ReactNode;
  popperStyles?: any;
  modifiers: StrictModifiers[];
  arrowPadding?: number;
  arrowElem?: React.ReactNode;
  referenceNode?: HTMLElement;
  haveArrow?: boolean;
}

function PopperElement({
  offset,
  placement,
  children,
  popperStyles,
  modifiers,
  arrowPadding,
  arrowElem,
  haveArrow,
  referenceNode,
}: PopperElementProps) {
  const resultPopperStyles = useCallback(() => popperStyles || getPopperStyles(), [popperStyles]);
  const resultModifiers = useMemo(() => getModifiers(modifiers, offset), [modifiers, offset]);

  return (
    <Popper placement={placement} modifiers={resultModifiers}>
      {({ ref, style, placement, arrowProps, update }) => (
        <PopperChildren
          ref={ref}
          style={style}
          resultPopperStyles={resultPopperStyles}
          placement={placement}
          arrowProps={arrowProps}
          children={children}
          haveArrow={haveArrow}
          arrowPadding={arrowPadding}
          arrowElem={arrowElem}
          update={update}
          referenceNode={referenceNode}
        />
      )}
    </Popper>
  );
}

const PopperChildren = React.memo(
  forwardRef(function (
    {
      style,
      placement,
      resultPopperStyles,
      children,
      haveArrow,
      arrowProps,
      arrowPadding,
      arrowElem,
      update,
      referenceNode,
    }: any,
    ref,
  ) {
    useEffect(update, [haveArrow]);
    useEffect(() => {
      if (!referenceNode) return;

      const resizeObserver = new ResizeObserver(() => update());
      resizeObserver.observe(referenceNode);

      return () => resizeObserver.disconnect();
    }, [referenceNode]);

    return (
      <Wrapper ref={ref} style={style} data-placement={placement} styles={resultPopperStyles}>
        {children}
        {haveArrow && (
          <Arrow arrowProps={arrowProps} placement={placement} arrowPadding={arrowPadding} arrowElem={arrowElem} />
        )}
      </Wrapper>
    );
  }),
);

export default React.memo(PopperElement);