import React from "react";
import { fullHeight, horizontalPadding, transition, width, borderLeft } from "../../styles";

import Wrapper from "../Wrapper";

interface DividerInterface {
  styles?: any;
}

function Divider({ styles }: DividerInterface) {
  return (
    <Wrapper styles={[transition("opacity 0.2s 0.15s"), horizontalPadding(2), styles]}>
      <Wrapper styles={[width(1), fullHeight, borderLeft(1, "gray-blue/02")]} />
    </Wrapper>
  );
}

export default React.memo(Divider);
