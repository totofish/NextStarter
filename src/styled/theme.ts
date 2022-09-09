import { DefaultTheme } from 'styled-components'

export enum Color {
  PRIMARY = '#111',
  SECONDARY = '#0070f3',
  YALLOW = '#FF9D00',
  WHITE = '#FFFFFF',
  DARK = '#35363A',
  BLACK = '#2C2C2C',
  RED = '#D0021B',
  LIGHT_RED = '#F32038',
  LIGHT_GRAY = '#DADADA',
  GRAY = '#9B9B9B',
  DARK_GRAY = '#6A6A6A',
  GREEN = '#2a4700',
}

export const theme: { light: DefaultTheme; dark: DefaultTheme } = {
  light: {
    colors: {
      primary: Color.PRIMARY,
      secondary: Color.SECONDARY,
      lightGray: Color.LIGHT_GRAY,
      gray: Color.GRAY,
      red: Color.BLACK,
      green: Color.GREEN,
    },
  },
  dark: {
    colors: {
      primary: Color.PRIMARY,
      secondary: Color.SECONDARY,
      lightGray: Color.LIGHT_GRAY,
      gray: Color.GRAY,
      red: Color.RED,
      green: Color.GREEN,
    },
  },
}
