import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { loginUser } from '@/utils/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    if (!identifier || !password) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    try {
      const response = await loginUser(identifier, password);

      // Simpan token ke AsyncStorage
      if (response.token) {
        await AsyncStorage.setItem('jwt_token', response.token);
        console.log('Token saved:', response.token);
        Alert.alert('Success', 'Login successful!');
        router.push('/index'); // Arahkan ke halaman utama setelah berhasil login
      } else {
        throw new Error('Token not received from server.');
      }
    } catch (error) {
      console.error('Login error:', error.message || error);
      Alert.alert('Error', error.message || 'Something went wrong during login.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="identifier"
        value={identifier}
        onChangeText={setIdentifier}
        keyboardType="identifier-address"
        autoCapitalize="none" // Menonaktifkan kapitalisasi otomatis
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/register')}>
        <Text style={styles.registerText}>Ga punya akun? Register dulu di sini</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 15, // Add space below the button
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  registerText: {
    fontSize: 14,
    color: '#007bff',
    marginTop: 10,
  },
});

export default LoginScreen;
