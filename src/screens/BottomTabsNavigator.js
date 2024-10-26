import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import MapScreen from './MapScreen';
import ChatbotScreen from './Chatbot'; // Assuming your Chatbot component is in Chatbot.js
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const BottomTabsNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Main':
              iconName = 'home-outline'; // Icon for Home
              break;
            case 'Map':
              iconName = 'map-outline'; // Icon for Map
              break;
            case 'Chatbot':
              iconName = 'chatbubble-outline'; // Icon for Chatbot
              break;
            default:
              iconName = 'help-outline'; // Default icon
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#3b82f6', // Active icon color
        tabBarInactiveTintColor: '#6b7280', // Inactive icon color
      })}
    >
      <Tab.Screen name="Main" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Map" component={MapScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Chatbot" component={ChatbotScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
};

export default BottomTabsNavigator;
