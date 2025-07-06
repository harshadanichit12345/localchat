import React, { useState, useMemo, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FCMService from '../services/FCMServices';
import { useTheme } from '../ThemeContext';
import { makeLoginStyles } from '../style/Loginpagecss';

const LoginScreen = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const styles = useMemo(() => makeLoginStyles(colors), [colors]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [phone, setPhone] = useState('');
  const [focusedField, setFocusedField] = useState('');

  useEffect(() => {
    const loadUserName = async () => {
      const storedName = await AsyncStorage.getItem('fullName');
      if (storedName) {
        setName(storedName);
      }
    };
    loadUserName();
  }, []);

  const setupFCM = async () => {
    const permissionGranted = await FCMService.requestPermission();
    if (permissionGranted) {
      const token = await FCMService.getToken();
      if (token) {
        await fetch('https://59e4-182-156-140-71.ngrok-free.app/api/save-token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        });
      }
      FCMService.listenForMessages();
    }
  };

  const handleSendOtp = async () => {
    if (!name || !email || !phone) {
      Alert.alert('Please fill all fields before sending OTP.');
      return;
    }

    try {
      const response = await fetch('https://59e4-182-156-140-71.ngrok-free.app/api/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullname: name, email, phone }),
      });

      const contentType = response.headers.get('content-type');
      if (contentType?.includes('application/json')) {
        const data = await response.json();
        if (response.ok) {
          setOtpSent(true);
          Alert.alert('OTP sent successfully to your email.');
        } else {
          Alert.alert(data.message || 'Failed to send OTP.');
        }
      } else {
        const text = await response.text();
        Alert.alert('Unexpected response: ' + text);
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const handleLogin = async () => {
    if (!otpSent) {
      Alert.alert('Please send OTP first.');
      return;
    }

    if (!otp.trim()) {
      Alert.alert('Please enter the OTP.');
      return;
    }

    try {
      const permissionGranted = await FCMService.requestPermission();
      let fcmToken = null;

      if (permissionGranted) {
        fcmToken = await FCMService.getToken();
        FCMService.listenForMessages();
      }

      const response = await fetch('https://59e4-182-156-140-71.ngrok-free.app/api/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp, fcmToken }),
      });

      const contentType = response.headers.get('content-type');
      if (contentType?.includes('application/json')) {
        const data = await response.json();

        if (response.ok) {
          await AsyncStorage.multiSet([
            ['isLoggedIn', 'true'],
            ['email', email],
            ['fullName', name],
            ['loggedInUser', email],
            ['fcmToken', fcmToken || ''],
          ]);
          await setupFCM();
          navigation.navigate('Home');
        } else {
          Alert.alert(data.message || 'OTP verification failed.');
        }
      } else {
        const text = await response.text();
        Alert.alert('Unexpected response: ' + text);
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const handleGoogleLogin = () => {
    Alert.alert('Google Login (to be implemented)');
  };

  return (
    <View style={styles.container}>
      <View style={styles.formBox}>
        <Text style={styles.heading}>Login</Text>

        <TextInput
          style={[styles.input, focusedField === 'name' && styles.inputFocused]}
          placeholder="Name"
          placeholderTextColor={colors.text}
          value={name}
          onChangeText={setName}
          onFocus={() => setFocusedField('name')}
          onBlur={() => setFocusedField('')}
        />

        <View style={styles.emailRow}>
          <TextInput
            style={[
              styles.input,
              { flex: 1, marginRight: 8 },
              focusedField === 'email' && styles.inputFocused,
            ]}
            placeholder="Email ID"
            placeholderTextColor={colors.text}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            onFocus={() => setFocusedField('email')}
            onBlur={() => setFocusedField('')}
          />
          <TouchableOpacity style={styles.smallButton} onPress={handleSendOtp}>
            <Text style={styles.smallButtonText}>Send OTP</Text>
          </TouchableOpacity>
        </View>

        {otpSent && (
          <TextInput
            style={[styles.input, focusedField === 'otp' && styles.inputFocused]}
            placeholder="Enter OTP"
            placeholderTextColor={colors.text}
            value={otp}
            onChangeText={setOtp}
            keyboardType="number-pad"
            onFocus={() => setFocusedField('otp')}
            onBlur={() => setFocusedField('')}
          />
        )}

        <TextInput
          style={[styles.input, focusedField === 'phone' && styles.inputFocused]}
          placeholder="Phone Number"
          placeholderTextColor={colors.text}
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          maxLength={10}
          onFocus={() => setFocusedField('phone')}
          onBlur={() => setFocusedField('')}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <Text style={styles.orText}>or</Text>

        <TouchableOpacity style={styles.googleButton} onPress={handleGoogleLogin}>
          <View style={styles.googleButtonContent}>
            <Image
              source={require('../assests/google.png')}
              style={styles.googleLogo}
            />
            <Text style={styles.googleButtonText}>Login with Google</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
