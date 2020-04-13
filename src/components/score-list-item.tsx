import React from 'react';
import { StyleSheet, Text, View } from 'react-native'


type Props = {
    userName: string
    score: number
  };

const ScoreListItem: React.FC<Props> =  ({userName, score})=> {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{userName + ':'}</Text>
            <Text style={styles.text}>{score}</Text>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 48,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
    },
    text: {
        fontSize: 20,
        color: 'red',
        margin: 8
    }
  })



export default ScoreListItem;