import { useEffect, useState } from "react";

import { InputIconProp } from "../../InputContainer";

interface HookShowedRightIconInterface {
  selected: boolean;
  rightContent: InputIconProp;
  showArrowOnSelection?: boolean;
}

type ResultRightContentType = InputIconProp | undefined;

export function useSetRightIcon({ selected, rightContent, showArrowOnSelection }: HookShowedRightIconInterface): any {
  const [resultRightContent, setResultRightContent] = useState<ResultRightContentType>();

  useEffect(() => {
    if (showArrowOnSelection) {
      if (selected) {
        setResultRightContent("check");
        return;
      }

      setResultRightContent(undefined);
      return;
    }

    if (rightContent) {
      setResultRightContent(rightContent);
      return;
    }

    setResultRightContent(undefined);
  }, [resultRightContent, showArrowOnSelection, selected, rightContent, setResultRightContent]);

  return resultRightContent;
}