// Frontend/context/ThemeContext.js
import React, { createContext, useState, useEffect } from 'react';
import { Appearance } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ThemeContext = createContext();
const THEME_KEY = 'appTheme';

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('system');
  const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme());

  useEffect(() => {
    const loadTheme = async () => {
      const saved = await AsyncStorage.getItem(THEME_KEY);
      if (saved) {
        setTheme(saved);
        applyTheme(saved);
      }
    };

    loadTheme();

    const listener = Appearance.addChangeListener(({ colorScheme }) => {
      if (theme === 'system') {
        setColorScheme(colorScheme);
      }
    });

    return () => listener.remove();
  }, [theme]);

  const applyTheme = (selectedTheme) => {
    if (selectedTheme === 'system') {
      setColorScheme(Appearance.getColorScheme());
    } else {
      setColorScheme(selectedTheme);
    }
  };

  const changeTheme = async (value) => {
    await AsyncStorage.setItem(THEME_KEY, value);
    setTheme(value);
    applyTheme(value);
  };

  const isDark = colorScheme === 'dark';

  return (
    <ThemeContext.Provider value={{ theme, isDark, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
