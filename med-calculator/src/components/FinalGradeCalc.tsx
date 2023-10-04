import {
    VStack, HStack, Input, Text, useColorMode, Button, SlideFade, Fade, Flex, Box
  } from "@chakra-ui/react";
  import React, { useState } from "react";
  import CalculateFinalGrade, { FinalScoreWithAndWithoutMor, Grades } from "../utils/CalculateFinalGrade";
  import UnivercityNameChanger from "../utils/UnivercityNameChanger";
  
  export const RequiredGrades = {
    HebrewUnivercityScore: { WithMorScore: 26.183, WithoutMoreScore: 25.350 },
    TelAvivUnivercityScore: { WithMorScore: 744.54, WithoutMoreScore: 726.58 },
    TechnionScore: { WithMorScore: 202, WithoutMoreScore: 91.925 },
  };
  
  interface Props {
    Grades: Grades;
    setGrades: (grades: Grades) => void;
  }
  
  const FinalGradeCalc: React.FC<Props> = ({ Grades, setGrades }) => {
    const { colorMode } = useColorMode();
    const isDarkMode = colorMode === "dark";
  
    const getRequiredGrade = (univercity: string) => {
      switch (univercity) {
        case 'tel aviv':
          return RequiredGrades.TelAvivUnivercityScore;
        case 'heb':
          return RequiredGrades.HebrewUnivercityScore;
        case 'tech':
          return RequiredGrades.TechnionScore;
        default:
          return RequiredGrades.TelAvivUnivercityScore;
      }
    }
  
    const FinalGrades: FinalScoreWithAndWithoutMor = CalculateFinalGrade(Grades);
    const RequiredFinalGrade = getRequiredGrade(Grades.Univercity);
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
      const newGrades = { ...Grades, [key]: parseFloat(e.target.value) };
      setGrades(newGrades);
    }
    
    return (
        <Flex direction="column" align="center" justify="center" p={4}>
          <VStack
            w={{base: '90%', md: '500px'}}
            alignItems={'flex-start'}
            spacing={{ base: 2, md: 4 }}
            bg={isDarkMode ? '#2C2C2C' : '#cce7ff'}
            p={5}
            borderRadius="md"
            boxShadow="lg"
          >
            {[
              ["Bagrut", "ממוצע בגרות מותאם", "ממוצע בגרויות"],
              ["MorScore", 'ציון מו"ר מורק"ם', 'מו"ר מורק"ם'],
              ["Psych", "פסיכומטרי", "פסיכומטרי"],
            ].map(([key, placeholder, label]) => (
              <HStack justifyContent="space-between" width="100%" key={key as string}>
                <Input
                  w="100px"
                  textAlign="center"
                  defaultValue={Grades[key as keyof Grades]}
                  onChange={(e) => handleInputChange(e, key as string)}
                  placeholder={placeholder}
                  borderRadius="md"
                  borderColor={isDarkMode ? 'gray.600' : '#007acc'}
                  bg={isDarkMode ? '#444' : '#e6f7ff'}
                  color={isDarkMode ? 'white' : '#003366'}
                />
                <Text fontSize="lg" color={isDarkMode ? 'white' : '#003366'}>:{label}</Text>
              </HStack>
            ))}
          </VStack>
          <Box 
            w={{base: '90%', md: '500px'}}
            mt={5}
            textAlign="center"
            color={isDarkMode ? 'white' : '#003366'}
            fontSize='xl' 
            fontWeight='bold'
          >
            <Text display="block">
              {FinalGrades.WithoutMoreScore} :סכם ראשוני
            </Text>
            <Text 
              color={FinalGrades.WithoutMoreScore > RequiredFinalGrade.WithoutMoreScore ? "#28a745" : "#dc3545"} 
              display="block"
            >
              ,{RequiredFinalGrade.WithoutMoreScore} :סף קבלה ראשוני ל{UnivercityNameChanger(Grades.Univercity)}
            </Text>
            <Text display="block">
              {FinalGrades.WithMorScore} :סכם סופי
            </Text> 
            <Text 
              color={FinalGrades.WithMorScore > RequiredFinalGrade.WithMorScore ? "#28a745" : "#dc3545"} 
              display="block"
            >
              ,{RequiredFinalGrade.WithMorScore} :סף קבלה סופי ל{UnivercityNameChanger(Grades.Univercity)}
            </Text>
          </Box>
        </Flex>
      );
    }
    
    export default FinalGradeCalc;