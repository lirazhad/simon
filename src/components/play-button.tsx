import React, {useEffect} from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/root-navigator'
import { RouteProp } from '@react-navigation/native';

import { StyleSheet, Animated, TouchableOpacity, View, Platform, Button } from 'react-native'


type Props = {
    style: any
    animation: any
    disabled: boolean
    onPressButton: () => void
  };

const PlayButton: React.FC<Props> =  ({style, animation, onPressButton, disabled})=> {
    return (
        <Animated.View style={{ width: 150, height: 150, transform: [{scale: animation}] }}>
            <TouchableOpacity 
            onPress={onPressButton}
            disabled={disabled}>
                <View style={[styles.container, style]}/>            
            </TouchableOpacity>
        </Animated.View>
    );
};


const styles = StyleSheet.create({
    animation: {
        width: 150,
        height: 150
    },
    container: {
        width: '100%',
        height: '100%'
    }
  })



export default PlayButton;