import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

const Chatbot = () => {
  const [input, setInput] = useState('');
  const [chat, setChat] = useState([]);
  const [showPrompts, setShowPrompts] = useState(true);
  const scrollViewRef = useRef(null);

  const handlePromptClick = (prompt) => {
    setInput(prompt);
  };

  const handleInputChange = (text) => {
    setInput(text);
  };

  const handleSend = () => {
    if (input.trim()) {
      const userMessage = { role: 'user', content: input };
      setChat((prevChat) => [...prevChat, userMessage]);
      setInput('');
      setShowPrompts(false);
      generateBotResponse(input);
    }
  };

  const hardcodedResponses = {
    'Safe places to go at night?': 'You can visit well-lit areas, 24-hour cafes, or trusted friends’ homes.',
    'Safety tips when traveling?': 'Always stay alert, keep your belongings secure, and share your itinerary with someone you trust.',
    'How to share my location?': 'You can use apps like WhatsApp or Google Maps to share your location in real-time.',
    'What to do if feeling unsafe?': 'Try to find a safe place, contact local authorities, or reach out to someone you trust for help.',
  };

  const generateBotResponse = (userInput) => {
    const response = hardcodedResponses[userInput];

    if (response) {
      const botMessage = { role: 'bot', content: response };
      setChat((prevChat) => [...prevChat, botMessage]);
    } else {
      const botMessage = { role: 'bot', content: "I'm not sure how to respond to that." };
      setChat((prevChat) => [...prevChat, botMessage]);
    }
  };

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [chat]);

  const predefinedPrompts = [
    'Safe places to go at night?',
    'Safety tips when traveling?',
    'How to share my location?',
    'What to do if feeling unsafe?',
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AI Assistant</Text>

      {showPrompts && (
        <View style={styles.promptsContainer}>
          {predefinedPrompts.map((prompt, index) => (
            <TouchableOpacity key={index} onPress={() => handlePromptClick(prompt)} style={styles.promptButton}>
              <Text style={styles.promptText}>{prompt}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <ScrollView ref={scrollViewRef} style={styles.chatContainer} contentContainerStyle={styles.chatContent}>
        {chat.map((message, index) => (
          <View key={index} style={message.role === 'user' ? styles.userMessage : styles.botMessage}>
            <Text style={message.role === 'user' ? styles.userText : styles.botText}>{message.content}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={handleInputChange}
          placeholder="Ask to AI Assistant..."
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Your existing styles...
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#F0F4F8', // Light background color
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    color: '#2D3748',
    marginTop: 25,
    marginBottom: 16,
  },
  promptsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between', // Ensure buttons spread out
    marginBottom: 16,
  },
  promptButton: {
    backgroundColor: '#E2E8F0',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    flexBasis: '45%', // Adjusts width to 45% of the container
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  promptText: {
    color: '#2B6CB0',
    fontWeight: '500',
    textAlign: 'center',
  },
  chatContainer: {
    flex: 1,
    borderTopWidth: 1,
    borderTopColor: '#CBD5E0',
    paddingTop: 16,
    marginBottom: 16,
  },
  chatContent: {
    paddingBottom: 16,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#BEE3F8',
    borderRadius: 12,
    padding: 12,
    marginVertical: 4,
    maxWidth: '75%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#B2F5EA',
    borderRadius: 12,
    padding: 12,
    marginVertical: 4,
    maxWidth: '75%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  userText: {
    color: '#2B6CB0',
  },
  botText: {
    color: '#2C7A7B',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderColor: '#CBD5E0',
    borderWidth: 1,
    overflow: 'hidden',
    paddingHorizontal: 8,
  },
  input: {
    flex: 1,
    padding: 12,
    borderColor: '#CBD5E0',
    borderWidth: 1,
    borderRadius: 12,
    marginRight: 8,
    backgroundColor: '#FFF',
  },
  sendButton: {
    backgroundColor: '#007BFF',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});

export default Chatbot;
