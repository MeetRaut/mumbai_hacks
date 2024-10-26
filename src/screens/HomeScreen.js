import React, { useState } from 'react';
import { View, Text, ScrollView, Button, StyleSheet, Modal, TouchableOpacity, Linking } from 'react-native';

const emergencyContacts = [
  { name: 'Police', number: '93560 91015' },
  { name: 'Ambulance', number: '93216 40061' },
  { name: 'Fire Department', number: '70457 21460' },
  // Add more emergency contacts as needed
];

const HomeScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleCall = (number) => {
    // Check if the device supports the tel URL scheme
    Linking.canOpenURL(`tel:${number}`)
      .then((supported) => {
        if (supported) {
          Linking.openURL(`tel:${number}`);
        } else {
          console.error("Phone call not supported");
        }
      })
      .catch((err) => console.error("An error occurred", err));
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Public Safety Hub</Text>

      {/* Hero Section */}
      <View style={styles.heroSection}>
        <Text style={styles.heroText}>Stay Informed, Stay Safe</Text>
        <Text style={styles.heroDescription}>
          Your go-to resource for community safety tips, news, and policies.
        </Text>
      </View>

      {/* News Section */}
      <Text style={styles.sectionTitle}>Latest News</Text>
      {/* News Items */}
      <View style={styles.newsItem}>
        <Text style={styles.newsTitle}>🔥 Fire Safety Tips for Homes</Text>
        <Text style={styles.newsSnippet}>
          Learn how to protect your home from fire hazards...
        </Text>
        <Button title="Read More" onPress={() => {/* Navigate to news detail */}} />
      </View>
      <View style={styles.newsItem}>
        <Text style={styles.newsTitle}>🌪️ Prepare for Natural Disasters</Text>
        <Text style={styles.newsSnippet}>
          Get ready for storms, earthquakes, and floods...
        </Text>
        <Button title="Read More" onPress={() => {/* Navigate to news detail */}} />
      </View>
      <View style={styles.newsItem}>
        <Text style={styles.newsTitle}>👮 Community Crime Watch Initiatives</Text>
        <Text style={styles.newsSnippet}>
          Join your neighbors in keeping the community safe...
        </Text>
        <Button title="Read More" onPress={() => {/* Navigate to news detail */}} />
      </View>

      {/* Policies Section */}
      <Text style={styles.sectionTitle}>New Public Safety Policies</Text>
      <View style={styles.policyItem}>
        <Text style={styles.policyTitle}>🚦 New Road Safety Regulations</Text>
        <Text style={styles.policyDescription}>
          New measures to enhance road safety for pedestrians and drivers...
        </Text>
        <Button title="Learn More" onPress={() => {/* Navigate to policy detail */}} />
      </View>
      <View style={styles.policyItem}>
        <Text style={styles.policyTitle}>🔥 Updated Fire Safety Codes</Text>
        <Text style={styles.policyDescription}>
          Recent updates to fire safety codes for commercial buildings...
        </Text>
        <Button title="Learn More" onPress={() => {/* Navigate to policy detail */}} />
      </View>

      {/* Announcements Section */}
      <Text style={styles.sectionTitle}>Announcements</Text>
      <View style={styles.announcementItem}>
        <Text style={styles.announcementTitle}>📅 Community Safety Meeting</Text>
        <Text>Date: October 30, 2024</Text>
        <Text>Join us for a discussion on local safety measures...</Text>
        <Button title="Details" onPress={() => {/* Navigate to announcement detail */}} />
      </View>
      <View style={styles.announcementItem}>
        <Text style={styles.announcementTitle}>📣 Public Safety Awareness Week</Text>
        <Text>Date: November 10-16, 2024</Text>
        <Text>Participate in various activities focused on public safety...</Text>
        <Button title="Details" onPress={() => {/* Navigate to announcement detail */}} />
      </View>

      {/* Safety Tips/Resources Section */}
      <Text style={styles.sectionTitle}>Safety Tips & Resources</Text>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <View style={styles.tipItem}>
          <Text>📞 Emergency Contact List</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.tipItem}>
        <Text>🚑 First Aid Basics</Text>
      </View>
      <View style={styles.tipItem}>
        <Text>🚨 How to Report a Crime</Text>
      </View>

      {/* Footer */}
      <Text style={styles.footerText}>For emergencies, call 911</Text>

      {/* Modal for Emergency Contacts */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Emergency Contacts</Text>
            {emergencyContacts.map((contact, index) => (
              <TouchableOpacity key={index} onPress={() => handleCall(contact.number)}>
                <Text style={styles.contactItem}>{contact.name} - {contact.number}</Text>
              </TouchableOpacity>
            ))}
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
    marginTop: 25,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  heroSection: {
    backgroundColor: '#0056b3',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  heroText: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: '600',
    color: '#fff',
  },
  heroDescription: {
    textAlign: 'center',
    color: '#f1f1f1',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#333',
  },
  newsItem: {
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#fff',
    elevation: 2, // Add shadow effect
  },
  newsTitle: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  newsSnippet: {
    marginBottom: 10,
    color: '#666',
  },
  policyItem: {
    marginVertical: 10,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#e8f5e9',
    elevation: 2,
  },
  policyTitle: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  policyDescription: {
    color: '#666',
  },
  announcementItem: {
    marginVertical: 10,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#fff3e0',
    elevation: 2,
  },
  announcementTitle: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  tipItem: {
    marginVertical: 10,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#f1f8e9',
    elevation: 2,
  },
  footerText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#777',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  contactItem: {
    fontSize: 18,
    marginVertical: 10,
    color: '#0056b3',
  },
});

export default HomeScreen;
