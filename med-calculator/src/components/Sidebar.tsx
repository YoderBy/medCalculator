// src/components/Sidebar.tsx

import React from 'react';
import { Box, VStack, Link as ChakraLink } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <Box dir = 'rtl' width="200px" height="100vh" bg="gray.200" color="black" padding={5}>
      <VStack spacing={4} alignItems="start">
        <ChakraLink as={Link} to="/">
          בית
        </ChakraLink>
        <ChakraLink as={Link} to="/about">
          עליי
        </ChakraLink>
        <ChakraLink as={Link} to="/projects">
          מחשבון בגרויות
        </ChakraLink>
      </VStack>
    </Box>
  );
}

export default Sidebar;