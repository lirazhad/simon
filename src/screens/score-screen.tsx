import React, {useEffect} from 'react';
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../navigation/root-navigator'
import { useSelector, useDispatch } from 'react-redux'
import { RouteProp } from '@react-navigation/native'
import { addToList } from '../store'
import { SectionList, FlatList, Text, View, Platform, Button } from 'react-native'
import { getScoreListFromStorage, storeData } from '../utils/store-local-data'

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Score'>;

type Props = {
    navigation: ProfileScreenNavigationProp;
    route: RouteProp<RootStackParamList, 'Score'>
  };

const ScoreScreen: React.FC<Props> =  ({navigation, route})=> {


  const score = route.params.userScore
  const userName = route.params.userName

  const scoreList = useSelector(state => state)
  const dispatch = useDispatch()

  useEffect(() => {

  getScoreListFromStorage().then((listFromStorage: string) => {
    const currentScore = `{"${userName}":"${score}"}`
      if(listFromStorage !== undefined){
        
        let restoredArray = JSON.parse(listFromStorage)

          if(restoredArray.length === 6){
              restoredArray.forEach((element, i) => {
                dispatch(addToList(element))
                const scoreObj = JSON.parse(element)
                const scoreValue = scoreObj[Object.keys(scoreObj)[0]]
                  if(scoreValue <= score){
                    // remove value and insert new score
                    restoredArray.splice(i, 1, currentScore)
                    storeData(JSON.stringify(restoredArray)) 
                  }
              })
           }else{
            restoredArray.push(currentScore)
            restoredArray.forEach(element => {
              dispatch(addToList(element))
            });
            storeData(JSON.stringify(restoredArray))
            }
      }else{
        //empty list
        dispatch(addToList(currentScore))
        let listToStore = [currentScore]
        storeData(JSON.stringify(listToStore))
      }
    })

   
   // const stringifiedArray = JSON.stringify(somearray)
  }, [])

 

    return (
        <View>
          <Button 
           onPress={()=>navigation.navigate('Game', {userName: 'jjjj'})}
           title={'Start Game'}/>
           <FlatList 
           data={scoreList}
           renderItem = {({ item }: { item: any }) => (
            <View>
                <Text>{item}</Text>
              </View>
          )}/>
        </View>
    );
};

export default ScoreScreen