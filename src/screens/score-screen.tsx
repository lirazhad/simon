import React, {useEffect} from 'react';
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../navigation/root-navigator'
import { useSelector, useDispatch } from 'react-redux'
import { RouteProp, StackActions } from '@react-navigation/native'
import { addToList, clearList } from '../store'
import { FlatList, View, StyleSheet, Text } from 'react-native'
import { getScoreListFromStorage, storeData } from '../utils/store-local-data'
import ScoreListItem from '../components/score-list-item'
import GeneralButton from '../components/general-button'
import { colors, appStyle } from '../constants';

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
        dispatch(clearList())
        let restoredArray = JSON.parse(listFromStorage)
        restoredArray.push(currentScore)

        restoredArray.sort( 
          function( a: any, b: any ) { 
            return b.score - a.score 
          });

          if(restoredArray.length === 11){
            //remove last 
            restoredArray.splice(-1,1)
          }

          restoredArray.forEach((element: any) => {
            dispatch(addToList(element))
          });
          storeData(JSON.stringify(restoredArray))

      }else{
        //empty list
        dispatch(addToList(currentScore))
        let listToStore = [currentScore]
        storeData(JSON.stringify(listToStore))
      }
    })
  }, [])

 

    return (
        <View style={styles.mainView}> 
          <View style={styles.header}> 
            <GeneralButton 
              onPress={()=>navigation.dispatch(
                StackActions.replace('Game', {userName: userName})
              )}
              title={'SART NEW GAME'}/>
              <Text style={styles.score}>{'Your Score is: ' + score}</Text>
          </View>
          <View style={styles.body}>
            <FlatList 
              data={scoreList}
              renderItem = {({ item, index }: { item: any, index: number }) => (
              <ScoreListItem userName={item.userName} score={item.score} index={index+1}/>
              )}
              keyExtractor={(item, index) => index.toString()}
              />
          </View>
           
        </View>
    );
};


const styles = StyleSheet.create({
  mainView: {
    width: '100%', 
    height: '100%', 
    paddingTop: appStyle.LARGE_PADDING,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  header: {
    margin: appStyle.LARGE_MARGIN,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  score: {
    margin: appStyle.STANDART_MARGIN,
    fontSize: appStyle.LARGE_FONT,
    color: colors.ACCENT
  },
  body: {
    width: '100%',
    marginVertical: appStyle.LARGE_MARGIN
  }
})

export default ScoreScreen