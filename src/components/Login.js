import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import CustomButton from '../components/CustomButton';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import Constants from 'expo-constants';
const apiUrl = Constants.expoConfig.extra.apiBaseUrl;

export default function Login({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    Alert.alert(
      'Signup Successful',
      `Welcome, ${username}!`,
      [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Home'),
        },
      ]
    );
    try {
      // const response = await axios.post(`${apiUrl}/auth/login`, { username, password });
      // navigation.navigate('Home')
      // console.log(response.data);

      // Store the JWT token in AsyncStorage
      // await AsyncStorage.setItem('token', response.data.token);

      // Alert.alert(
      //   'Login Successful',
      //   `Welcome, ${response.data.users.username}!`,
      //   [
      //     {
      //       text: 'OK',
      //       onPress: () => navigation.navigate('Home'), // Navigate to the Home screen
      //     },
      //   ]
      // );
      // console.log(`Welcome back, ${response.data.users.username}!`);

    } catch (error) {
      Alert.alert('Login Failed', error.response.data.message || 'Something went wrong!');
      console.log("Error in Login:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Screen</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <CustomButton title="Login" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});
