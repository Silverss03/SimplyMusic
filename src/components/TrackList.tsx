import { FlatList, FlatListProps, View } from "react-native"
import library from "@/assets/data/library.json"
import TrackListItem from "./TrackListItem"
import { utilsStyles } from "@/styles"

export type TrackListProps = Partial<FlatListProps<any>> & {
    tracks : any[]
}

const ItemDivider = () => {
    return <View style = {{...utilsStyles.itemSeparator, marginVertical : 9, marginLeft : 16}}/>
}


const TrackList = ({tracks, ...flatlistProps} : TrackListProps) => {
    return(
        <FlatList
            data={tracks}
            contentContainerStyle ={{paddingTop : 8, paddingBottom : 120}}
            ListFooterComponent={ItemDivider}
            ItemSeparatorComponent={ItemDivider}
            renderItem={({item : track}) => <TrackListItem track={{...track}}/>}
            {...flatlistProps}
        />
    )
}
export default TrackList