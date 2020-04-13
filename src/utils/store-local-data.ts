import AsyncStorage from '@react-native-community/async-storage'
import { SCORE_LIST } from '../constants'

export const storeData = async (score: string) => {
    try {
      await AsyncStorage.setItem(SCORE_LIST, score)
    } catch (e) {
    }
  }

 export const getScoreListFromStorage = async () => {
    try {
      const value = await AsyncStorage.getItem(SCORE_LIST)
      if(value !== null) {
        return value
      }
    } catch(e) {
     
    }
  }