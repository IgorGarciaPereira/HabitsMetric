import { Button, Text, View } from "react-native"
import { GlobalStyle } from "../style"
import { deleteChallengesTable, getDatabase } from "../database/database"

const db = getDatabase()

export const Timetable = () => {
  return (
    <View style={GlobalStyle.wrapperContainer}>
      <Text>Home page</Text>
      <Button title="Drop database" onPress={() => {
        deleteChallengesTable(db)
      }}/>
    </View>
  )
}

export default Timetable
