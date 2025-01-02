import { COLORS } from "./colors";

export interface ITheme {
  text: string;
  background: string;
}

export const THEME: Record<"light" | "dark", ITheme> = {
  light: {
    background: COLORS.PRIMARY.light,
    text: COLORS.BLACK.main,
  },
  dark: {
    background: COLORS.BLACK.slate,
    text: COLORS.WHITE.main,
  },
};
