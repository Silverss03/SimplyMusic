import { Colors } from "@/constants/Colors"
import { SearchBarProps } from "react-native-screens"
import { useLayoutEffect, useState } from "react"
import { useNavigation } from "expo-router"

const defaultSearchOptions : SearchBarProps = {
    tintColor : Colors.primary,
    hideWhenScrolling : false,

}
const useNavigationSearch = ({searchBarOption} : {searchBarOption ?: SearchBarProps}) => {
    const [search, setSearch] = useState<string>('')
    const navigation = useNavigation()
    const handleOnChangeText : SearchBarProps['onChangeText'] = ({nativeEvent : {text}}) => {
        setSearch(text)
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerSearchBarOptions : {
                ...defaultSearchOptions,
                ...searchBarOption,
                onChangeText : handleOnChangeText
            }
        })
    }, [navigation, searchBarOption])

    return search
}

export default useNavigationSearch
