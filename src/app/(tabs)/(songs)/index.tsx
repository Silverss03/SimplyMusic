import { defaultStyles } from '@/styles'
import {View, Text} from 'react-native'

const SongsScreen = () => {
    return(
        <View style = {defaultStyles.container}>
            <Text style = {defaultStyles.text}> Songs</Text>
        </View>
    )
}

export default SongsScreen