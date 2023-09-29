import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from "react-native"
import { theme } from "../style"
import { FC } from "react"

interface IFabButton extends TouchableOpacityProps {}

export const FabButton: FC<IFabButton> = ({...rest}) => {
  return (
    <TouchableOpacity style={style.fab} {...rest}>
      <Text style={style.fabText}>+</Text>
    </TouchableOpacity>
  )
}
export default FabButton

const style = StyleSheet.create({
  fab: {
    backgroundColor: theme.colors.primary,
    padding: 6,
    width: 64,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    position: 'absolute',
    bottom: 70,
    right: 50,
    elevation: 5,
    shadowColor: theme.colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  fabText: {
    color: theme.colors.white,
    fontSize: 32,
  }
})