import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Challenge, Goals, Stopwatch, Timetable, Todo } from "./pages"
import { useEffect } from 'react';

import { runMigrations, getDatabase } from "./utils/database"

const Drawer = createDrawerNavigator();

export default function App() {

  useEffect(() => {
    const db = getDatabase()
    /* Running migrations */
    runMigrations(db)
    return () => undefined;
  }, []);
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Timetable" component={Timetable} />
        <Drawer.Screen name="To do" component={Todo} />
        <Drawer.Screen name="Challenges" component={Challenge} />
        <Drawer.Screen name="Goals" component={Goals} />
        <Drawer.Screen name="Stopwatch" component={Stopwatch} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

AppRegistry.registerComponent("main", () => App)