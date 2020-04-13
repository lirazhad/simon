import React, {useEffect, useState, useMemo} from 'react'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../navigation/root-navigator'
import { RouteProp, StackActions } from '@react-navigation/native'
import PlayButton from '../components/play-button'
import { colors, states, playColors, animationProperties, appStyle } from '../constants'
import { StyleSheet, Animated, Text, View, TouchableOpacity, Alert } from 'react-native'
import getRandomColor from '../utils/get-random-color'
import playSound from '../utils/sound-manager'
import { spring } from '../assets/animation'

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Game'>
type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Game'>
type Props = {
    navigation: ProfileScreenNavigationProp
    route: ProfileScreenRouteProp
  }

const GameScreen: React.FC<Props> =  ({navigation, route})=> {
  
    const [springAnimRed] = useState(new Animated.Value(animationProperties.ANIMATION_INITIOAL_VALUE))  
    const [springAnimBlue] = useState(new Animated.Value(animationProperties.ANIMATION_INITIOAL_VALUE))  
    const [springAnimYellow] = useState(new Animated.Value(animationProperties.ANIMATION_INITIOAL_VALUE))  
    const [springAnimGreen] = useState(new Animated.Value(animationProperties.ANIMATION_INITIOAL_VALUE))  

    const [score, setScore] = useState(0)
    const [gameState, setGameState] = useState(states.START)
    const [steps, setSteps] = useState<string[]>([])
    const [moveIndex, setMoveIndex] = useState(0)

    const [disableUI, setDisableUI] = useState(true)
    const [disableMainButton, setDisableMainButton] = useState(false)
    const [userName, setUserName] = useState('')

    useEffect(()=>{
        setUserName(route.params.userName)
    },[])

    const nextMove = () => {
        setDisableUI(true)
        setDisableMainButton(true)

        const newStep = getRandomColor()
        const updatedSteps = [...steps, newStep]

        setMoveIndex(0)
        setGameState(states.PLAYING)
        setSteps(updatedSteps)

        preformAction(0, updatedSteps)
      }

      const preformAction = (counter: number,  updatedSteps: string[]) => {

        if(counter < updatedSteps.length){
          setTimeout(function(){
            playSound(updatedSteps[counter])
                let animation
                switch(updatedSteps[counter]){
                    case playColors.RED:
                        animation = springAnimRed
                      break

                    case playColors.BLUE:
                        animation = springAnimBlue
                      break

                    case playColors.GREEN:
                        animation = springAnimGreen
                      break

                    case playColors.YELLOW:
                        animation = springAnimYellow
                      break

                    default: 
                    animation = springAnimYellow

                }
                spring(animation)
                counter++
                if(counter === updatedSteps.length){
                    setTimeout(() => {
                        setDisableUI(false)
                        setGameState(states.TAP)    
                    }, 1000)       
                }
                preformAction(counter, updatedSteps)
          }, animationProperties.DELAY_BETWEEN_STEPS)
        }
      }


      const onPressButton = (color: string) => {
          if(color === steps[moveIndex]){
                playSound(color)
                setMoveIndex(moveIndex + 1)
              if(moveIndex === steps.length - 1){
                    setScore(steps.length)
                    nextMove()
              }
          }else{
            playSound('game over')
            Alert.alert(
                'Game Over',
                'you lost!',
                [
                  {text: 'OK', onPress: () => navigation.dispatch(
                    StackActions.replace('Score', {
                        userName: userName,
                        userScore: score
                    })
                  )
                }
                ],
                { cancelable: false }
              )}
      }
 
    return (
        <View style={styles.mainView}>
            <View style={styles.header}>
                <Text style={styles.headerText}>{userName}</Text>
                <Text style={styles.headerText}>{ 'Score: '+ score}</Text>
            </View>
            <View style={styles.boardPlay}>
                <PlayButton 
                    style={styles.red} 
                    animation={springAnimRed}
                    disabled={disableUI}
                    onPressButton={() => onPressButton(playColors.RED)}/>
                <PlayButton 
                    style={styles.blue} 
                    animation={springAnimBlue}
                    disabled={disableUI}
                    onPressButton={() => onPressButton(playColors.BLUE)}/>
                <PlayButton 
                    style={styles.green} 
                    animation={springAnimGreen}
                    disabled={disableUI}
                    onPressButton={() => onPressButton(playColors.GREEN)}/>
                <PlayButton 
                    style={styles.yellow} 
                    animation={springAnimYellow}
                    disabled={disableUI}
                    onPressButton={() => onPressButton(playColors.YELLOW)}/>
                <View style={styles.mainButtonContainer}>
                    <TouchableOpacity
                        disabled={disableMainButton}
                        onPress={nextMove}> 
                            <View style={styles.mainButton}>
                                <Text style={styles.mainButtonText}>{gameState}</Text>
                            </View>
                    </TouchableOpacity> 
                </View>
            </View>
         
        </View>
    )
}


const styles = StyleSheet.create({
    mainView: {
        width: '100%', 
        height: '100%', 
        alignItems: 'center',
        justifyContent: 'center'
    },
    header:{
        width: '100%',
        height: appStyle.HEADER_HEIGHT,
        position: 'absolute',
        top: 0,
        padding: appStyle.LARGE_PADDING,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: colors.MAIN,
        flexDirection: 'row'
    },
    headerText: {
        color: colors.WHITE,
        fontSize: appStyle.LARGE_FONT,
        margin: appStyle.LARGE_MARGIN
    },
    boardPlay: {
        width: appStyle.BOARD_GAME_SIZE,
        height: appStyle.BOARD_GAME_SIZE,
        borderRadius: appStyle.PLAY_BUTTON_SIZE,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    mainButtonContainer: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mainButton: {
        width: appStyle.MAIN_BUTTON_SIZE,
        height: appStyle.MAIN_BUTTON_SIZE,
        borderRadius: appStyle.MAIN_BUTTON_RADIUS,
        backgroundColor: colors.BLACK,
        alignItems: 'center',
        justifyContent: 'center'
    },
    mainButtonText: {
        color: colors.WHITE
    },
    yellow: {
        borderBottomRightRadius: appStyle.PLAY_BUTTON_SIZE, backgroundColor: colors.YELLOW
    },
    red: {
        borderTopLeftRadius: appStyle.PLAY_BUTTON_SIZE, backgroundColor: colors.RED
    },
    blue: {
        borderTopRightRadius: appStyle.PLAY_BUTTON_SIZE, backgroundColor: colors.BLUE
    },
    green: {
        borderBottomLeftRadius: appStyle.PLAY_BUTTON_SIZE, backgroundColor: colors.GREEN
    },
  })



export default GameScreen