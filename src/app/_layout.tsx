import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme'; // Updated import using alias
import { SafeAreaProvider } from 'react-native-safe-area-context';

const App = () => {
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
			<Stack.Screen name="+not-found" />
		</Stack>
		<StatusBar style="auto" />
	</ThemeProvider>
	);
}

export default App