import React from "react";
import { animated } from "react-spring";
import { useHover } from "react-use";
import { Placement } from "@popperjs/core";
import { provideRef, useEffectSkipFirst, preventDefaultAndStopPropagationHandler } from "@worksolutions/react-utils";

import { borderRadius, cursor, maxWidth, minWidth, padding, position, backgroundColor, boxShadow } from "../../styles";

import Wrapper from "../Wrapper";
import { usePopper, getPopperMarginStyleForPlacement } from "../Popper/usePopper";
import HandleClickOutside from "../HandleClickOutside";
import { useVisibilityAnimation } from "../Popper/useVisibilityAnimation";

import List from "./index";
import { ListItemInterface, ListItemSize } from "./ListItem";
import { zIndex_popup } from "../../constants/zIndexes";
import { elevation16Raw } from "../../constants/shadows";

export enum DroppedListOpenMode {
  HOVER,
  CLICK,
}

interface DroppedListStateController {
  toggle: () => void;
  opened: boolean;
  open: () => void;
  close: () => void;
}

export interface DroppedListInterface<ITEM extends string | number> {
  emptyText?: string;
  topComponent?: React.ReactNode;
  bottomComponent?: React.ReactNode;
  itemsWrapper?: (child: React.ReactNode) => React.ReactNode;
  includeMinWidthCalculation?: boolean;
  mode?: DroppedListOpenMode;
  placement?: Placement;
  itemSize?: ListItemSize;
  ignoreClickOutsideElements?: (HTMLElement | undefined | null)[];
  margin: number;
  selectedItemIds?: (ITEM | null | undefined)[];
  items?: ListItemInterface<ITEM>[];
  groupedItems?: { groupName: string; items: ListItemInterface<ITEM>[] }[];
  children: (state: DroppedListStateController, parentRef: any, subChild: JSX.Element) => JSX.Element;
  onChange: (id: ITEM, close: () => void) => void;
  onClose?: () => void;
}

const ComponentByOpenMode: Record<
  DroppedListOpenMode,
  (props: {
    opened: boolean;
    open: () => void;
    close: () => void;
    ignoreHtmlClickElements?: (HTMLElement | undefined | null)[];
    children: (ref?: any) => JSX.Element;
  }) => JSX.Element
> = {
  [DroppedListOpenMode.CLICK]: ({ opened, close, children, ignoreHtmlClickElements }) => {
    return (
      <HandleClickOutside ignoreElements={ignoreHtmlClickElements} enabled={opened} onClickOutside={close}>
        {(ref) => children(ref)}
      </HandleClickOutside>
    );
  },
  [DroppedListOpenMode.HOVER]: ({ open, close, children }) => {
    const [hoverable, hovered] = useHover(() => {
      return <div>{children()}</div>;
    });

    React.useEffect(() => {
      if (hovered) {
        open();
        return;
      }
      close();
    }, [hovered]);

    return <Wrapper styles={[position("relative")]}>{hoverable}</Wrapper>;
  },
};

const toggleByOpenMode: Record<DroppedListOpenMode, (opened: boolean, open: () => void, close: () => void) => void> = {
  [DroppedListOpenMode.CLICK]: (opened, open, close) => (opened ? close() : open()),
  [DroppedListOpenMode.HOVER]: () => undefined,
};

function DroppedList({
  emptyText,
  topComponent,
  bottomComponent,
  itemsWrapper,
  includeMinWidthCalculation = true,
  mode = DroppedListOpenMode.CLICK,
  placement: placementProp = "bottom-start",
  itemSize,
  selectedItemIds = [],
  ignoreClickOutsideElements,
  items,
  margin: marginProp,
  children,
  onChange,
  onClose,
}: DroppedListInterface<any>) {
  const { placement, opened, open, close, initPopper } = usePopper({ placement: placementProp });
  const { style } = useVisibilityAnimation(opened);
  useEffectSkipFirst(() => {
    if (opened) return;
    if (!onClose) return;
    onClose();
  }, [opened]);

  const Component = ComponentByOpenMode[mode];
  const toggle = toggleByOpenMode[mode];

  const renderItems = () => {
    if (!items) return null;

    const ItemsList = (
      <List
        emptyText={emptyText}
        itemSize={itemSize}
        titleDots
        activeItemIds={selectedItemIds}
        items={items}
        onClick={(id) => onChange(id, close)}
      />
    );

    return itemsWrapper ? itemsWrapper(ItemsList) : ItemsList;
  };

  const renderChild = (clickOutsideRef: any) =>
    children(
      {
        opened,
        open,
        close,
        toggle: () => toggle(opened, open, close),
      },
      provideRef(clickOutsideRef, initPopper("parent")),
      <>
        {opened && (
          <Wrapper
            as={animated.div}
            style={style}
            ref={initPopper("child")}
            styles={[
              cursor("default"),
              maxWidth(480),
              minWidth("100%"),
              includeMinWidthCalculation && minWidth("calc(100% + 40px)"),
              zIndex_popup,
            ]}
            onClick={preventDefaultAndStopPropagationHandler}
          >
            <Wrapper
              styles={[
                getPopperMarginStyleForPlacement(placement, marginProp),
                backgroundColor("white"),
                boxShadow(...elevation16Raw, [0, 0, 0, 1, "gray-blue/02"]),
                borderRadius(6),
                padding("4px 8px"),
              ]}
            >
              {topComponent}
              {renderItems()}
              {bottomComponent}
            </Wrapper>
          </Wrapper>
        )}
      </>,
    );

  return (
    <Component ignoreHtmlClickElements={ignoreClickOutsideElements} opened={opened} open={open} close={close}>
      {renderChild}
    </Component>
  );
}

export default React.memo(DroppedList) as <ITEM extends string | number>(
  props: DroppedListInterface<ITEM>,
) => JSX.Element;
