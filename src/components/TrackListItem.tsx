import { TouchableHighlight, View, StyleSheet, Text } from "react-native"
import FastImage from "react-native-fast-image"
import { Colors } from "@/constants/Colors"
import { defaultStyles } from "@/styles"
import { fontSize } from "@/constants/Tokens"
import { Track, useActiveTrack, useIsPlaying } from "react-native-track-player"
import { Entypo, Ionicons } from "@expo/vector-icons"
import LottieView from 'lottie-react-native';
import equalizerAnimation from '@/assets/data/equalizer.json'; // Download from LottieFiles.com

export type TrackListItemProps = {
    track : Track
    onTrackSelect : (track : Track) => void
}

const TrackListItem = ({track, onTrackSelect : handleTrackSelect} : TrackListItemProps) => {
    const isActiveTrack = useActiveTrack()?.url === track.url
    const {playing} = useIsPlaying()

    return(
        <TouchableHighlight onPress={() => handleTrackSelect(track)}>
            <View style = {styles.trackItemContainer}>
                <View>
                    <FastImage 
                        source={{
                            uri : track.artwork,
                            priority : FastImage.priority.normal
                        }}
                        style = {{...styles.trackArtworkImg, opacity : isActiveTrack ? 0.6 : 1}}/>

                    {isActiveTrack && 
                        (playing ? (
                            <LottieView
                            autoPlay
                            loop
                            source={equalizerAnimation}
                            style={styles.trackPlayingIconIndicator}
                            colorFilters={[{ keypath: "**", color: Colors.icon }]}
                          />
                            ) : (
                            <Ionicons 
                                name = 'play' 
                                size={30} 
                                color={Colors.icon} 
                                style = {styles.trackPausedIconIndicator}/>
                            )
                        )
                    }
                </View>

                <View style = {{
                    flex : 1,
                    flexDirection : 'row',
                    justifyContent : 'space-between',
                    alignItems : 'center'
                }}>
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
                            style={styles.trackArtistText}>{track.artist}
                        </Text>
                    </View>
                    <Entypo name="dots-three-horizontal" size={18} color={Colors.icon}/>
                </View>
            </View>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    trackArtworkImg : {
        width: 60,
        height: 60,
        borderRadius: 8
    },
    trackTitleText : {
        ...defaultStyles.text,
        fontSize: fontSize.sm,
        fontWeight: '600',
        maxWidth: '90%'
    },
    trackArtistText : {
        ...defaultStyles.text,
        fontSize: 14,
        marginTop: 4,
        color: Colors.textMuted
    },
    trackItemContainer : {
        flexDirection: 'row',
        columnGap: 14,
        alignItems: 'center',
        paddingRight: 20,
    },
    trackPlayingIconIndicator : {
        position: 'absolute',
        top: 5,
        left: 5,
        width: 50,
        height: 50
    },
    trackPausedIconIndicator : {
        position: 'absolute',
        top: 15,
        left: 15
    }
})

export default TrackListItem