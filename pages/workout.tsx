import { Modal, Text, View, StyleSheet, TouchableOpacity, TextInput } from "react-native"
import SelectDropdown from 'react-native-select-dropdown'
import FabButton from '../components/fabButton'
import { GlobalStyle, theme } from "../style"
import { useState } from "react"

const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

interface IWorkout {
  name: string;
  total_weight: number;
  weekday: number;
  body_area: string;
}

export const Workout = () => {
  const [modal, setModal] = useState<boolean>(false)
  const [workout, setWorkout] = useState<IWorkout>({} as IWorkout)

  const handleGetCurrentWeekday = () => new Date().getDay()

  const handleGetTrainingOfDay = () => {}

  return (
    <View style={[GlobalStyle.wrapperContainer, GlobalStyle.screen]}>
      <View style={style.weekday}>
        <SelectDropdown
          defaultValue={weekdays[handleGetCurrentWeekday()]}
          defaultButtonText='Select a weekday'
          data={weekdays}
          onSelect={(selectedItem, index) => console.log(selectedItem, index)}
        />
      </View>
      <Text>Workout page</Text>
      <FabButton onPress={() => setModal(true)}/>

      <Modal
        animationType="slide"
        visible={modal}
        transparent={true}
        onRequestClose={() => setModal(false)}
      >
        <View style={GlobalStyle.modalWrapper}>
          <View style={GlobalStyle.modalContent}>
            <View style={{ marginBottom: 16, gap: 16}}>
              <TextInput style={GlobalStyle.input} placeholder="Name"/>
              <TextInput style={GlobalStyle.input} placeholder="Weight (Kg)"/>
              <TextInput style={GlobalStyle.input} placeholder="Body area"/>
              <SelectDropdown
                defaultValue={weekdays[handleGetCurrentWeekday()]}
                defaultButtonText='Select a weekday'
                data={weekdays}
                buttonStyle={style.buttonSelect}
                buttonTextStyle={{color: theme.colors.white}}
                onSelect={(selectedItem, index) => console.log(selectedItem, index)}
              />
            </View>

            <View style={{ flexDirection: 'row', gap: 16}}>
              <TouchableOpacity onPress={() => setModal(false)} style={[GlobalStyle.outlinedButton, {flex: 1}]}>
                <Text style={{textAlign: 'center'}}>Close</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[GlobalStyle.button, {flex: 1}]}>
                <Text style={{color: theme.colors.white, textAlign: 'center'}} >Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const style = StyleSheet.create({
  weekday: {
    width: '100%',
    alignItems: "center"
  },

  buttonSelect: {
    height: 40,
    width: "100%",
    backgroundColor: theme.colors.primary,
    opacity: 0.9,
    borderColor: theme.colors.primary,
    borderWidth: 1,
    borderRadius: 4,
  }
})

export default Workout