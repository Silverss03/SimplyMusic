import { defaultStyles } from "@/styles"
import { Stack } from "expo-router"
import { Platform, View } from "react-native"
import { StackScreenWithSearchBar } from "@/constants/Layout"

const SongScreenLayout = () =>{
    return(
        <View style = {defaultStyles.container}>
            <Stack>
                <Stack.Screen 
                    name="index" 
                    options={{
                        headerTitle : 'Songs',
                        ...StackScreenWithSearchBar,
                        ...(Platform.OS === 'android' && {headerShown : false}),
                    }}/>
            </Stack>
        </View>
    )
}

export default SongScreenLayout