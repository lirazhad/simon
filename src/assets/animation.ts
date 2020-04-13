import { Animated } from 'react-native'
import { animationProperties } from '../constants'

export const spring = (springAnim: Animated.Value) => {
    springAnim.setValue(animationProperties.SPRING_FACTOR)
    Animated.spring(
       springAnim,
      {
        useNativeDriver: true,
        toValue: animationProperties.ANIMATION_INITIOAL_VALUE,
        friction: animationProperties.FRICTION
      }
    ).start()
  }