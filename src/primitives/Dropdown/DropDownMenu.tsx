import React, { createElement, Ref, SyntheticEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Manager, Modifier, Popper, Reference, usePopper } from "react-popper";

import {
  ai,
  createDropdownRightIcon,
  flex,
  flexValue,
  InputSize,
  InputWrapper,
  InternalIcons,
  pointer,
  textAlign,
  width,
} from "../../index";

import Wrapper from "../Wrapper";
import Typography from "../Typography";
import { Placement } from "@popperjs/core/lib/enums";
import VisibleManager from "./VisibleManager/VisibleManager";

export interface DropDownMenuInterface {
  title: string;
  children: JSX.Element;
  placeholder: string;
  stylesProp: any;
  iconLeft: InternalIcons;
  targetStyles: any;
  placement: Placement;
  size: InputSize;
  modifiers: ReadonlyArray<Modifier<unknown>>;
}

const increaseWidthPopper = 40;

function getPopperStyles(targetElement: Element | null) {
  if (!targetElement) return [];
  return [width(targetElement.clientWidth + increaseWidthPopper)];
}

function DropDownMenu({
  title,
  children,
  placement,
  stylesProp,
  iconLeft,
  targetStyles,
  size,
  modifiers,
}: DropDownMenuInterface) {
  const [targetElement, setTargetElement] = useState(null);
  const popperStyles = useCallback(() => getPopperStyles(targetElement), [targetElement]);

  return (
    <VisibleManager>
      {(visible: boolean, toggleVisible: () => void) => (
        <>
          <Reference>
            {({ ref }: any) => (
              <Wrapper ref={ref}>
                <InputWrapper
                  outerRef={setTargetElement}
                  size={size}
                  onClick={toggleVisible}
                  iconLeft={iconLeft}
                  iconRight={createDropdownRightIcon(visible)}
                  outerStyles={[targetStyles]}
                  renderComponent={(styles) => (
                    <Wrapper as="button" styles={[styles, stylesProp, pointer]}>
                      <Wrapper styles={[flex, ai("center")]}>
                        <Typography color={"gray-blue/05"} styles={[flexValue(1), textAlign("left")]} dots>
                          {title}
                        </Typography>
                      </Wrapper>
                    </Wrapper>
                  )}
                />
              </Wrapper>
            )}
          </Reference>
          {visible && (
            <Popper placement={placement} modifiers={modifiers}>
              {({ ref, style, placement }) => {
                return (
                  <Wrapper ref={ref} style={style} styles={popperStyles} data-placement={placement}>
                    {children}
                  </Wrapper>
                );
              }}
            </Popper>
          )}
        </>
      )}
    </VisibleManager>
  );
}

export default React.memo(DropDownMenu);
