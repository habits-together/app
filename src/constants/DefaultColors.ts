import colors from "./colors";

export default {
  light: {
    text: colors.black,
    background: colors.white,
    tint: colors.stone.base,
    tabIconDefault: colors.stone["300"],
    tabIconSelected: colors.stone.base,
  },
  dark: {
    text: colors.white,
    background: colors.stone.base,
    tint: colors.white,
    tabIconDefault: colors.stone["300"],
    tabIconSelected: colors.white,
  },
};
