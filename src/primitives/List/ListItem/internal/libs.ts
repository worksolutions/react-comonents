import {
  ai,
  backgroundColor,
  borderNone,
  borderRadius,
  boxShadow,
  child,
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
} from "../../../../styles";
import { duration160 } from "../../../../constants/durations";

import { ListItemSize } from "../enum";

const heightForItemSize: Record<ListItemSize, number> = {
  [ListItemSize.LARGE]: 48,
  [ListItemSize.MEDIUM]: 40,
  [ListItemSize.SMALL]: 32,
};

interface ListItemStylesInterface {
  size: ListItemSize;
  disabled?: boolean;
  selected?: boolean;
  hoverable?: boolean;
}

export function getListItemStyles({ size, disabled, selected, hoverable }: ListItemStylesInterface) {
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
    child(transition(`opacity ${duration160}`), ".list-item-left-content"),
    child(transition(`opacity ${duration160}`), ".list-item-right-content"),
    selected
      ? backgroundColor("definitions.ListItem.Selected.backgroundColor")
      : backgroundColor("definitions.ListItem.UnSelected.backgroundColor"),
    disabled
      ? opacity(0.3)
      : hoverable &&
        !selected && [
          pointer,
          hover([backgroundColor("definitions.ListItem.UnSelected.hoverBackgroundColor")]),
          focus(boxShadow([0, 0, 0, 2, "definitions.ListItem.UnSelected.focusColor"])),
        ],
  ];
}
