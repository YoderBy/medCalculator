
import React from 'react';
import { Box, Heading, Text, Image, VStack } from '@chakra-ui/react';

const About = () =>
    {
     return (<div>   
        <VStack spacing={8} alignItems="center" padding={5}>
          <Heading as="h1" size="2xl">About Me</Heading>
    
          <Image
            borderRadius="full"
            boxSize="150px"
            src="https://placekitten.com/1335/2671"  // Replace with your image path
            alt="Your Name"                // Replace with your name
          />
    
          <Text maxWidth="800px">
          In Silicon Valley, a biologist and a business analyst decided to learn coding. "Coding's like genetics, but with 0s and 1s instead of ATCG," she mused. He laughed, "And market trends are just... actual variables!" Their first app tried predicting stock trends from plant DNA. While it didn't take off, their coding blunders sure brewed entertaining coffee chats!</Text>
    
        </VStack>
        </div>);
    }
    export default About;
