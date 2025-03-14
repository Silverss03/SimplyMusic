import { defaultStyles } from '@/styles'
import {View, Text} from 'react-native'

const PlaylistsScreen = () => {
    return(
        <View style = {defaultStyles.container}>
            <Text style = {defaultStyles.text}> Playlists</Text>
        </View>
    )
}

export default PlaylistsScreen