import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient'; // For gradient background

const { width, height } = Dimensions.get('window');

// Slides data
const slides = [
  {
    key: '1',
    title: 'Welcome!',
    animation: require('../assets/animation1.json'),
    description: 'Empower yourself with safety tips and tools',
    backgroundColor: '#FFD700', // Golden background
  },
  {
    key: '2',
    title: 'Explore',
    animation: require('../assets/animation2.json'),
    description: 'Access emergency contacts and services easily',
    backgroundColor: '#87CEEB', // Sky blue background
  },
  {
    key: '3',
    title: 'Get Started',
    animation: require('../assets/animation3.json'),
    description: 'Receive real-time updates on local safety',
    backgroundColor: '#FF6347', // Tomato background
  },
  {
    key: '4',
    title: '', // No title for final slide
    animation: null, // No animation for the final slide
    description: '',
    backgroundColor: '#6a11cb', // Gradient-like purple
    isLastSlide: true, // To know it's the last slide
  },
];

const Onboarding = () => {
  const navigation = useNavigation();
  const swiperRef = useRef(null); // Ref for controlling Swiper
  const [currentIndex, setCurrentIndex] = useState(0); // Track current slide index

  // Handle slide index change
  const handleIndexChange = (index) => {
    setCurrentIndex(index);
  };

  // Handle skip to last slide
  const handleSkip = () => {
    swiperRef.current.scrollBy(slides.length - 1);
  };

  return (
    <View style={{ flex: 1 }}>
      <Swiper
        ref={swiperRef}
        loop={false}
        showsPagination={true}
        dotColor="#888"
        activeDotColor="#000"
        onIndexChanged={handleIndexChange} // Capture slide index changes
      >
        {slides.map((slide) => (
          <View
            key={slide.key}
            style={[styles.slideContainer, { backgroundColor: slide.backgroundColor }]} // Custom background color
          >
            {slide.animation ? (
              <LottieView
                source={slide.animation}
                autoPlay
                loop
                style={styles.animation}
              />
            ) : null}

            <Text style={styles.title}>{slide.title}</Text>

            {/* Only show description if not the last slide */}
            {!slide.isLastSlide && (
              <Text style={styles.description}>{slide.description}</Text>
            )}

            {/* Show buttons on the last slide */}
            {slide.isLastSlide && (
              <LinearGradient colors={['#6a11cb', '#2575fc']} style={styles.getStartedSlide}>
                <Text style={styles.getStartedText}>Welcome to Our App!</Text>
                <Text style={styles.getStartedSubText}>Let’s get you set up in a few easy steps.</Text>
                
                {/* Container for Login and Signup buttons */}
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Login')}
                    style={styles.getStartedButton}
                  >
                    <Text style={styles.getStartedButtonText}>Login</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => navigation.navigate('Signup')}
                    style={styles.getStartedButton}
                  >
                    <Text style={styles.getStartedButtonText}>Signup</Text>
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            )}
          </View>
        ))}
      </Swiper>

      {/* Skip and Next buttons (hidden on the last slide) */}
      {currentIndex < slides.length - 1 && (
        <View style={styles.navigationButtonsContainer}>
          <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
            <Text style={styles.buttonText}>Skip</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={() => swiperRef.current.scrollBy(1)} // Move to the next slide
            style={styles.nextButton}
          >
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

// Custom Styles
const styles = StyleSheet.create({
  slideContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    height: height,
  },
  animation: {
    width: 300,
    height: 300,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 20,
  },
  description: {
    fontSize: 18,
    color: '#fff',
    marginTop: 10,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  // "Get Started" slide styles
  getStartedSlide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    height: height,
  },
  getStartedText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  getStartedSubText: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 40,
    textAlign: 'center',
    paddingHorizontal: 30,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%', // Adjust the width as needed
  },
  getStartedButton: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,  // For Android shadow
  },
  getStartedButtonText: {
    color: '#6a11cb',
    fontSize: 18,
    fontWeight: 'bold',
  },
  // Skip and Next Buttons
  navigationButtonsContainer: {
    position: 'absolute',
    bottom: 50,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  skipButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  nextButton: {
    backgroundColor: '#6a11cb',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Onboarding;
