import React, {useEffect} from 'react';
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../navigation/root-navigator'
import { useSelector, useDispatch } from 'react-redux'
import { RouteProp } from '@react-navigation/native'
import { addToList } from '../store'
import { FlatList, View, StyleSheet } from 'react-native'
import { getScoreListFromStorage, storeData } from '../utils/store-local-data'
import ScoreListItem from '../components/score-list-item'
import GeneralButton from '../components/general-button'

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Score'>;

type Props = {
    navigation: ProfileScreenNavigationProp;
    route: RouteProp<RootStackParamList, 'Score'>
  };

const ScoreScreen: React.FC<Props> =  ({navigation, route})=> {

  const score = route.params.userScore
  const userName = route.params.userName

  const scoreList = useSelector((state: any) => state)
  const dispatch = useDispatch()

  useEffect(() => {

  getScoreListFromStorage().then((listFromStorage: string | undefined) => {
    const currentScore = {userName, score}
      if(listFromStorage !== undefined){
        let restoredArray = JSON.parse(listFromStorage)
        restoredArray.push(currentScore)

        restoredArray.sort( 
          function( a: any, b: any ) { 
            return a.score - b.score 
          });

          if(restoredArray.lenght === 11){
            //remove last 
            restoredArray.splice(-1,1)
          }

          restoredArray.forEach((element: any) => {
            dispatch(addToList(element))
            console.warn(element)
          });
          storeData(JSON.stringify(restoredArray))

      }else{
        //empty list
        console.warn(currentScore)
        dispatch(addToList(currentScore))
        let listToStore = [currentScore]
        storeData(JSON.stringify(listToStore))
      }
    })
  }, [])

 

    return (
        <View>
          <View style={styles.header}> 
            <GeneralButton 
              onPress={()=>navigation.navigate('Game', {userName: userName})}
              title={'SART NEW GAME'}/>
          </View>
          <View style={styles.body}>
            <FlatList 
              data={scoreList}
              renderItem = {({ item }: { item: any }) => (
              <ScoreListItem userName={item.userName} score={item.score}/>
              )}/>
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
  header: {
    margin: 22
  },
  body: {
    margin: 22,
  }
})

export default ScoreScreen