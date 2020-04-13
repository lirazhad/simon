
import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from '../screens/home-screen'
import GameScreen from '../screens/game-screen'
import ScoreScreen from '../screens/score-screen'

export type RootStackParamList = {
  Home: undefined
  Game: { userName: string }
  Score: { userName: string, userScore: number }
}

export const RootNavigator = ()=> {

const RootStack = createStackNavigator<RootStackParamList>()

  return (
    <NavigationContainer>
      <RootStack.Navigator 
      screenOptions={{
        headerShown: false
      }}
      initialRouteName="Home">
        <RootStack.Screen 
        name="Home" 
        component={HomeScreen} />
        <RootStack.Screen
          name="Game"
          component={GameScreen}
        />
        <RootStack.Screen 
          name="Score" 
          component={ScoreScreen} />
    </RootStack.Navigator>
    </NavigationContainer>
  )

}

