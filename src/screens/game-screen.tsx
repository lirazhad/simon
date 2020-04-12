import React, {useEffect, useState, useMemo} from 'react'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../navigation/root-navigator'
import { RouteProp, StackActions } from '@react-navigation/native'
import PlayButton from '../components/play-button'
import { BUTTON_RADIUS, DELAY_BETWEEN_STEPS } from '../constants'
import { StyleSheet, Animated, Text, View, TouchableOpacity, Alert } from 'react-native'
import getRandomColor from '../utils/get-random-color'
import Sound from 'react-native-sound'
import SoundYellow from '../assets/sounds/yellow.mp3'
import SoundRed from '../assets/sounds/red.mp3'
import SoundBlue from '../assets/sounds/blue.mp3'
import SoundGreen from '../assets/sounds/green.mp3'
import SoundGameOver from '../assets/sounds/error.wav'

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Game'>
type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Game'>;
type Props = {
    navigation: ProfileScreenNavigationProp
    route: ProfileScreenRouteProp
  };

const GameScreen: React.FC<Props> =  ({navigation, route})=> {
    const states = {
        START: 'start',
        PLAYING: 'playing',
        TAP: 'tap',
      };

  
    const [springAnimRed] = useState(new Animated.Value(1))  
    const [springAnimBlue] = useState(new Animated.Value(1))  
    const [springAnimYellow] = useState(new Animated.Value(1))  
    const [springAnimGreen] = useState(new Animated.Value(1))  

    const [score, setScore] = useState(0);
    const [gameState, setGameState] = useState(states.START);
    const [steps, setSteps] = useState([]);
    const [moveIndex, setMoveIndex] = useState(0);

    const [disableUI, setDisableUI] = useState(true);
    const [disableMainButton, setDisableMainButton] = useState(false);
    const [userName, setUserName] = useState('');

    useEffect(()=>{
        setUserName(route.params.userName)
    },[])

    const nextMove = () => {

        setDisableUI(true)
        setDisableMainButton(true)

        const newStep = getRandomColor();
        const updatedSteps = [...steps, newStep];

        setMoveIndex(0);
        setGameState(states.PLAYING);
        setSteps(updatedSteps);

        preformAction(0, updatedSteps)
      };

      const preformAction = (counter: number,  updatedSteps: string[]) => {

        if(counter < updatedSteps.length){
          setTimeout(function(){
            playSound(updatedSteps[counter])
                   let animation
                switch(updatedSteps[counter]){
                    case 'red':
                        animation = springAnimRed
                    break

                    case 'blue':
                        animation = springAnimBlue
                    break

                    case 'green':
                        animation = springAnimGreen
                    break

                    case 'yellow':
                        animation = springAnimYellow
                    break
                }
                spring(animation)
                counter++
                if(counter === updatedSteps.length){
                    setTimeout(() => {
                        setDisableUI(false)
                        setGameState(states.TAP)    
                    }, 1000);         
                }
                preformAction(counter, updatedSteps)
          }, DELAY_BETWEEN_STEPS);
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
                        userScore: score,
                    })
                  )
                }
                ],
                { cancelable: false }
              )}
      }
 
      const spring = (springAnim) => {
        springAnim.setValue(1.3)
        Animated.spring(
           springAnim,
          {
            useNativeDriver: true,
            toValue: 1,
            friction: 3
          }
        ).start()
      }

      const playSound = soundName => {
        const sound = new Sound(soundColor(soundName), error => {
          if (error) {
            console.log('error');
          } else {
            sound.play(() => sound.release());
          }
        });
      };
 

      const soundColor = color => {
        switch (color) {
          case 'yellow':
            return SoundYellow;
          case 'green':
            return SoundGreen;
          case 'blue':
            return SoundBlue;
          case 'red':
            return SoundRed;
          default:
            return SoundGameOver;
        }
      };

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
                    onPressButton={() => onPressButton('red')}/>
                <PlayButton 
                    style={styles.blue} 
                    animation={springAnimBlue}
                    disabled={disableUI}
                    onPressButton={() => onPressButton('blue')}/>
                <PlayButton 
                    style={styles.green} 
                    animation={springAnimGreen}
                    disabled={disableUI}
                    onPressButton={() => onPressButton('green')}/>
                <PlayButton 
                    style={styles.yellow} 
                    animation={springAnimYellow}
                    disabled={disableUI}
                    onPressButton={() => onPressButton('yellow')}/>
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
    );
};


const styles = StyleSheet.create({
    mainView: {
        width: '100%', 
        height: '100%', 
        alignItems: 'center',
        justifyContent: 'center'
    },
    header:{
        width: '100%',
        height: 64,
        position: 'absolute',
        top: 0,
        padding: 12,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: 'red',
        flexDirection: 'row'
    },
    headerText: {
        color: 'white',
        fontSize: 20,
        margin: 12
    },
    boardPlay: {
        width: 300,
        height: 300,
        borderRadius: BUTTON_RADIUS,
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
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center'
    },
    mainButtonText: {
        color: 'white'
    },
    yellow: {
        borderBottomRightRadius: BUTTON_RADIUS, backgroundColor: 'yellow'
    },
    red: {
        borderTopLeftRadius: BUTTON_RADIUS, backgroundColor: 'red'
    },
    blue: {
        borderTopRightRadius: BUTTON_RADIUS, backgroundColor: 'blue'
    },
    green: {
        borderBottomLeftRadius: BUTTON_RADIUS, backgroundColor: 'green'
    },
  })



export default GameScreen;