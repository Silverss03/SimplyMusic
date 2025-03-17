import { TouchableHighlight, View, StyleSheet, Text } from "react-native"
import FastImage from "react-native-fast-image"
import { Colors } from "@/constants/Colors"
import { defaultStyles } from "@/styles"
import { fontSize } from "@/constants/Tokens"

export type TrackListItemProps = {
    track : {
        title ?: string,
        artist ?: string,
        artwork ?: string
    }
}

const TrackListItem = ({track} : TrackListItemProps) => {
    const isActiveTrack = false 

    return(
        <TouchableHighlight>
            <View style = {styles.trackItemContainer}>
                <View>
                    <FastImage 
                        source={{
                            uri : track.artwork,
                            priority : FastImage.priority.normal
                        }}
                        style = {{...styles.trackArtworkImg, opacity : isActiveTrack ? 0.6 : 1}}/>
                </View>

                <View style = {{width : '100%'}}>
                    <Text 
                        numberOfLines={1} 
                        style = {{
                            ...styles.trackTitleText, 
                            color : isActiveTrack ? Colors.primary : Colors.text
                        }}>{track.title}
                    </Text>

                    <Text
                        numberOfLines={1}
                        style={styles.trackArtistText}>{track.artist}</Text>
                </View>
            </View>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    trackArtworkImg : {
        width : 60,
        height : 60,
        borderRadius : 8
    },
    trackTitleText : {
        ...defaultStyles.text,
        fontSize : fontSize.sm,
        fontWeight : '600',
        maxWidth : '90%'
    },
    trackArtistText : {
        ...defaultStyles.text,
        fontSize : 14,
        marginTop : 4,
        color : Colors.textMuted
    },
    trackItemContainer : {
        flexDirection : 'row',
        columnGap : 14,
        alignItems : 'center',
        paddingRight : 20,
    }
})

export default TrackListItem