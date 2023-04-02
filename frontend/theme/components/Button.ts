import { border, ThemeComponents } from "@chakra-ui/react";

const Button: ThemeComponents["Button"] = {
  baseStyle: {},
  variants: {
    primary: {
      background: "transparent",
      borderWidth: 1,
      borderColor: "tourqouish",
      borderStyle: "solid",
      borderRadius: 10,
      boxShadow: "none",
      color: "tourqouish",
      _hover: {
        background: "tourqouish",
        color: "black",
      },
    },
    secondary: {
      background: "transparent",
      borderWidth: 1,
      borderColor: "white",
      borderStyle: "solid",
      borderRadius: 10,
      boxShadow: "none",
      color: "white",
      _hover: {
        background: "white",
        color: "black",
      },
    },
  },
  defaultProps: {
    variant: "primary",
  },
};

export default Button;
