import React from "react";
import { Story } from "@storybook/react/types-6-0";

import Counter, { CounterInterface } from "../index";
import { selectControl } from "../../../storybook/storyHelpers";
import { BadgeType } from "../../Badge";

export default {
  title: "Counter",
  component: Counter.type,
  argTypes: {
    type: selectControl(Object.keys(BadgeType)),
  },
};

const Template: Story<CounterInterface> = (props) => {
  return <Counter {...props} />;
};

export const Default = Template.bind({});

Default.args = {
  value: 123,
  type: BadgeType.default,
};
