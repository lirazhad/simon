import React, {useEffect} from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/root-navigator'

import { SectionList, FlatList, Text, View, Platform, Button } from 'react-native'

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Game'
>;

type Props = {
    navigation: ProfileScreenNavigationProp;
  };

const ScoreScreen: React.FC<Props> =  ({navigation})=> {
    return (
        <View>
           <Text>{'score home'}</Text>
           <Button 
           onPress={()=>navigation.navigate('Game', {userName: 'jjjj'})}
           title={'Start Game'}/>
        </View>
    );
};



export default ScoreScreen;