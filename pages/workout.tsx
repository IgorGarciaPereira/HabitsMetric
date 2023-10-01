import { Modal, Text, View, StyleSheet, TouchableOpacity, TextInput } from "react-native"
import SelectDropdown from 'react-native-select-dropdown'
import { useEffect, useState } from "react"
import FabButton from '../components/fabButton'
import { GlobalStyle, theme } from "../style"
import { IWorkout } from '../types/workout'
import { WorkoutCrud } from '../database/workoutCrud'

const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export const Workout = () => {
  const [modal, setModal] = useState<boolean>(false)
  const [workout, setWorkout] = useState<IWorkout>({} as IWorkout)
  const [workDay, setWorkDay] = useState<IWorkout[]>([])
  const [currentDay, setCurrentDay] = useState<number>(0)

  const workoutCrud = new WorkoutCrud()

  const handleGetCurrentWeekday = () => new Date().getDay()
  const handleGetTrainingOfDay = (weekday: number) => {
    workoutCrud.get(
      {weekday},
      (values) => {
        const sortedValues = values.sort((a, b) => a.sequence_number - b.sequence_number)
        setWorkDay(sortedValues)
      },
      () => alert('Error to get workdays')
    )
  }
  const handleSaveWorkout = () => {
    let weekday = workout.weekday
    if (!weekday){
      weekday = currentDay
    }

    workoutCrud.create(
      {...workout, weekday, sequence_number: workDay.length},
      () => {
        setWorkout({} as IWorkout)
        setModal(false)
        alert('Workout created')
        handleGetTrainingOfDay(currentDay);
      },
      (error) => {
        alert('Error to save workout')
        console.log(error)
      }
    )
  }

  useEffect(() => {
    const c = handleGetCurrentWeekday()
    setCurrentDay(c)
    handleGetTrainingOfDay(c)
  }, [])

  return (
    <View style={[GlobalStyle.wrapperContainer, GlobalStyle.screen]}>
      <View style={style.weekday}>
        <SelectDropdown
          defaultValue={weekdays[currentDay]}
          defaultButtonText='Select a weekday'
          data={weekdays}
          onSelect={(_, index) => {
            setCurrentDay(index)
            handleGetTrainingOfDay(index)
          }}
        />
      </View>
      <View style={style.trainingView}>
        {!workDay.length && <Text style={style.warning}>No data</Text>}
        {workDay.map(item => (
          <View key={item.id} style={style.training}>
            <View style={style.rounded}>
              <Text style={style.tag}>{item.body_area}</Text>
            </View>
            <Text style={style.trainingText}>{item.name}</Text>
            <Text style={style.trainingWeight}>{item.total_weight}kg</Text>
          </View>
        ))}
      </View>
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
              <TextInput
                style={GlobalStyle.input}
                placeholder="Name"
                onChangeText={(name) => setWorkout(state => ({...state, name}))}
              />
              <TextInput
                style={GlobalStyle.input}
                placeholder="Weight (Kg)"
                onChangeText={(total_weight) => setWorkout(state => ({...state, total_weight: +total_weight}))}
              />
              <TextInput
                style={GlobalStyle.input}
                placeholder="Body area"
                onChangeText={(body_area) => setWorkout(state => ({...state, body_area}))}
              />
              <SelectDropdown
                defaultValue={weekdays[currentDay]}
                defaultButtonText='Select a weekday'
                data={weekdays}
                buttonStyle={style.buttonSelect}
                buttonTextStyle={{color: theme.colors.white}}
                onSelect={(_, index) => {
                  setWorkout(state => ({...state, weekday: index}))
                }}
              />
            </View>

            <View style={{ flexDirection: 'row', gap: 16}}>
              <TouchableOpacity onPress={() => setModal(false)} style={[GlobalStyle.outlinedButton, {flex: 1}]}>
                <Text style={{textAlign: 'center'}}>Close</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[GlobalStyle.button, {flex: 1}]} onPress={handleSaveWorkout}>
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
  },

  trainingView: {
    gap: 8
  },

  training: {
    height: 50,
    flexDirection: 'row',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    backgroundColor: theme.colors.white,
    borderRadius: 8,
    alignItems: "center"
  },
  trainingText: {
    lineHeight: 24,
    fontSize: 16,
    flex: 1
  },

  tag: {
    backgroundColor: theme.colors.info,
    color: theme.colors.white,
    alignItems: 'center',
    textAlign: 'center',
    minWidth: 70,
    marginRight: 8,
    paddingHorizontal: 8,
    fontSize: 16,
    lineHeight: 50,
  },

  rounded: {
    borderRadius: 8,
    overflow: 'hidden',
  },

  trainingWeight: {
    fontSize: 16,
    fontWeight: "bold",
    width: 60,
  },

  warning: {
    fontSize: 24,
    textAlign: "center",
    lineHeight: 30,
    marginTop: 50
  }
})

export default Workout