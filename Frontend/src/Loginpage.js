import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import styles from '../style/Loginpagecss';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [phone, setPhone] = useState('');
  const navigation = useNavigation();
  const [focusedField, setFocusedField] = useState('');

  useEffect(() => {
    const checkLoginStatus = async () => {
      const loggedIn = await AsyncStorage.getItem('isLoggedIn');
      const storedEmail = await AsyncStorage.getItem('email');
      if (loggedIn === 'true' && storedEmail) {
        navigation.replace('Home'); 
      }
    };
    checkLoginStatus();
  }, []);

  const handleSendOtp = async () => {
    if (!name || !email || !phone) {
      Alert.alert('Please fill all fields before sending OTP.');
      return;
    }

    try {
      const response = await fetch('http://10.0.2.2:5000/api/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullname: name, email, phone }), 
      });

      const data = await response.json();
      if (response.ok) {
        setOtpSent(true);
        Alert.alert('OTP sent successfully to your email.');
      } else {
        Alert.alert(data.message || 'Failed to send OTP.');
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
      const response = await fetch('http://10.0.2.2:5000/api/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }), 
      });

      const data = await response.json();
      if (response.ok) {
        navigation.navigate('Home');
      } else {
        Alert.alert(data.message || 'OTP verification failed.');
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
          value={name}
          onChangeText={setName}
          onFocus={() => setFocusedField('name')}
          onBlur={() => setFocusedField('')}
        />

        <View style={styles.emailRow}>
          <TextInput
            style={[
              styles.input,
              focusedField === 'email' && styles.inputFocused,
              { flex: 1, marginRight: 8 },
            ]}
            placeholder="Email ID"
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
