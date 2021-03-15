import React, { useRef } from "react";

import { InputIconProp } from "../../Input/InputWrapper";

interface HookShowedRightIconInterface {
  selected: boolean;
  rightContent: InputIconProp | React.ReactNode;
  showArrowOnSelection?: boolean;
}

type ResultRightContentType = InputIconProp | React.ReactNode | undefined;
export function useShowedRightIcon({
  selected,
  rightContent,
  showArrowOnSelection,
}: HookShowedRightIconInterface): any {
  const resultRightContent = useRef<ResultRightContentType>(undefined);

  const setAndReturnRightContent = (rightContent: ResultRightContentType) => {
    resultRightContent.current = rightContent;
    return resultRightContent;
  };

  if (showArrowOnSelection) {
    if (selected) return setAndReturnRightContent("check");

    return setAndReturnRightContent(undefined);
  }

  if (rightContent) return setAndReturnRightContent(rightContent);

  return setAndReturnRightContent(undefined);
}