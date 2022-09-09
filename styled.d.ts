import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string
      secondary: string
      lightGray: string
      red: string
      gray: string
      green: string
    }
  }
}
