import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../ThemeContext';

const options = [
  { label: 'System Default', value: 'system' },
  { label: 'Light Theme', value: 'light' },
  { label: 'Dark Theme', value: 'dark' },
];

export default function Setting({ navigation }) {
  const { mode, setMode, colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={8}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Settings</Text>
      </View>

      <Text style={[styles.sectionTitle, { color: colors.text }]}>Theme</Text>

      {options.map(({ label, value }) => (
        <TouchableOpacity
          key={value}
          style={styles.radioButton}
          activeOpacity={0.7}
          onPress={() => setMode(value)}
        >
          <View style={[styles.radioCircle, { borderColor: colors.text }]}>
            {mode === value && <View style={[styles.radioDot, { backgroundColor: colors.text }]} />}
          </View>
          <Text style={[styles.radioLabel, { color: colors.text }]}>{label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18
  },
  radioCircle: {
    height: 22,
    width: 22,
    borderRadius: 11,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12
  },
  radioDot: {
    height: 10,
    width: 10,
    borderRadius: 5
  },
  radioLabel: {
    fontSize: 16
  },
});
