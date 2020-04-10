import React, {useEffect, useState} from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/root-navigator'

import { Text, View, TextInput, Button, StyleSheet } from 'react-native'

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Game'
>;

type Props = {
    navigation: ProfileScreenNavigationProp;
  };

const HomeScreen: React.FC<Props> =  ({navigation})=> {

  const [value, onChangeText] = useState('');

    return (
        <View style={styles.mainView}>
           <Text style={styles.text}>{'Enter your name: '}</Text>
           <TextInput
              style={styles.textInput}
              onChangeText={text => onChangeText(text)}
              value={value}/>
           <Button 
           onPress={()=>{
             if(value !== ''){
             navigation.navigate('Game', {userName: value})
             }
            }}
           title={'Start Game'}/>
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
  text: {
    fontSize: 18,
    margin: 12
  },
  textInput: {
    width: 300, 
    borderColor: 'gray', 
    borderRadius: 18,
    borderWidth: 1, 
    height: 40,
    margin: 12,
    paddingHorizontal: 18
  },
})

export default HomeScreen;