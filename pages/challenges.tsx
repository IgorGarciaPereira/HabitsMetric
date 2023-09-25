import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import { ChallengeList } from "../components/challengeList"
import { ChallengeDetails } from "../components/challengeDetails"

const Stack = createStackNavigator();

export const Challenge = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="List">
        <Stack.Screen name="Challenges" component={ChallengeList} options={{
          headerStyle: {backgroundColor: "transparent"},
          title: ""
        }}/>
        <Stack.Screen name="Details" component={ChallengeDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Challenge
