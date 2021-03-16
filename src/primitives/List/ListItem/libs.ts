import {
  ai,
  backgroundColor,
  borderNone,
  borderRadius,
  boxShadow,
  disableOutline,
  flex,
  focus,
  horizontalPadding,
  hover,
  margin,
  minHeight,
  opacity,
  pointer,
  transition,
} from "../../../styles";
import { duration160 } from "../../../constants/durations";

import { ListItemSize } from "./enum";

const heightForItemSize: Record<ListItemSize, number> = {
  [ListItemSize.LARGE]: 48,
  [ListItemSize.MEDIUM]: 40,
  [ListItemSize.SMALL]: 32,
};
interface ListItemStylesInterface {
  size: ListItemSize;
  enabled: boolean;
  active?: boolean;
  hovered?: boolean;
}

export function getListItemStyles({ size, enabled, active, hovered }: ListItemStylesInterface) {
  return [
    backgroundColor("transparent"),
    disableOutline,
    borderNone,
    minHeight(heightForItemSize[size]),
    flex,
    margin("2px 1px"),
    ai("center"),
    borderRadius(4),
    horizontalPadding(8),
    transition(`all ${duration160}`),
    enabled
      ? [
          pointer,
          hovered && hover([backgroundColor("definitions.ListItem.Selected.backgroundColor")]),
          focus(boxShadow([0, 0, 0, 2, "definitions.Button.focus.color"])),
        ]
      : [opacity(0.3)],
    active && [backgroundColor("definitions.ListItem.Selected.backgroundColor")],
  ];
}
