import { FlatList, FlatListProps, View, Text } from "react-native"
import TrackListItem from "./TrackListItem"
import { utilsStyles } from "@/styles"
import TrackPlayer, {Track} from "react-native-track-player"

export type TrackListProps = Partial<FlatListProps<Track>> & {
    tracks : Track[]
}

const ItemDivider = () => {
    return <View style = {{...utilsStyles.itemSeparator, marginVertical : 9, marginLeft : 16}}/>
}


const TrackList = ({tracks, ...flatlistProps} : TrackListProps) => {
    const handleTrackSelect = async(track : Track) => {
        await TrackPlayer.load(track)
        await TrackPlayer.play()
    }

    return(
        <FlatList
            data={tracks}
            contentContainerStyle ={{paddingTop : 8, paddingBottom : 120}}
            ListFooterComponent={ItemDivider}
            ItemSeparatorComponent={ItemDivider}
            ListEmptyComponent={
                <View>
                    <Text style ={utilsStyles.emptyContentText}>No songs found</Text>
                </View>
            }
            renderItem={({item : track}) => <TrackListItem track={{...track}} onTrackSelect={handleTrackSelect}/>}
            {...flatlistProps}
        />
    )
}
export default TrackList