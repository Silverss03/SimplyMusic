import { defaultStyles } from "@/styles"
import { Stack } from "expo-router"
import { Platform, View, Text, StyleSheet } from "react-native"
import { Colors } from "@/constants/Colors"
import { StackScreenWithSearchBar } from "@/constants/Layout"

const AndroidLargeHeader = () => {
    return(
        <View style = {styles.androidHeader}>
            <Text style = {styles.androidLargeTitle}>Aritsts</Text>
        </View>
    )
}


const ArtistScreenLayout = () =>{
    return(
        <View style = {defaultStyles.container}>
            <Stack>
                <Stack.Screen 
                    name="index" 
                    options={{
                        headerTitle : 'Artists',
                        ...StackScreenWithSearchBar,
                        ...(Platform.OS === 'android' && {header : ()=> <AndroidLargeHeader/>})
                    }}/>
            </Stack>
        </View>
    )
}

const styles = StyleSheet.create({
    androidHeader: {
      paddingHorizontal: 16,
      paddingTop: 56, // Account for status bar
      paddingBottom: 16,
      backgroundColor: Colors.background,
    },
    androidLargeTitle: {
      fontSize: 34,
      fontWeight: 'bold',
      color: Colors.text,
    }
})


export default ArtistScreenLayout