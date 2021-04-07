import React from "react";
import { IncomeColorVariant, provideRef, useEffectSkipFirst } from "@worksolutions/react-utils";

import Typography from "../Typography";
import SelectTrigger from "./internal/SelectTrigger";
import PopupManager, { PopupManagerInterface, PopupManagerMode, PopupManagerRef } from "../PopupManager";
import Icon, { InternalIcons } from "../Icon";
import InputContainer, { InputContainerInterface } from "../InputContainer";

import { paddingLeft, transform, transition, verticalPadding } from "../../styles";
import { duration160 } from "../../constants/durations";
import SelectPopupList, { detectIsSelectItem } from "./internal/SelectPopupList";
import { SelectItemCode, SelectItemInterface } from "./SelectItem";
import { Colors } from "../../constants/colors";

import { tooltipPopupStyles } from "../Tooltip";
import { ListItemSize } from "../List/ListItem/enum";
import { matchListItemSizesAndInputContainerSizes } from "../List/internal/sizeMatches";

export type SelectInterface<CODE extends SelectItemCode> = Omit<
  PopupManagerInterface,
  "mode" | "closeOnClickOutside" | "popupElement" | "renderTriggerElement"
> &
  Omit<
    InputContainerInterface,
    "onClick" | "outerRef" | "children" | "rightIcon" | "leftIcon" | "leftIconStyles" | "size"
  > & {
    styles?: any;
    placeholder?: string;
    placeholderStyles?: any;
    placeholderColor?: IncomeColorVariant<Colors>;
    children:
      | (React.ReactElement<SelectItemInterface<CODE>> | React.ReactNode)[]
      | React.ReactElement<SelectItemInterface<CODE>>
      | React.ReactNode;
    additionalSelectedElements?: Record<string | number, React.ReactElement<SelectItemInterface<any>>>;
    rightIcon?: InternalIcons;
    selectedElementStyles?: any;
    selectedElementTextStyles?: any;
    rightIconStyles?: any;
    rightIconWidth?: number | string;
    rightIconHeight?: number | string;
    rightIconColor?: IncomeColorVariant<Colors>;
    closePopupAfterChange?: boolean;
    selectedElementWrapper?: <C extends CODE>(currentText: string | number, code: C) => string | number;
    selectedItemCode: CODE;
    loading?: boolean;
    popupTopElement?: React.ReactNode;
    popupBottomElement?: React.ReactNode;
    size?: ListItemSize;
    popupScrollableElementRef?: React.Ref<HTMLElement>;
    popupElementWrapper?: (child: JSX.Element) => JSX.Element;
    onChange: (newActiveCode: CODE, newSelected: boolean) => void;
  };

function Select<CODE extends SelectItemCode>(
  {
    rightIcon = "arrow-down",
    rightIconColor = "definitions.Select.RightIcon.color",
    rightIconHeight,
    rightIconWidth,
    rightIconStyles,
    selectedItemCode,
    selectedElementWrapper,
    selectedElementStyles,
    selectedElementTextStyles,
    additionalSelectedElements = {},
    closePopupAfterChange = true,
    children,
    popupElementWrapper,
    popupScrollableElementRef,
    placeholder,
    placeholderStyles,
    placeholderColor = "definitions.Select.Placeholder.color",
    popupStyles,
    popupTopElement,
    popupBottomElement,
    primaryPlacement,
    offset,
    popupWidth,
    strategy,
    hasArrow,
    loading,
    styles,
    size = ListItemSize.MEDIUM,
    onChange,
    onChangeOpened,
    ...inputContainerProps
  }: SelectInterface<CODE>,
  ref: React.Ref<PopupManagerRef>,
) {
  const popupManagerRef = React.useRef<PopupManagerRef>(null!);

  useEffectSkipFirst(() => {
    if (!closePopupAfterChange) return;
    popupManagerRef.current.hide();
  }, [selectedItemCode]);

  const childrenElements = React.Children.toArray(children) as React.ReactElement<SelectItemInterface<CODE>>[];

  const selectedElement = React.useMemo(() => {
    const importantElements = childrenElements.filter(detectIsSelectItem);

    const foundElement =
      additionalSelectedElements[selectedItemCode!] ||
      importantElements.find((element) => element.props.code === selectedItemCode);

    if (!foundElement) return null;

    const { props } = foundElement;
    return React.cloneElement(foundElement, {
      children: selectedElementWrapper ? selectedElementWrapper(props.children, selectedItemCode) : props.children,
      hoverable: false,
      selected: false,
      size: props.size || size,
      styles: [props.styles, selectedElementStyles],
      mainTextStyles: [props.mainTextStyles, selectedElementTextStyles],
      onClick: undefined,
    });
  }, [
    childrenElements,
    additionalSelectedElements,
    selectedItemCode,
    selectedElementWrapper,
    size,
    selectedElementStyles,
    selectedElementTextStyles,
  ]);

  const popupElement = (
    <SelectPopupList
      ref={popupScrollableElementRef}
      selectedItemCode={selectedItemCode}
      loading={loading}
      popupTopElement={popupTopElement}
      popupBottomElement={popupBottomElement}
      onChange={onChange}
    >
      {childrenElements.map((element) => React.cloneElement(element, { size: element.props.size || size }))}
    </SelectPopupList>
  );

  return (
    <PopupManager
      ref={provideRef(popupManagerRef, ref)}
      primaryPlacement={primaryPlacement}
      mode={PopupManagerMode.CLICK}
      offset={offset}
      popupWidth={popupWidth}
      strategy={strategy}
      hasArrow={hasArrow}
      popupStyles={[tooltipPopupStyles, popupStyles]}
      popupElement={popupElementWrapper ? popupElementWrapper(popupElement) : popupElement}
      renderTriggerElement={({ initRef, visible }) => (
        <InputContainer
          {...inputContainerProps}
          size={matchListItemSizesAndInputContainerSizes[size]}
          outerRef={initRef}
          rightIcon={
            <Icon
              icon={rightIcon}
              width={rightIconWidth}
              height={rightIconHeight}
              styles={[
                transition(`all ${duration160}`),
                transform(`rotateZ(${visible ? "180deg" : "0deg"})`),
                rightIconStyles,
              ]}
              color={rightIconColor}
            />
          }
          renderComponent={(inputContainerStyles) => (
            <SelectTrigger
              styles={[inputContainerStyles, selectedElement && [verticalPadding(0), paddingLeft(4)], styles]}
            >
              {selectedElement || (
                <Typography dots color={placeholderColor} styles={placeholderStyles}>
                  {placeholder}
                </Typography>
              )}
            </SelectTrigger>
          )}
        />
      )}
      onChangeOpened={onChangeOpened}
    />
  );
}

export default React.memo(React.forwardRef(Select)) as <CODE extends SelectItemCode>(
  props: SelectInterface<CODE>,
) => JSX.Element;
