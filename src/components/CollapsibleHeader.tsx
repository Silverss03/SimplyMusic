import React, { useState, useEffect } from 'react';
import { Animated, StyleSheet, TextInput, View, TouchableOpacity, Text, Keyboard } from 'react-native';
import { BlurView } from 'expo-blur';
import { Colors } from "@/constants/Colors";
import { Ionicons } from '@expo/vector-icons';

const HEADER_MAX_HEIGHT = 120;
const HEADER_MIN_HEIGHT = 90;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const CollapsibleHeader = ({ scrollY, title, searchProps } : any) => {
  const [isFocused, setIsFocused] = useState(false);
  const [localSearchValue, setLocalSearchValue] = useState(searchProps?.value || '');
  
  // Update local state when prop changes
  useEffect(() => {
    setLocalSearchValue(searchProps?.value || '');
  }, [searchProps?.value]);

  // Handle text changes
  const handleTextChange = (text: string) => {
    setLocalSearchValue(text);
    if (searchProps?.onChangeText) {
      searchProps.onChangeText(text);
    }
  };

  // Handle clear button press
  const handleClear = () => {
    handleTextChange('');
    // Keep focus on the input after clearing
  };

  // Handle cancel button press
  const handleCancel = () => {
    handleTextChange('');
    Keyboard.dismiss();
    setIsFocused(false);
  };

  // All your existing animations
  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: 'clamp',
  });

  const titleSize = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [34, 20],
    extrapolate: 'clamp',
  });

  const titleY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [20, 15],
    extrapolate: 'clamp',
  });
  
  const titleMarginTop = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 10],
    extrapolate: 'clamp',
  });

  const searchOpacity = 1;
  
  const searchScale = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 0.9],
    extrapolate: 'clamp',
  });
  
  const searchY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -5],
    extrapolate: 'clamp',
  });

  const blurOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View style={[styles.header, { height: headerHeight }]}>
      <Animated.View style={[styles.blurContainer, { opacity: blurOpacity }]}>
        <BlurView intensity={80} style={StyleSheet.absoluteFill} />
      </Animated.View>
      
      <Animated.Text 
        style={[
          styles.title, 
          { 
            fontSize: titleSize, 
            marginTop: titleMarginTop,
            transform: [{ translateY: titleY }]
          }
        ]}>
        {title}
      </Animated.Text>
      
      {/* Search row with input and cancel button */}
      <Animated.View 
        style={[
          styles.searchRow,
          { 
            opacity: searchOpacity,
            transform: [
              { translateY: searchY },
              { scale: searchScale }
            ] 
          }
        ]}>
        {/* Search input with clear button */}
        <View style={[
          styles.searchInputWrapper,
          isFocused ? styles.searchInputWrapperFocused : null
        ]}>
          <Ionicons name="search" size={16} color={Colors.textMuted} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder={searchProps?.placeholder || "Search"}
            placeholderTextColor={Colors.textMuted}
            value={localSearchValue}
            onChangeText={handleTextChange}
            onFocus={() => setIsFocused(true)}
            returnKeyType="search"
          />
          
          {/* Clear button - only show when there's text */}
          {localSearchValue.length > 0 && (
            <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
              <Ionicons name="close-circle" size={16} color={Colors.textMuted} />
            </TouchableOpacity>
          )}
        </View>
        
        {/* Cancel button - only show when input is focused */}
        {isFocused && (
          <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        )}
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.background,
    zIndex: 10,
    justifyContent: 'flex-end',
    paddingBottom: 12,
    paddingHorizontal: 16,
  },
  title: {
    color: Colors.text,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlignVertical: 'center',
  },
  blurContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 6,
  },
  searchInputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2C2C2E',
    borderRadius: 8,
    paddingHorizontal: 8,
    height: 32,
  },
  searchInputWrapperFocused: {
    flex: 0.85, // Make room for cancel button
  },
  searchIcon: {
    marginRight: 6,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    color: Colors.text,
    fontSize: 14,
  },
  clearButton: {
    padding: 4,
  },
  cancelButton: {
    marginLeft: 8,
    paddingHorizontal: 4,
  },
  cancelText: {
    color: Colors.primary,
    fontSize: 14,
  }
});

export default CollapsibleHeader;