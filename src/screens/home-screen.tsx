import React, {useEffect, useState} from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/root-navigator'
import GeneralButton from '../components/general-button'
import { Text, View, TextInput, StyleSheet } from 'react-native'
import { colors, appStyle } from '../constants';

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
           <GeneralButton 
           onPress={()=>{
             if(value !== ''){
             navigation.navigate('Game', {userName: value})
             }
            }}
           title={'Start Game'}>
           </GeneralButton>
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
    fontSize: appStyle.LARGE_FONT,
    margin: appStyle.LARGE_MARGIN,
    color: colors.ACCENT
  },
  textInput: {
    width: appStyle.INPUT_WIDTH, 
    borderColor: colors.GRAY, 
    borderRadius: appStyle.TEXT_INPUT_RADIUS,
    borderWidth: appStyle.BORDER_WIDTH, 
    height: appStyle.TEXT_INPUT_HEIGHT,
    margin: appStyle.LARGE_MARGIN,
    paddingHorizontal: appStyle.LARGE_PADDING
  },
})

export default HomeScreen;