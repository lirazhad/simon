import React from 'react';
import { appStyle } from '../constants'
import { StyleSheet, Animated, TouchableOpacity, View } from 'react-native'

type Props = {
    style: any
    animation: any
    disabled: boolean
    onPressButton: () => void
  };

const PlayButton: React.FC<Props> =  ({style, animation, onPressButton, disabled})=> {
    return (
        <Animated.View style={{ 
            width: appStyle.PLAY_BUTTON_SIZE, 
            height: appStyle.PLAY_BUTTON_SIZE, 
            transform: [{scale: animation}] }}>
            <TouchableOpacity 
            onPress={onPressButton}
            disabled={disabled}>
                <View style={[styles.container, style]}/>            
            </TouchableOpacity>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%'
    }
  })

export default PlayButton;