import React, { ReactNode, Ref } from "react";
import styled, { createGlobalStyle } from "styled-components";

import {
  textDots,
  fontSize,
  fontWeight,
  letterSpacing,
  lineHeight,
  display,
  whiteSpace,
  color,
  getColor,
} from "../../styles";
import { Colors } from "../../constants/colors";

const TypographyWrapper = styled.span``;

export const TypographyTypes = {
  "h1-bold": [fontSize(28), lineHeight(32), fontWeight("bold")],
  "h2-bold": [fontSize(20), lineHeight(24), fontWeight("bold"), letterSpacing(0.15)],
  "h3-bold": [fontSize(16), lineHeight(20), fontWeight("bold"), letterSpacing(0.15)],
  "body-regular": [fontSize(14), lineHeight(20), letterSpacing(0.15), fontWeight(400)],
  "body-semi-bold": [] as any[],
  "caption-regular": [fontSize(12), lineHeight(16), letterSpacing(0.25), fontWeight(400)],
  "caption-semi-bold": [] as any[],
  "overline-medium": [fontWeight(500), fontSize(10), lineHeight(12), letterSpacing(0.25)],
  "overline-bold": [] as any[],
  button: [fontWeight(600), fontSize(14), lineHeight(24), letterSpacing(0.15)],
};

TypographyTypes["body-semi-bold"] = [...TypographyTypes["body-regular"], fontWeight(600)];
TypographyTypes["caption-semi-bold"] = [...TypographyTypes["caption-regular"], fontWeight(600)];
TypographyTypes["overline-bold"] = [...TypographyTypes["overline-medium"], fontWeight("bold")];

export interface TypographyInterface {
  noWrap?: boolean;
  className?: string;
  as?: string;
  type?: keyof typeof TypographyTypes;
  color?: Colors | null;
  styles?: any;
  dots?: boolean;
  children: ReactNode;
  onClick?: () => void;
}

const Typography = React.forwardRef(
  (
    {
      as,
      noWrap,
      className,
      styles,
      children,
      type,
      color: colorProp,
      dots: dotsProp,
      onClick,
      ...props
    }: TypographyInterface,
    ref: Ref<HTMLSpanElement>,
  ) => (
    <TypographyWrapper
      className={className}
      ref={ref}
      as={as as any}
      css={[
        display("inline-block"),
        type ? TypographyTypes[type] : null,
        colorProp && color(colorProp),
        dotsProp && textDots,
        noWrap && whiteSpace("nowrap"),
        styles,
      ]}
      onClick={onClick}
      {...props}
    >
      {children}
    </TypographyWrapper>
  ),
);

Typography.defaultProps = {
  type: "body-regular",
};

export default React.memo(Typography);

export const TypographyGlobalStyle = createGlobalStyle`*{color: ${getColor("gray-blue/09")}}`;
