import { Button, Text, View } from "react-native"
import { GlobalStyle } from "../style"
import { runDownMigrations, getDatabase } from "../database/database"

const db = getDatabase()

export const Timetable = () => {
  return (
    <View style={GlobalStyle.wrapperContainer}>
      <Text>Home page</Text>
      <Button title="Drop database" onPress={() => {
        runDownMigrations(db)
      }}/>
    </View>
  )
}

export default Timetable
