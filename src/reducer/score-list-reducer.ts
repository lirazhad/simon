
 const scoreList = (state = [], action) => {
    switch (action.type) {
      case 'ADD_TO_SCORE_LIST':
        return state.concat([action.score])
      case 'REMOVE_FROM_LIST':

      default:
        return state
    }
  }

  export default scoreList