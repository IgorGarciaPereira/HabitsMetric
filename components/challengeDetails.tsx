import { useEffect, useState } from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { completeChallengeService, getChallengesService } from "../services/challenge.service"
import { IChallenge } from "../types/challenge"
import { GlobalStyle, theme } from "../style/index"
import { ChallengesCrud } from "../database/challengesCrud"

export const ChallengeDetails = ({ navigation }) => {
  const state = navigation.getState()
  const params = state.routes[1]?.params
  const [challenge, setChallenge] = useState<IChallenge>({} as IChallenge)
  const challengeCrud = new ChallengesCrud()

  const handleGetChallenge = () => {
    challengeCrud.get({id: params.id}, (values: any[]) => setChallenge(values[0]), (error) => console.log(error))
  }

  const handleCompleteChallenge = () => {
    const completeDate = new Date().toISOString().split('T')[0]
    challengeCrud.update(
      {completed: true, completed_at: completeDate},
      challenge.id,
      () => {alert('Challenge done!'); handleGetChallenge();},
      (error) => { console.log(error); alert('Error to complete challenge')}
    )
  }

  useEffect(() => {
    if (params?.id) {
      handleGetChallenge()
    }
    return () => undefined
  }, [params?.id])

  return (
    <View style={GlobalStyle.wrapperContainer}>
      <View style={GlobalStyle.card}>
        <View style={style.header}>
          <Text style={[style.tag, challenge.completed ? style.tagCompleted : style.tagInProgress]}>
            {challenge.completed ? "Completed" : "In progress" }
          </Text>
          <Text style={theme.typography.h1}>
            {challenge.name}
          </Text>
        </View>
        <View>
          <Text style={theme.typography.paragraph}>Iniciado em: {challenge.created_at}</Text>
          <Text style={theme.typography.paragraph}>Data para encerramento: {challenge.target_date}</Text>
        </View>

        {
          !challenge.completed &&
          <View style={{justifyContent: "center", marginTop: 16}}>
            <TouchableOpacity onPress={handleCompleteChallenge} style={GlobalStyle.button}>
              <Text style={{color: theme.colors.white}}>Complete challenge</Text>
            </TouchableOpacity>
          </View>
        }

      </View>
    </View>
  )
}

const style = StyleSheet.create({
  header: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  tag: {
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    width: "auto"
  },
  tagInProgress: {
    borderColor: theme.colors.info,
    backgroundColor: theme.colors.info,
    color: theme.colors.white,
  },
  tagCompleted: {
    borderColor: theme.colors.success,
    backgroundColor: theme.colors.success,
    color: theme.colors.white,
  }
})