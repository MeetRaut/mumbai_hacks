import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import CustomButton from '../components/CustomButton';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import Constants from 'expo-constants';

const apiUrl = Constants.expoConfig.extra.apiBaseUrl;
// console.log(apiUrl)

export default function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleSignup = async () => {
    console.log(username, email, password)
    Alert.alert(
      'Signup Successful',
      `Welcome, ${username}!`,
      [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Login'),
        },
      ]
    );
    try {
      console.log("Hello1")
      // const response = await axios.post(`${apiUrl}/auth/register`, { username, email, password });
      navigation.navigate('Login'),
      console.log("Hello2")

      // console.log(response.data)

      console.log("Hello3")

      // Alert.alert(
      //   'Signup Successful',
      //   `Welcome, ${response.data.users.username}!`,
      //   [
      //     {
      //       text: 'OK',
      //       onPress: () => navigation.navigate('Login'),
      //     },
      //   ]
      // );
    } catch (error) {
      console.log("You are in hell")
      console.log(error)
      Alert.alert('Signup Failed', error || 'Something went wrong!');
    }
  };

  return (
    <View style={styles.container}>
      <LottieView
    source={require('../assets/animation1.json')}
    autoPlay
    loop
    style={styles.animation}
    />

      <Text style={styles.title}>Signup Screen</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <CustomButton title="Signup" onPress={handleSignup} />
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
  animation: {
    width: '100%', // Change this to 100%
    height: 200, // Adjust height if necessary
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
  }
});
