import { defaultStyles } from "@/styles"
import { Stack } from "expo-router"
import { View } from "react-native"

const ArtistScreenLayout = () =>{
    return(
        <View style = {defaultStyles.container}>
            <Stack>
                <Stack.Screen 
                    name="index" 
                    options={{
                        headerTitle : 'Artists'
                    }}/>
            </Stack>
        </View>
    )
}

export default ArtistScreenLayout