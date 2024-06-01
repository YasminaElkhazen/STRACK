import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Flex, Select, Text } from '@chakra-ui/react';
import MapTracker from '../Components/MapTracker';
import satelliteData from '../Components/SatelliteData'; 

const Tracker = () => {
  const { id } = useParams();
  const [selectedSatellite, setSelectedSatellite] = useState(id || null);
  const [satelliteInfo, setSatelliteInfo] = useState(
    satelliteData.find((satellite) => satellite.Column1 === id) || null
  );

  const handleChange = (event) => {
    const selectedId = event.target.value;
    setSelectedSatellite(selectedId);
    setSatelliteInfo(satelliteData.find((satellite) => satellite.Column1 === selectedId));
  };

  console.log('noradIdTracker:', selectedSatellite);

  return (
    <Flex mt={20}>
      <Box flex={1}>
        <MapTracker noradId={selectedSatellite} />
      </Box>
      <Box flex={1} maxW="560px" mx="auto" mr={20} p={4}>
        <Text fontSize="xl" mb={4}>Choose Satellite ID:</Text>
        <Select placeholder="Select satellite ID" onChange={handleChange} mb={4} value={selectedSatellite}>
          {satelliteData.map((satellite, index) => (
            <option key={index} value={satellite.Column1}>{satellite.Column1}</option>
          ))}
        </Select>
        {selectedSatellite && (
          <Box p={4} mb={4}>
            <Text fontSize="xl" mb={2}>Satellite Information:</Text>
            <Text bg="gray.100" borderRadius={3} p={2} mb={2}>NORAD ID: <Box bg="gray.300" borderRadius={3}>{satelliteInfo.Column1}</Box></Text>
            <Text bg="gray.100" borderRadius={3} p={2} mb={2}>Name:<Box bg="gray.300" borderRadius={3}>{satelliteInfo.Column2}</Box></Text>
            <Text bg="gray.100" borderRadius={3} p={2} mb={2}>Status: <Box bg="gray.300" borderRadius={3}>{satelliteInfo.Column3}</Box></Text>
            <Text bg="gray.100" borderRadius={3} p={2} mb={2}>International Designation: <Box bg="gray.300" borderRadius={3}>{satelliteInfo.Column4}</Box></Text>
            <Text bg="gray.100" borderRadius={3} p={2} mb={2}>Space Catalog Name: <Box bg="gray.300" borderRadius={3}>{satelliteInfo.Column5}</Box></Text>
          </Box>
        )}
      </Box>
    </Flex>
  );
};

export default Tracker;
