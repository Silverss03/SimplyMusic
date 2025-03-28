import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, SplashScreen } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme'; // Updated import using alias
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useSetupTrackPlayer } from '@/hooks/useSetupTrackPlayer';
import { useCallback } from 'react';
import { useLogTrackPlayerState } from '@/hooks/useLogTrackPlayerState';

SplashScreen.preventAutoHideAsync()

const App = () => {
	
	const handleTrackPlayerLoaded = useCallback(() => {
		SplashScreen.hideAsync()
	}, [])
	
	useSetupTrackPlayer({
		onLoad : handleTrackPlayerLoaded
	})
	
	useLogTrackPlayerState()
	return(
		<SafeAreaProvider>
			<RootNavigation/>
			<StatusBar style='auto'/>
		</SafeAreaProvider>
	)
}

const  RootNavigation = () =>{
	const colorScheme = useColorScheme();
	return (
	<ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
		<Stack>
			<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
		</Stack>
		<StatusBar style="auto" />
	</ThemeProvider>
	);
}

export default App