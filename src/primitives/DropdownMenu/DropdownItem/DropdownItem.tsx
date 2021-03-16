import React, { useCallback, useMemo } from "react";

import { InputIconProp, ListItemSize } from "../../../index";
import ListItem from "../../List/ListItem";
import { useSetRightIcon } from "./useSetRightIcon";

import { VisibilityManagerContext } from "../../VisibleManager/VisibilityManagerContext";
import { DropdownManagerContext } from "../DropdownManager/DropdownManagerContext";

export interface DropdownItemInterface {
  leftContentStyles?: any;
  rightContentStyles?: any;
  children: string;
  disabled?: boolean;
  itemSize?: ListItemSize;
  titleStyles?: any;
  titleDots?: boolean;
  styles?: any;
  leftContent?: InputIconProp;
  rightContent?: InputIconProp;
  heading?: string | number;
  subTitle?: string;
  code: string;
  showArrowOnSelection?: boolean;
  showIconRightOnHover?: boolean;
  showIconLeftOnHover?: boolean;
  canSelect?: boolean;
}

function DropdownItem({
  leftContentStyles,
  rightContentStyles,
  disabled,
  titleDots,
  titleStyles,
  styles,
  children,
  leftContent,
  heading,
  rightContent,
  subTitle,
  code,
  showIconRightOnHover,
  showIconLeftOnHover,
  itemSize = ListItemSize.SMALL,
  showArrowOnSelection = true,
  canSelect = true,
}: DropdownItemInterface) {
  const { hide } = React.useContext(VisibilityManagerContext);
  const { selectedItem, onChange } = React.useContext(DropdownManagerContext);

  const isSelected = () => {
    if (disabled) return false;
    if (!canSelect) return false;
    return selectedItem ? selectedItem === code : false;
  };

  const selected = useMemo(isSelected, [selectedItem, code, canSelect, disabled]);

  const resultRightContent = useSetRightIcon({ selected, rightContent, showArrowOnSelection });

  const handleClick = useCallback(() => {
    if (!canSelect) return;

    if (!onChange || disabled) {
      hide();
      return;
    }

    onChange(code);
    hide();
  }, [canSelect, onChange, disabled, code, hide]);

  const itemProps = useMemo(
    () => ({
      rightContentStyles,
      leftContentStyles,
      rightContent: resultRightContent,
      leftContent,
      title: children,
      code,
      disabled,
      heading,
      subTitle,
    }),
    [
      rightContentStyles,
      leftContentStyles,
      children,
      leftContent,
      rightContent,
      resultRightContent,
      code,
      heading,
      subTitle,
      disabled,
    ],
  );

  return (
    <ListItem
      rightContent={resultRightContent}
      code={code}
      disabled={disabled}
      size={itemSize}
      active={selected}
      titleDots={titleDots}
      titleStyles={titleStyles}
      styles={styles}
      item={itemProps}
      showIconRightOnHover={showIconRightOnHover}
      showIconLeftOnHover={showIconLeftOnHover}
      showArrowOnSelection={showArrowOnSelection}
      onClick={handleClick}
      title={children}
    />
  );
}

export default React.memo(DropdownItem);
