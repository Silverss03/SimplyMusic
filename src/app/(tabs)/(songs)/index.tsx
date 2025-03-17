import TrackList from '@/components/TrackList'
import { screenPadding } from '@/constants/Tokens'
import { defaultStyles } from '@/styles'
import { View, Animated, Platform } from 'react-native'
import { useMemo, useRef, useState } from 'react'
import CollapsibleHeader from '@/components/CollapsibleHeader'
import library from '@/assets/data/library.json'
import { trackTitleFilter } from '@/helpers/filter'

const HEADER_MAX_HEIGHT = 120;

const SongsScreen = () => {
    const scrollY = useRef(new Animated.Value(0)).current;
    const [searchQuery, setSearchQuery] = useState('');

    const filteredTracks = useMemo(() => {
        if(!searchQuery) return library
        return library.filter(trackTitleFilter(searchQuery))
    }, [searchQuery]); // Changed dependency from search to searchQuery
    
    return (
        <View style={defaultStyles.container}>
            {Platform.OS === 'android' && (
                <CollapsibleHeader 
                    scrollY={scrollY} 
                    title="Songs" 
                    searchProps={{
                        placeholder: 'Find in Songs',
                        value: searchQuery,
                        onChangeText: (text : string) => {
                            setSearchQuery(text);
                        }
                    }}
                />
            )}
            
            <Animated.ScrollView
                contentInsetAdjustmentBehavior='automatic'
                contentContainerStyle={{
                    paddingTop: Platform.OS === 'android' ? HEADER_MAX_HEIGHT - 20 : 0,
                    paddingHorizontal: screenPadding.horizontal
                }}
                scrollEventThrottle={16}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: false }
                )}>
                <TrackList tracks={filteredTracks} scrollEnabled={false}/>
            </Animated.ScrollView>
        </View>
    )
}

export default SongsScreen