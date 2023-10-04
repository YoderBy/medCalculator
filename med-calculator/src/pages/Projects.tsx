
import React, { useEffect, useState } from 'react';
import { Box, Heading, Text, Image, VStack, Table, Thead, Tr, Th, Tbody, Input, Select, Flex } from '@chakra-ui/react';
import GradeTable from '../components/GradeTable';
import { TableRow } from '../components/GradeTable';
import FinalGradeCalc from '../components/FinalGradeCalc';
import { Grades } from '../utils/CalculateFinalGrade';
import UnivercitySelector from '../components/UnivercitySelector';
const Projects = () => {

  const [selectedUniversity, setSelectedUniversity] = useState<string>("tel aviv");

  const Bagruts: TableRow[] = [
    { id: 1, class: 'מתמטיקה', unit: 5 },
    { id: 2, class: 'אנגלית', unit: 5 },
    { id: 3, class: 'תנ"ך', unit: 2 },
    { id: 5, class: 'היסטוריה', unit: 2 },
    { id: 6, class: 'עברית', unit: 2 },
    { id: 7, class: 'ספרות', unit: 2 },
    { id: 8, class: 'אזרחות', unit: 2 },

  ];

  const ConstGrade: Grades = {
    Univercity: selectedUniversity,
    Psych: 780,
    Bagrut: 114.12,
    MorScore: 200
  };

  const [Grades, setGrades] = useState<Grades>(ConstGrade);

  useEffect(() => {
    setGrades((prevGrades) => ({ ...prevGrades, Univercity: selectedUniversity }));
  }, [selectedUniversity]);


    return (
      <Flex 
        direction="column" 
        align="center" 
        justify="center" 
        w="100%" 
      >
        <VStack 
          w={{base: '90%', md: '1000px'}}  
          spacing={{ base: 2, md: 4 }} 
          alignItems="center" 
          padding={5} 
        >
          <Heading as="h1" size="2xl">מחשבון  עזר לקבלה לרפואה</Heading>
          <Box
          transition="all 0.3s"
          _hover={{
            transform: 'scale(1.05)',
            boxShadow: 'lg',
          }}
        >
          <Select
            padding={'15px'}
            dir='rtl'
            onChange={(e) => setSelectedUniversity(e.target.value)}
            defaultValue="tel aviv"
            _focus={{ borderColor: 'blue.500', boxShadow: 'outline' }}
          >
            <option value="tel aviv">תל אביב</option>
            <option value="tech">טכניון</option>
            <option value="heb">העברית</option>
          </Select>
        </Box>
        <GradeTable InputRows={Bagruts} bonusCriteria={selectedUniversity}></GradeTable>
        <FinalGradeCalc setGrades={setGrades} Grades={Grades}></FinalGradeCalc>
      </VStack>
    </Flex>
  );

}
export default Projects;
