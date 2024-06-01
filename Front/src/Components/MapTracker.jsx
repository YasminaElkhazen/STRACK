import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS
import { Box, Input, Button, Text, Flex } from '@chakra-ui/react';
import customMarkerImg from '../Images/iss.png';

const MapTracker = ({ noradId }) => {
  const [fetchInterval, setFetchInterval] = useState(10); // Default fetch interval of 10 seconds
  const [xData, setXData] = useState([]);
  const [yData, setYData] = useState([]);
  const [map, setMap] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const polylineRef = useRef(null);
  const customMarkerIcon = L.icon({
    iconUrl: customMarkerImg,
    iconSize: [38, 38], // Adjust size as needed
    iconAnchor: [19, 38], // Position icon's center point
    popupAnchor: [0, -38] // Position popup relative to icon
  });

  useEffect(() => {
    // Initialize Leaflet map
    const initMap = () => {
      const initialMap = L.map('map').setView([0, 0], 2); // Set initial view and zoom level
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(initialMap);
      setMap(initialMap);
    };

    initMap();
  }, []);

  useEffect(() => {
    if (!noradId || !map) return;

    const fetchData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:1000/satellite_positions?id=${noradId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const { latitude, longitude } = data;

        // Update data arrays
        setXData(prevXData => [...prevXData, longitude]);
        setYData(prevYData => [...prevYData, latitude]);

        // Update map center
        map.setView([latitude, longitude], 4);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const intervalId = setInterval(() => {
      if (isFetching) {
        fetchData();
      }
    }, fetchInterval * 1000);

    return () => clearInterval(intervalId);
  }, [noradId, fetchInterval, map, isFetching]);

  useEffect(() => {
    if (!map || xData.length === 0 || yData.length === 0) return;

    // Clear existing markers
    map.eachLayer(layer => {
      if (layer instanceof L.Marker) {
        layer.remove();
      }
    });

    // Add marker for the most recent data point
    const lastIndex = xData.length - 1;
    L.marker([yData[lastIndex], xData[lastIndex]], { icon: customMarkerIcon }).addTo(map);

    // Draw polyline
    if (polylineRef.current) {
      polylineRef.current.removeFrom(map);
    }

    const latLngs = yData.map((lat, index) => [lat, xData[index]]);
    const polyline = L.polyline(latLngs, { color: 'red' }).addTo(map);
    polylineRef.current = polyline;
  }, [xData, yData, map]);

  const handleIntervalChange = (event) => {
    const interval = parseInt(event.target.value, 10);
    if (!isNaN(interval)) {
      setFetchInterval(interval);
    }
  };

  const handleStartTracking = () => {
    setIsFetching(true);
  };

  const handleStopTracking = () => {
    setIsFetching(false);
  };

  return (
    <Box>
      <Box id="map" width="1000px" height="600px" margin="auto"></Box>
      <Flex justifyContent="center">
        <Box width='250px' textAlign="center" mt={7}>
          <Text mb={2}>Enter tracking interval (seconds)</Text>
          <Input
            type="number"
            value={fetchInterval}
            onChange={handleIntervalChange}
          />
        </Box>
        <Box mt={4}>
          <Flex direction='column'>
            <Button colorScheme="teal" size="sm" ml={10} onClick={handleStartTracking} mt={4}>
              Start Tracking
            </Button>
            <Button colorScheme="red" size="sm" mt={4} ml={10} onClick={handleStopTracking}>
              Stop Tracking
            </Button>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default MapTracker;
