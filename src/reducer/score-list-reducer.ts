
 const scoreList = (state: any = [], action: any) => {
    switch (action.type) {
      case 'ADD_TO_SCORE_LIST':
        return state.concat([action.score])
      case 'CLEAR_LIST':
        state = undefined
      
      default:
        return state
    }
  }

  export default scoreList