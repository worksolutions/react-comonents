import { Theme } from "./makeTheme";
import { colors as darkColors } from "../constants/colorsMap/dark";
import { InputContainerVariant } from "../primitives/InputContainer/enums";

export const defaultTheme: Theme = {
  colors: darkColors,
  definitions: {
    Icon: {
      default: {
        color: "gray-blue/05",
      },
    },
    LoadingProvider: {
      Spinner: { color: "gray-blue/09" },
      Backplate: { backgroundColor: "white" },
    },
    Button: {
      primary: {
        color: "white",
        backgroundColor: "blue/09",
      },
      focus: { color: "blue/04" },
    },
    Tabs: {
      BottomLine: { color: "red/05" },
      Tab: {
        backgroundColor: "transparent",
        color: "gray-blue/05",
        hoverColor: "gray-blue/07",
      },
      TabActive: { color: "gray-blue/09" },
    },
    Breadcrumbs: {
      BreadcrumbsLink: { color: "gray-blue/05" },
      BreadcrumbsText: { color: "gray-blue/05" },
      LevelDivider: { color: "gray-blue/05" },
    },
    DropdownSource: {
      textColor: "gray-blue/05",
    },
    ListItem: {
      Selected: { backgroundColor: "gray-blue/01" },
    },
    Popper: {
      boxShadowColor: "gray-blue/02",
    },
    DropdownDivider: {
      backgroundColor: "gray-blue/02",
    },
    Avatar: {
      Empty: { color: "gray-blue/05" },
      Wrapper: {
        backgroundColor: "gray-blue/01",
        shadowColor: "gray-blue/02",
      },
    },
    Editor: {
      TopPanel: {
        borderBottomColor: "gray-blue/02",
        ButtonsGroupDivider: {
          color: "gray-blue/02",
        },
        Item: {
          Active: {
            backgroundColor: "blue/02",
            color: "blue/05",
          },
          Inactive: {
            color: "gray-blue/07",
            Hover: {
              backgroundColor: "blue/01",
            },
          },
        },
        Dropdown: {
          borderColor: "gray-blue/02",
        },
      },
      ActiveArea: {
        backgroundColor: "gray-blue/01",
      },
    },
    DropdownRightIcon: {
      color: "gray-blue/07",
    },
    Tooltip: {
      color: "gray-blue/09",
    },
    DropdownMainButton: {
      colorText: "gray-blue/05",
    },
    InputContainer: {
      rightIconColor: "gray-blue/07",
      leftIconColor: "gray-blue/05",
      hoverBoxShadowColor: "gray-blue/03",
      focusBoxShadowColor: "blue/05",
    },
    InputContainerVariantDefault: {
      background: "gray-blue/01",
      shadowColor: "gray-blue/02",
      tip: "gray-blue/07",
      placeholder: "gray-blue/04",
      color: "gray-blue/09",
    },
    InputContainerVariantError: {
      background: "red/01",
      shadowColor: "red/05",
      tip: "red/07",
      placeholder: "red/03",
      color: "gray-blue/09",
    },
    InputContainerVariantSuccess: {
      background: "green/01",
      shadowColor: "green/05",
      tip: "green/07",
      placeholder: "gray-blue/04",
      color: "gray-blue/09",
    },
    InputContainerVariantDisabled: {
      background: "gray-blue/01",
      shadowColor: "transparent",
      tip: "gray-blue/07",
      placeholder: "gray-blue/02",
      color: "gray-blue/03",
    },
  },
};
