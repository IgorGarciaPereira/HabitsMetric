import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GlobalStyle, theme } from '../style';
import { useCallback, useState } from 'react';

export const Stopwatch = () => {
  const [timer, setTime] = useState<number>(0)
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | undefined>(undefined)
  const [laps, setLaps] = useState<number[]>([])

  const handleReset = () => {
    setTimerInterval(undefined)
    setTime(0)
    setLaps([])
  }

  const handleStart = () => {
    if (!timerInterval){
      let tInterval = setInterval(() => {
        setTime(time => time + 1)
      }, 1000)
      setTimerInterval(tInterval)
    }
  }

  const handleStop = () => {
    clearInterval(timerInterval)
    setTimerInterval(undefined)
  }

  const handleMarkLap = () => setLaps(state => [...state, timer])

  const padZero = (value: number) => value.toString().length < 2 ? `0${value}` : value
  const formatTimer = (value: number) => {
    const hours = Number.parseInt(`${value / 3600}`)
    const minutes = Number.parseInt(`${(value - (hours * 3600)) / 60}`)
    const seconds = value - (minutes * 60)
    return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`
  }

  const displayTime = useCallback(() => formatTimer(timer), [timer])

  return (
    <View style={[GlobalStyle.wrapperContainer, style.screen]}>
      <View style={{flex: .6, justifyContent: 'center'}}>
        <Text style={style.timer}>{displayTime()}</Text>
      </View>

      <View style={{ flexDirection: "row", gap: 16, justifyContent: "center"}}>
        <TouchableOpacity style={GlobalStyle.outlinedButton} onPress={handleStart}>
          <Text>Start</Text>
        </TouchableOpacity>
        <TouchableOpacity style={GlobalStyle.outlinedButton} onPress={handleStop}>
          <Text>Stop</Text>
        </TouchableOpacity>
        <TouchableOpacity style={GlobalStyle.outlinedButton} onPress={handleReset}>
          <Text>Reset</Text>
        </TouchableOpacity>
        <TouchableOpacity style={GlobalStyle.outlinedButton} onPress={handleMarkLap}>
          <Text>Marker</Text>
        </TouchableOpacity>
      </View>

      <View style={{flex: .4, paddingTop: 16}}>
        <Text>Laps:</Text>
        <FlatList
          data={laps}
          renderItem={({item, index}) => <Text key={index} style={theme.typography.paragraph}>{formatTimer(item)}</Text>}
        />
      </View>
    </View>
  )
}

export default Stopwatch


const style = StyleSheet.create({
  screen: {
    flex: 1,
  },
  timer: {
    fontSize: 64,
    textAlign: "center",
    fontWeight: "bold"
  }
})