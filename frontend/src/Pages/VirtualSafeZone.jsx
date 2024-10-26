import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import crimeData from './crimeData.json';

// Configure leaflet icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

// Icon for predefined crime incidents
const crimeIcon = new L.Icon({
    iconUrl: "https://maps.google.com/mapfiles/kml/paddle/red-blank.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

// Icon for user-added crime incidents (violet color)
const userCrimeIcon = new L.Icon({
    iconUrl: "https://maps.google.com/mapfiles/kml/paddle/purple-blank.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

const cityCoordinates = {
    Mumbai: [19.076, 72.8777],
    Delhi: [28.6139, 77.209],
    Bangalore: [12.9716, 77.5946],
    Chennai: [13.0827, 80.2785],
    Kolkata: [22.5726, 88.3639],
    Hyderabad: [17.385, 78.4867],
    Pune: [18.5204, 73.8567],
    Ahmedabad: [23.0225, 72.5714],
    Surat: [21.1702, 72.8311],
    Jaipur: [26.9124, 75.7873],
    Kanpur: [26.4478, 80.3218],
    Nagpur: [21.1458, 79.1090],
    Lucknow: [26.8468, 80.9462],
    Visakhapatnam: [17.6868, 83.2185],
    Bhopal: [23.2599, 77.4126],
    Patna: [25.5941, 85.1376],
    Vadodara: [22.3098, 73.1880],
    Ghaziabad: [28.6692, 77.4377],
    Ludhiana: [30.9009, 75.7804],
    Agra: [27.1767, 78.0081],
    Nashik: [19.9996, 73.9097],
};

const JumpToMap = ({ selectedCity }) => {
    const map = useMap();

    useEffect(() => {
        const coordinates = cityCoordinates[selectedCity];
        if (coordinates) {
            map.flyTo(coordinates, 13, { animate: true, duration: 1 });
        }
    }, [map, selectedCity]);

    return null;
};

const VirtualSafeZone = () => {
    const [selectedCity, setSelectedCity] = useState("Mumbai");
    const [searchTerm, setSearchTerm] = useState("");
    const [dynamicCrimeData, setDynamicCrimeData] = useState({});
    const [formData, setFormData] = useState({
        city: selectedCity,
        latitude: "",
        longitude: "",
        description: "",
        severity: "",
        inDepth: ""
    });
    const [showForm, setShowForm] = useState(false);
    const [newCrimePosition, setNewCrimePosition] = useState(null); // State to hold the new crime's position

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    // Add new crime data entry
    const handleAddCrime = () => {
        const { city, latitude, longitude, description, severity, inDepth } = formData;

        if (!city || !latitude || !longitude || !description || !severity || !inDepth) {
            alert("Please fill all fields!");
            return;
        }

        const newCrime = {
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
            description,
            severity,
            inDepth,
        };

        setDynamicCrimeData((prevData) => ({
            ...prevData,
            [city]: prevData[city] ? [...prevData[city], newCrime] : [newCrime],
        }));

        setShowForm(false);
        setNewCrimePosition([parseFloat(latitude), parseFloat(longitude)]); // Set new crime position

        // Reset form
        setFormData({
            city: selectedCity,
            latitude: "",
            longitude: "",
            description: "",
            severity: "",
            inDepth: ""
        });
    };

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        const matchingCity = Object.keys(cityCoordinates).find(city =>
            city.toLowerCase().includes(value.toLowerCase())
        );

        if (matchingCity) {
            setSelectedCity(matchingCity);
        }
    };

    const combinedCrimeData = {
        ...crimeData,
        ...dynamicCrimeData,
    };

    const filteredCrimes = Object.entries(combinedCrimeData).flatMap(([city, crimes]) => {
        return crimes.filter(crime =>
            city.toLowerCase().includes(searchTerm.toLowerCase()) ||
            crime.description.toLowerCase().includes(searchTerm.toLowerCase())
        ).map(crime => ({ ...crime, city }));
    });

    return (
        <div style={{ position: "relative" }}>
            <input
                type="text"
                placeholder="Search for crimes in a city..."
                value={searchTerm}
                onChange={handleSearch}
                style={{
                    marginBottom: "10px",
                    padding: "10px",
                    width: "300px",
                    borderRadius: "5px",
                    zIndex: 1000,
                    position: 'absolute',
                    top: '10px',
                    left: '10px',
                }}
            />

            <div style={{ height: "600px", width: "100%", position: "relative" }}>
                <MapContainer
                    center={cityCoordinates[selectedCity]}
                    zoom={12}
                    style={{ height: "100%", width: "100%" }}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <JumpToMap selectedCity={selectedCity} />

                    {filteredCrimes.map((crime, index) => (
                        <Marker
                            key={index}
                            position={[crime.latitude, crime.longitude]}
                            icon={crimeIcon}
                        >
                            <Popup>
                                <div>
                                    <h2>Crime Details</h2>
                                    <p><strong>Description:</strong> {crime.description}</p>
                                    <p><strong>Severity:</strong> {crime.severity}</p>
                                    <p><strong>City:</strong> {crime.city}</p>
                                    <p><strong>In-Depth Description:</strong> {crime.inDepth}</p>
                                </div>
                            </Popup>
                            <Circle
                                center={[crime.latitude, crime.longitude]}
                                radius={1000} // 1 km radius
                                color="red"
                                fillColor="red"
                                fillOpacity={0.2}
                            />
                        </Marker>
                    ))}

                    {/* Marker for user input */}
                    <Marker position={newCrimePosition || cityCoordinates[selectedCity]}>
                        <Popup>
                            <h2>Add New Crime Incident</h2>
                            <div>
                                <input
                                    type="text"
                                    name="latitude"
                                    placeholder="Latitude"
                                    value={formData.latitude}
                                    onChange={handleInputChange}
                                />
                                <input
                                    type="text"
                                    name="longitude"
                                    placeholder="Longitude"
                                    value={formData.longitude}
                                    onChange={handleInputChange}
                                />
                                <input
                                    type="text"
                                    name="description"
                                    placeholder="Description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                />
                                <input
                                    type="text"
                                    name="severity"
                                    placeholder="Severity"
                                    value={formData.severity}
                                    onChange={handleInputChange}
                                />
                                <input
                                    type="text"
                                    name="inDepth"
                                    placeholder="In-Depth Description"
                                    value={formData.inDepth}
                                    onChange={handleInputChange}
                                />
                                <button onClick={handleAddCrime}>Submit</button>
                            </div>
                        </Popup>
                    </Marker>

                    {/* Render user-added crimes with violet markers */}
                    {Object.entries(dynamicCrimeData).flatMap(([city, crimes]) => {
                        return crimes.map((crime, index) => (
                            <Marker
                                key={`user-${index}`}
                                position={[crime.latitude, crime.longitude]}
                                icon={userCrimeIcon}
                            >
                                <Popup>
                                    <div>
                                        <h2>Crime Details</h2>
                                        <p><strong>Description:</strong> {crime.description}</p>
                                        <p><strong>Severity:</strong> {crime.severity}</p>
                                        <p><strong>City:</strong> {city}</p>
                                        <p><strong>In-Depth Description:</strong> {crime.inDepth}</p>
                                    </div>
                                </Popup>
                                <Circle
                                    center={[crime.latitude, crime.longitude]}
                                    radius={1000} // 1 km radius
                                    color="violet"
                                    fillColor="violet"
                                    fillOpacity={0.2}
                                />
                            </Marker>
                        ));
                    })}
                </MapContainer>
            </div>
        </div>
    );
};

export default VirtualSafeZone;
