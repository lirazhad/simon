import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { colors, appStyle } from '../constants'

type Props = {
    userName: string
    score: number
    index: number
  }

const ScoreListItem: React.FC<Props> =  ({userName, score, index})=> {
    return (
        <View style={styles.container}>
            <View style={styles.names}> 
                <Text style={styles.text}>{index+ '. '}</Text>
                <Text style={styles.text}>{userName}</Text>
            </View>
            <Text style={styles.text}>{score}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: appStyle.SCORE_ITEM_HEIGHT,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: appStyle.BORDER_WIDTH,
        borderBottomColor: colors.MAIN,
        padding: appStyle.STANDART_PADDING
    },
    names: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: appStyle.SMALL_FONT,
        color: colors.MAIN,
        margin: appStyle.STANDART_MARGIN
    }
  })

export default ScoreListItem