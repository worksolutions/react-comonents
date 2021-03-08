import React from "react";
import { Story } from "@storybook/react/types-6-0";

import DropdownItem, { DropdownItemProps } from "../DropdownItem/DropdownItem";
import Wrapper from "../../Wrapper";
import { ListItemSize } from "../DropdownItem/types";
import { internalIcons } from "../../Icon/list";

import { minWidth } from "styles";
import { selectControl } from "storybook/storyHelpers";

export default {
  title: "DropDownMenu/DropdownItem",
  component: DropdownItem.type,
  argTypes: {
    itemSize: selectControl(Object.values(ListItemSize)),
    leftContent: selectControl(Object.keys(internalIcons)),
    rightContent: selectControl(Object.keys(internalIcons)),
  },
};

const Template: Story<DropdownItemProps> = (props: any) => {
  return (
    <Wrapper styles={[minWidth(200)]}>
      <DropdownItem {...props} />
    </Wrapper>
  );
};

export const Default = Template.bind({});

Default.args = {
  itemSize: ListItemSize.MEDIUM,
  code: "DropdownItemElement2",
  subTitle: "Еще один тайтл",
  children: "DropdownItemElement2",
};