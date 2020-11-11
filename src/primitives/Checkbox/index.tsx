import React from "react";
import {
  flex,
  jc,
  ai,
  padding,
  height,
  width,
  fullWidth,
  borderRadius,
  pointer,
  hover,
  borderNone,
  disableOutline,
  transition,
  focus,
  active,
  cursor,
  marginLeft,
  backgroundColor,
  boxShadow,
} from "../../styles";

import Wrapper from "../Wrapper";
import Typography from "../Typography";
import Icon from "../Icon";

type CheckboxProps = {
  text: string;
  isChecked: boolean;
  onChange: (value: boolean) => void;
  error?: boolean;
};

function getCheckboxStyles({ isChecked = false, error = false }) {
  return [
    !isChecked && boxShadow([0, 0, 0, 1, "gray-blue/03", true]),
    backgroundColor(isChecked ? "blue/05" : "transparent"),
    hover(backgroundColor(isChecked ? "blue/06" : "gray-blue/01")),
    active(backgroundColor(isChecked ? "blue/07" : "gray-blue/02")),
    error && boxShadow([0, 0, 0, 2, "red/05"]),
  ];
}

function Checkbox({ text, isChecked, error, onChange: onChangeProp }: CheckboxProps) {
  const styles = React.useMemo(() => getCheckboxStyles({ isChecked, error }), [isChecked, error]);
  const onChange = () => onChangeProp(!isChecked);
  return (
    <Wrapper styles={[fullWidth, height(24), padding(4), flex, jc("flex-start"), ai("center")]}>
      <Wrapper
        as="button"
        styles={[
          transition("box-shadow 0.2s"),
          padding(0),
          disableOutline,
          borderNone,
          width(16),
          height(16),
          borderRadius(4),
          pointer,
          focus(boxShadow([0, 0, 0, 2, "blue/04"])),
          styles,
        ]}
        onClick={onChange}
      >
        {isChecked && <Icon width={16} height={16} icon="check" color="white" />}
      </Wrapper>
      <Typography styles={[marginLeft(12), cursor("default")]} onClick={onChange}>
        {text}
      </Typography>
    </Wrapper>
  );
}

export default React.memo(Checkbox);
