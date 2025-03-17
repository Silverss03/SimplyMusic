import { Colors } from "@/constants/Colors";
import { fontSize } from "@/constants/Tokens";
import { StyleSheet, Platform, StatusBar  } from "react-native";  

export const defaultStyles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : Colors.background,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    text : {
        fontSize : fontSize.base,
        color : Colors.text
    }
})

export const utilsStyles = StyleSheet.create({
    itemSeparator : {
        borderColor : Colors.textMuted,
        borderWidth : StyleSheet.hairlineWidth,
        opacity : 0.3 
    }
})

