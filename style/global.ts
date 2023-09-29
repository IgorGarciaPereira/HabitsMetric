import { StyleSheet } from "react-native"
import { theme } from "./theme"

export const GlobalStyle = StyleSheet.create({
  screen: {
    flex: 1
  },

  wrapperContainer: {
    padding: 8
  },

  card: {
    backgroundColor: theme.colors.white,
    elevation: 5,
    padding: 16,
    borderRadius: 4,
    shadowColor: theme.colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },

  input: {
    borderWidth: 1,
    width: "100%",
    paddingHorizontal: 4,
    borderRadius: 4,
    height: 40,
  },

  button: {
    backgroundColor: theme.colors.primary,
    color: theme.colors.white,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
  },

  outlinedButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },

  modalWrapper: {
    flex: 1,
    backgroundColor: '#000a',
    justifyContent: "center",
    padding: 32
  },

  modalContent: {
    padding: 16,
    backgroundColor: theme.colors.white,
    borderRadius: 8,
  }
})

export default GlobalStyle
