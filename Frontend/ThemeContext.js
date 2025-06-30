import React, { createContext, useContext, useState, useEffect } from 'react';
import { Appearance } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DarkTheme, DefaultTheme } from '@react-navigation/native';

const ThemeContext = createContext(null);

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be inside ThemeProvider');
  return ctx;
};

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState('system'); 
  const [scheme, setScheme] = useState(Appearance.getColorScheme());

  useEffect(() => {
    (async () => {
      const storedMode = await AsyncStorage.getItem('themeMode');
      if (storedMode) {
        setMode(storedMode);
        setScheme(storedMode === 'system' ? Appearance.getColorScheme() : storedMode);
      }
    })();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('themeMode', mode);
    setScheme(mode === 'system' ? Appearance.getColorScheme() : mode);
  }, [mode]);

  const colors =
    scheme === 'dark'
      ? { bg: '#2D2D2D', card: '#3C3C3C', text: '#FFFFFF' }
      : { bg: '#FFFFFF', card: '#FFFFFF', text: '#000000' };

  const navTheme = {
    ...(scheme === 'dark' ? DarkTheme : DefaultTheme),
    colors: {
      ...(scheme === 'dark' ? DarkTheme.colors : DefaultTheme.colors),
      background: colors.bg,
      card: colors.card,
      text: colors.text,
    },
    fonts: {
      regular: { fontFamily: 'System', fontWeight: 'normal' },
      medium: { fontFamily: 'System', fontWeight: '500' },
      light: { fontFamily: 'System', fontWeight: '300' },
      thin: { fontFamily: 'System', fontWeight: '100' },
    },
  };

  return (
    <ThemeContext.Provider value={{ mode, setMode, colors, navTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
