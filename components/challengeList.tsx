import { FC, useEffect, useState } from "react";
import { FlatList, Text, View, StyleSheet, Pressable, Modal, TextInput, TouchableOpacity } from "react-native"
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { GlobalStyle, theme } from "../style/index"
import { getDatabase } from "../utils/database"
import { IChallengeCreate, IItemList } from "../types/challenge"
import { createChallengeService, getChallengesService } from "../services/challenge.service"


const ItemList:FC<IItemList> = ({ name, id, handleDelete, handlePress }) => {
  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={style.item}>
        <Text>{name}</Text>
        <Pressable style={style.item.button} onPress={() => handleDelete(id)}>
          <Ionicons name="trash-outline" size={16} color="white" />
        </Pressable>
      </View>
    </TouchableOpacity>
  )
}


export const ChallengeList = ({ navigation }) => {
  const [challenges, setChallenges] = useState<any[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [newChallenge, setNewChallenge] = useState<IChallengeCreate>({} as IChallengeCreate);
  const db = getDatabase()

  const createChallenge = () => {
    const d = new Date()
    const starDate = d.toISOString().split("T")[0]

    createChallengeService(
      {...newChallenge, created_at: starDate},
      () => { alert("Challenge created!"); getChallenges(); },
      (_) => alert("Error to create challenge")
    )
  }

  const getChallenges = () => {
    getChallengesService(undefined, (values) => setChallenges(values), (error) => console.log(error))
  }

  const deleteChallenge = (challengeId: number) => {
    const sqlString = `DELETE FROM challenges WHERE id = ?`
    db.transaction(
      ctx => ctx.executeSql(sqlString, [challengeId],
        () => getChallenges(),
        (_, error) => { console.log(error); return false;}
      )
    )
  }

  /* Modal */
  const handleCloseModal = () => {
    setShowModal(false);
  }
  const handleCreateChallenge = () => {
    createChallenge();
    setNewChallenge({} as IChallengeCreate)
    handleCloseModal();
  }

  const changeDate = (event: any) => {
    const timestamp = event.nativeEvent.timestamp
    const date = new Date(timestamp)
    const dateString = date.toISOString().split("T")[0]
    setNewChallenge(state => ({...state, target_date: dateString}))
    setShowDatePicker(false)
  }

  useEffect(() => {
    getChallenges()
    return () => undefined
  }, [])

  return (
    <View style={style.container}>
      <View style={{paddingBottom: 16, marginBottom: 16, borderBottomWidth: 1}}>
        <Text style={[theme.typography.h1, {marginBottom: 16}]}>Challenges in progress: {challenges.length}</Text>
        <TouchableOpacity style={GlobalStyle.button} onPress={() => setShowModal(true)}>
          <Text style={{color: theme.colors.white, textAlign: "center"}} >Create challenge</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        visible={showModal}
        transparent={true}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={style.centeredView}>
          <View style={style.modalView}>
            <View style={{ flexDirection: "row"}}>
              <TextInput
                style={GlobalStyle.input}
                placeholder="Name"
                value={newChallenge.name}
                onChangeText={(name) => setNewChallenge(state => ({...state, name}))}
              />
            </View>
            <View style={{ flexDirection: "row" }}>
              <Pressable
                style={[GlobalStyle.input, {height: 32, justifyContent: "center"}]}
                onPress={() => setShowDatePicker(true)}
              >
                <Text>Data objetivo para conclusão</Text>
                {
                  showDatePicker &&
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={new Date()}
                    mode="date"
                    is24Hour={true}
                    onChange={changeDate}
                  />
                }
              </Pressable>
            </View>
            <View style={{ flexDirection: "row", gap: 16 }}>
              <TouchableOpacity style={[GlobalStyle.outlinedButton, {flex: 1}]} onPress={handleCloseModal}>
                <Text style={{color: theme.colors.primary}}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[GlobalStyle.button, {flex: 1}]} onPress={handleCreateChallenge}>
                <Text style={{color: theme.colors.white}}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <FlatList
        data={challenges}
        renderItem={({item}) => <ItemList {...item} handleDelete={deleteChallenge} handlePress={() => navigation.push("Details", {id: item.id})}/>}
        keyExtractor={item => item.id}
      />
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    padding: 8
  },

  item: {
    elevation: 2,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 4,
    marginVertical: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    button: {
      borderRadius: 4,
      padding: 8,
      width: 32,
      backgroundColor: theme.colors.danger,
    },
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: "#00000055"
  },

  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    gap: 16,
  },
})