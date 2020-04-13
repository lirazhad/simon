import { createStore } from 'redux'
import scoreList from '../reducer/score-list-reducer'

export const store = createStore(scoreList, [])


export function addToList(score: any) {
    return {
      type: 'ADD_TO_SCORE_LIST',
      score
    }
  }

