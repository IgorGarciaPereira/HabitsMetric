import { StyleSheet } from "react-native"

export const colors = {
  white: "#fff",
  black: "#000",
  primary: "#42213D",
  danger: "#DE1A1A",
  success: "#04A777",
  warning: "#FB8B24",
  milestone: "#D90368",
  info: "#355691",
}

export const typography = StyleSheet.create({
  h1: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },

  paragraph: {
    fontSize: 16,
    lineHeight: 24,
  }
})

export const theme = {
  typography,
  colors
}

export default theme
