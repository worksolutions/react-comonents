import React, { useCallback } from "react";
import Wrapper from "../Wrapper";
import { reactStylesToStylesComponent } from "../../styles/reactStylesToStylesComponent";
import { bottom, left, right, top, transform } from "../../styles";
import styled from "styled-components";

function arrowPositionStyles(placement: any, arrowPropsStyle: any, arrowPadding: number) {
  if (!placement) return [];
  const paddingFromPopperEdge = arrowPadding;
  const styles = reactStylesToStylesComponent(arrowPropsStyle);

  if (placement.startsWith("left")) return [styles, right(paddingFromPopperEdge)];

  if (placement.startsWith("bottom")) return [styles, top(paddingFromPopperEdge)];

  if (placement.startsWith("right")) return [styles, left(paddingFromPopperEdge)];

  if (placement.startsWith("top")) return [styles, bottom(paddingFromPopperEdge)];

  return styles;
}

function getArrowStyles(placement: any) {
  if (!placement) return [];

  if (placement.startsWith("top")) return [transform("rotate(180deg)")];

  if (placement.startsWith("left")) return [transform("rotate(90deg)")];

  if (placement.startsWith("right")) return [transform("rotate(-90deg)")];
}

const Triangle = styled.div`
  position: absolute;
  width: 16px;
  height: 11px;
  overflow: hidden;
  left: -9px;

  &:after {
    content: "";
    position: absolute;
    z-index: 2;
    background: #fff;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
    box-shadow: 0 2px 6px 0 #0000000f, 0 8px 16px 0 #00000014, 0 0 0 1px #d7dbe5;
    width: 20px;
    height: 20px;
    top: 5px;
    left: -2px;
  }
`;

function Arrow({ arrowProps, placement, arrowPadding, arrowElem }: any) {
  const arrowStyles = useCallback(getArrowStyles, []);
  return (
    <Wrapper
      ref={arrowProps.ref}
      data-popper-arrow
      styles={[() => arrowPositionStyles(placement, arrowProps.style, arrowPadding)]}
    >
      <Wrapper styles={[() => arrowStyles(placement)]}>{arrowElem ? arrowElem : <Triangle />}</Wrapper>
    </Wrapper>
  );
}

export default React.memo(Arrow);
