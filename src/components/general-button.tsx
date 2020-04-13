import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { colors } from '../constants'

type Props = {
    onPress: () => void
    title: string
  };

const GeneralButton: React.FC<Props> =  ({onPress, title})=> {
    return (
        <TouchableOpacity onPress={onPress}>
          <View style={styles.container}>
            <Text style={styles.text}>{title}</Text>
        </View>  
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 22,
        borderColor: colors.main,
        padding: 8
    },
    text: {
        fontSize: 20,
        color: colors.main,
        marginHorizontal: 16
    }
  })



export default GeneralButton;