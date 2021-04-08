import React from "react";
import { Story } from "@storybook/react/types-6-0";

import TransitionSlideComponent, {
  TransitionSwapSlidesControllerInterface,
  TransitionSwapSlidesInterface,
} from "../index";
import Wrapper from "../../../primitives/Wrapper";
import Button from "../../../primitives/Button";
import {
  backgroundColor,
  border,
  child,
  flex,
  fullHeight,
  fullWidth,
  height,
  marginRight,
  marginTop,
  width,
} from "../../../styles";

export default {
  title: "TransitionSlide",
  argTypes: {},
};

const TransitionSlideTemplate: Story<TransitionSwapSlidesInterface> = (props) => {
  const [ref, setRef] = React.useState<TransitionSwapSlidesControllerInterface | null>(null!);
  return (
    <Wrapper>
      <TransitionSlideComponent
        {...props}
        animationTimeout={500}
        styles={[border(1, "orange/04"), width(500), height(350)]}
        centerElement={<Wrapper styles={[fullWidth, fullHeight, backgroundColor("blue/04")]} />}
        overflowElement={<Wrapper styles={[fullWidth, fullHeight, backgroundColor("green/04")]} />}
        ref={setRef}
      />
      {ref && (
        <Wrapper styles={[flex, marginTop(16), child(marginRight(8))]}>
          <Button onClick={ref.toLeft}>center to left</Button>
          <Button onClick={ref.toRight}>center to right</Button>
          <Button onClick={ref.reset} iconRight="sync">
            reset
          </Button>
        </Wrapper>
      )}
    </Wrapper>
  );
};

export const TransitionSlide = TransitionSlideTemplate.bind({});

TransitionSlide.args = {};
