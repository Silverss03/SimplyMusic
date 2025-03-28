import { defaultStyles } from "@/styles"
import { TouchableOpacity, View, StyleSheet, Text, ViewProps } from "react-native"
import FastImage from "react-native-fast-image"
import { Track, useActiveTrack } from "react-native-track-player"
import {PlayPauseButton, SkipToNextButton, SkipToPreviousButton} from "./PlayerControl"
import useLastActiveTrack from "@/hooks/useLastActiveTrack"
import MovingText from "./MovingText"

const FloatingPlayer = ({style} : ViewProps) =>{
    const activeTrack = useActiveTrack()
    const lastActiveTrack = useLastActiveTrack()
    
    const displayedTrack = activeTrack ?? lastActiveTrack
    
    if(!displayedTrack) return null


    return (
        <TouchableOpacity activeOpacity={0.9} style = {[styles.container, style]}>
            <>
                <FastImage
                    source={{
                        uri: displayedTrack.artwork
                    }}
                    style={styles.trackArtworkImage}
                />

                <View style = {styles.trackTitleContainer}>
                    <MovingText 
                        style={styles.trackTitle} 
                        text={displayedTrack.title ?? ''} 
                        animationThreshold={25} 
                    />
                </View>

                <View style = {styles.trackControlContainer}>
                    <SkipToPreviousButton iconSize={22}/>
                    <PlayPauseButton iconSize = {24}/>
                    <SkipToNextButton iconSize = {22}/>
                </View>
            </>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container : {
        flexDirection : 'row',
        alignItems : 'center',
        backgroundColor : '#252525',
        padding : 8,
        borderRadius : 12,
        paddingVertical : 10
    },
    trackArtworkImage :{
        width : 40,
        height : 40,
        borderRadius :8,
    },
    trackTitle : {
        ...defaultStyles.text,
        fontSize : 18,
        fontWeight : '600',
        padding : 10,
    },
    trackTitleContainer : {
        flex : 1,
        overflow : 'hidden',
        marginLeft : 10,
    },
    trackControlContainer : {
        flexDirection : 'row',
        alignItems : 'center',
        columnGap : 10,
        marginRight : 16,
        paddingLeft : 16
    }
})

export default FloatingPlayer