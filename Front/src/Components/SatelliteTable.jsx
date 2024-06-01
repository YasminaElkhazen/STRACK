import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Table, 
  Thead, 
  Tbody, 
  Tr, 
  Th, 
  Td, 
  Box, 
  Button,
  Text,
  Flex,
  Input,
  InputGroup,
  InputLeftElement
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import satelliteData from './SatelliteData'; 

const ITEMS_PER_PAGE = 10;

const SatelliteTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); 
  };

  const filteredData = satelliteData.filter(
    (satellite) =>
      satellite.Column1.toLowerCase().includes(searchQuery.toLowerCase()) ||
      satellite.Column2.toLowerCase().includes(searchQuery.toLowerCase()) ||
      satellite.Column5.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = currentPage * ITEMS_PER_PAGE;

  const currentData = filteredData.slice(startIndex, endIndex);

  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleTrackClick = (satelliteId) => {
    navigate(`/tracker/${satelliteId}`);
  };

  return (
    <Box overflowX="auto" p={4}>
      <InputGroup mb={4}>
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.300" />
        </InputLeftElement>
        <Input 
          type="text" 
          placeholder="Search by Norad ID, Name, or Space Catalog Name" 
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </InputGroup>
      <Table variant="striped" colorScheme="blackAlpha">
        <Thead>
          <Tr>
            <Th>Norad ID</Th>
            <Th>Name</Th>
            <Th>Status</Th>
            <Th>International Designation</Th>
            <Th>Space Catalog Name</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {currentData.map((satellite, index) => (
            <Tr key={index}>
              <Td>{satellite.Column1}</Td>
              <Td>{satellite.Column2}</Td>
              <Td>{satellite.Column3}</Td>
              <Td>{satellite.Column4}</Td>
              <Td>{satellite.Column5}</Td>
              <Td>
                <Button 
                  size="sm" 
                  colorScheme="teal" 
                  mr={2}
                  onClick={() => handleTrackClick(satellite.Column1)}
                >
                  Track Satellite
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Flex justifyContent="center" alignItems="center" mt={5} >
        <Button mr={2} onClick={prevPage} disabled={currentPage === 1}>
          Previous
        </Button>
        <Text>
          Page {currentPage} of {totalPages}
        </Text>
        <Button ml={2} onClick={nextPage} disabled={currentPage === totalPages}>
          Next
        </Button>
      </Flex>
    </Box>
  );
};

export default SatelliteTable;
