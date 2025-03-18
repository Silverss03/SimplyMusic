import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { FontAwesome, MaterialCommunityIcons, Ionicons, FontAwesome6 } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { fontSize } from '@/constants/Tokens';
import { BlurView } from 'expo-blur';
import FloatingPlayer from '@/components/FloatingPlayer'

export default function TabLayout() {

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors.primary,
          headerShown: false,
          tabBarBackground: Platform.select({
            ios: () => (
              <BlurView
                intensity={95}
                style={{
                  ...StyleSheet.absoluteFillObject,
                  overflow: 'hidden',
                }}
              />
            )
          }),
          tabBarStyle: Platform.select({
            ios: {
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            },
            default: {
              position: 'absolute',
              borderTopWidth: 0,
            },
          }),
          tabBarLabelStyle : {
            fontSize : fontSize.xs,
            fontWeight: '500',
          }
        }}>
        <Tabs.Screen
          name='favorites'
          options={{
            title: 'Favorites',
            tabBarIcon : ({color}) => <FontAwesome name='heart' size={20} color={color}/>
          }}/>
        <Tabs.Screen
          name='playlists'
          options={{
            title: 'Playlists',
            tabBarIcon : ({color}) => <MaterialCommunityIcons name='playlist-play' size={28} color={color}/>
          }}/>
        <Tabs.Screen
          name='(songs)'
          options={{
            tabBarIcon : ({color}) => (
              <Ionicons 
                name='musical-note-sharp' 
                size={24} 
                color={color}/>
            ),
            title : "Songs"
          }}/>
        <Tabs.Screen
          name='artists'
          options={{
            title: 'Aritsts',
            tabBarIcon : ({color}) => <FontAwesome6 name='users-line' size={20} color={color}/>
          }}/>
      </Tabs>

      <FloatingPlayer 
        style = {{
          position : 'absolute', 
          left : 8, 
          right :8, 
          bottom : 60}}
        />
    </>
  );
}
