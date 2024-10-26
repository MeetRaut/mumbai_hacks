import React, { useEffect, useState } from 'react';
import MapView, { Marker, Heatmap } from 'react-native-maps';
import * as Location from 'expo-location';
import { View, StyleSheet, Alert, Button } from 'react-native';

const crimeData = [
  { latitude: 19.0760, longitude: 72.8777, weight: 3 }, // Central Mumbai
  { latitude: 19.0896, longitude: 72.8656, weight: 2 }, // Suburban area
  { latitude: 19.0417, longitude: 72.8677, weight: 3 }, // Near Dadar
  { latitude: 19.0825, longitude: 72.7411, weight: 2 }, // Goregaon
  { latitude: 19.2183, longitude: 72.9781, weight: 4 }, // Malad area
  { latitude: 18.9676, longitude: 72.8320, weight: 4 }, // South Mumbai (Colaba)
  { latitude: 19.1300, longitude: 72.9087, weight: 3 }, // Andheri
  { latitude: 19.0764, longitude: 72.9981, weight: 1 }, // Eastern Mumbai
  { latitude: 19.2437, longitude: 72.8553, weight: 2 }, // Borivali
  { latitude: 19.0351, longitude: 73.0297, weight: 1 }, // Vashi
  { latitude: 19.1076, longitude: 72.8370, weight: 3 }, // Bandra
  { latitude: 19.2180, longitude: 72.9784, weight: 2 }, // Malad West
  { latitude: 18.9543, longitude: 72.8125, weight: 5 }, // Cuffe Parade
  { latitude: 19.0176, longitude: 72.8562, weight: 3 }, // Lower Parel
  { latitude: 19.1551, longitude: 72.8497, weight: 4 }, // Jogeshwari
  { latitude: 19.0173, longitude: 73.0600, weight: 1 }, // Navi Mumbai
  { latitude: 19.2036, longitude: 72.8623, weight: 2 }, // Kandivali
  { latitude: 19.0507, longitude: 72.8373, weight: 3 }, // Mahim
  { latitude: 19.0019, longitude: 72.8410, weight: 4 }, // Worli
  { latitude: 19.1317, longitude: 72.8275, weight: 2 }, // Juhu
  { latitude: 19.1979, longitude: 72.8291, weight: 3 }, // Kandivali East
  { latitude: 18.9260, longitude: 72.8231, weight: 5 }, // Colaba Causeway
  { latitude: 19.0600, longitude: 72.8367, weight: 4 }, // Matunga
  { latitude: 19.1860, longitude: 72.8395, weight: 2 }, // Borivali East
  { latitude: 18.9894, longitude: 72.8277, weight: 3 }, // Prabhadevi
  { latitude: 19.1142, longitude: 72.8925, weight: 4 }, // Khar
  { latitude: 19.0024, longitude: 72.8614, weight: 2 }, // Haji Ali
  { latitude: 18.9335, longitude: 72.8354, weight: 5 }, // Mumbai Central
  { latitude: 19.1860, longitude: 72.9785, weight: 2 }, // Dahisar
];


const MapScreen = () => {
  const [location, setLocation] = useState(null);
  const [showHeatmap, setShowHeatmap] = useState(false);

  useEffect(() => {
    (async () => {
      // Request permission to access location
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        return;
      }

      // Fetch the current location
      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    })();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={location}
        showsUserLocation={true}
      >
        {location && (
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title="Current Location"
          />
        )}
        {/* Show heatmap if toggled */}
        {showHeatmap && (
          <Heatmap
            points={crimeData}
            radius={50}
            opacity={0.6}
          />
        )}
      </MapView>
      <View style={styles.buttonContainer}>
        <Button
          title={showHeatmap ? "Hide Crime Heatmap" : "Show Crime Heatmap"}
          onPress={() => setShowHeatmap(!showHeatmap)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    width: '90%',
  },
});

export default MapScreen;
