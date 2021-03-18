import { DeepPartial } from "utility-types";
import { mergeDeepRight } from "ramda";
import { Theme as BaseTheme } from "@worksolutions/react-utils";

import { Colors } from "../constants/colors";
import { defaultTheme } from "./defaultTheme";
import { InputContainerVariantType } from "../primitives/InputContainer/libs";

export interface Theme extends BaseTheme<Colors> {
  definitions: {
    Icon: {
      default: {
        color: Colors;
      };
    };
    LoadingProvider: {
      Spinner: {
        color: Colors;
      };
      Backplate: {
        backgroundColor: Colors;
      };
    };
    Button: {
      primary: {
        color: Colors;
        backgroundColor: Colors;
      };
      focus: { color: Colors };
    };
    Tabs: {
      BottomLine: {
        color: Colors;
      };
      Tab: {
        backgroundColor: Colors;
        color: Colors;
        hoverColor: Colors;
      };
      TabActive: {
        color: Colors;
      };
    };
    Breadcrumbs: {
      LevelDivider: {
        color: Colors;
      };
      BreadcrumbsText: {
        color: Colors;
      };
      BreadcrumbsLink: {
        color: Colors;
      };
    };
    Avatar: {
      Empty: {
        color: Colors;
      };
      Wrapper: {
        backgroundColor: Colors;
        shadowColor: Colors;
      };
    };
    Editor: {
      TopPanel: {
        borderBottomColor: Colors;
        ButtonsGroupDivider: {
          color: Colors;
        };
        Item: {
          Active: {
            backgroundColor: Colors;
            color: Colors;
          };
          Inactive: {
            color: Colors;
            Hover: {
              backgroundColor: Colors;
            };
          };
        };
        Dropdown: {
          borderColor: Colors;
        };
      };
      ActiveArea: {
        backgroundColor: Colors;
      };
    };
    ListItem: {
      Selected: { backgroundColor: Colors };
    };
    DropdownRightIcon: {
      color: Colors;
    };
    Popper: {
      boxShadowColor: Colors;
    };
    ListItemsDivider: {
      backgroundColor: Colors;
    };
    Tooltip: {
      color: Colors;
    };
    DropdownMainButton: {
      colorText: Colors;
    };
    InputContainer: {
      rightIconColor: Colors;
      leftIconColor: Colors;
      hoverBoxShadowColor: Colors;
      focusBoxShadowColor: Colors;
      placeholderColor: Colors;
    };
    InputContainerVariantDefault: InputContainerVariantType;
    InputContainerVariantError: InputContainerVariantType;
    InputContainerVariantSuccess: InputContainerVariantType;
    InputContainerVariantDisabled: InputContainerVariantType;
    InputContainerTitle: {
      color: Colors;
    };
  };
}
export function makeTheme(overrides: DeepPartial<Theme> = {}): Theme {
  return mergeDeepRight(defaultTheme, overrides);
}
