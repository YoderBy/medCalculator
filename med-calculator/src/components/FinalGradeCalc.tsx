import {
  VStack, HStack, NumberInputField, Input, Text, useColorMode, Button, SlideFade, Fade, Flex, Box, NumberInput
} from "@chakra-ui/react";
import React, { useState } from "react";
import CalculateFinalGrade, { FinalScoreWithAndWithoutMor, Grades } from "../utils/CalculateFinalGrade";
import UnivercityNameChanger from "../utils/UnivercityNameChanger";
import calculateRequiredGradesToPass from "../utils/calculateRequiredGradesToPass";
import roundTwoDigits from "../utils/roundTwoDigits";

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
const sortMin = (string: string) => {
  switch(string){
    case 'Bagrut': return 80
    case 'Psych': return 200
    case 'MorScore': return 150
  }
  return 0;
}

const sortMax = (string: string) => {
  switch(string){
    case 'Bagrut': return 140
    case 'Psych': return 800
    case 'MorScore': return 250
  }
  return 0;
}
  const FinalGrades: FinalScoreWithAndWithoutMor = CalculateFinalGrade(Grades);
  const RequiredFinalGrade = getRequiredGrade(Grades.Univercity);
  const handleInputChange = (value: string, key: string) => {
    const newGrades = { ...Grades, [key]: parseFloat(value) };
    setGrades(newGrades);
  }

  return (
    <Flex direction="column" align="center" justify="center" p={4}>
      <VStack
        w={{ base: '90%', md: '500px' }}
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
        ].map(([key, placeholder, label]) => {
          return (
            <HStack justifyContent="space-between" width="100%" key={key as string}>
              <NumberInput
                w="100px"
                min={sortMin(key)}
                max={sortMax(key)}
                textAlign="center"
                defaultValue={Grades[key as keyof Grades]}
                onChange={(value) => handleInputChange(value, key as string)}
                placeholder={placeholder}
                borderRadius="md"
                borderColor={isDarkMode ? 'gray.600' : '#007acc'}
                bg={isDarkMode ? '#444' : '#e6f7ff'}
                color={isDarkMode ? 'white' : '#003366'}
              >
                <NumberInputField textAlign = 'center' padding={'1px'}/>
                </NumberInput>
                <Text textAlign = 'right' fontSize="lg" color={isDarkMode ? 'white' : '#003366'}>:{label}</Text>
              </HStack>
          );
        })}
      </VStack>
      <Box
        w={{ base: '90%', md: '500px' }}
        mt={5}
        textAlign="center"
        color={isDarkMode ? 'white' : '#003366'}
        fontSize='xl'
        fontWeight='bold'
      >
        <VStack>
          <HStack align-items='inherit' >
            <Text dir = 'rtl' fontSize={{ base: 'sm', md: 'md' }}
              color={FinalGrades.WithoutMoreScore > RequiredFinalGrade.WithoutMoreScore ? "#28a745" : "#dc3545"}
            >
              סכם ראשוני ל{UnivercityNameChanger(Grades.Univercity)}: {RequiredFinalGrade.WithoutMoreScore}
            </Text>
            <Text dir = 'rtl' fontSize={{ base: 'sm', md: 'md' }}
              color={FinalGrades.WithMorScore > RequiredFinalGrade.WithMorScore ? "#28a745" : "#dc3545"}
            >
              סכם קבלה ל{UnivercityNameChanger(Grades.Univercity)}: {RequiredFinalGrade.WithMorScore}
            </Text>
          </HStack>

          <VStack>
            <Text dir='rtl' fontSize={{ base: 'sm', md: 'md' }} >
              סכם ראשוני(ללא מור): {FinalGrades.WithoutMoreScore}
            </Text>

            <Text dir='rtl' fontSize={{ base: 'sm', md: 'md' }} >
              סכם סופי(עם מור): {FinalGrades.WithMorScore}
            </Text>
          </VStack>

            <VStack display={FinalGrades.WithoutMoreScore < RequiredFinalGrade.WithoutMoreScore ? '' : 'none'}
            >
              <Text dir = 'rtl' fontSize={{ base: 'sm', md: 'md' }}> על מנת לעבור סכם ראשוני יש לשפר אחד מהציונים:</Text>
              <Text fontSize={{ base: 'sm', md: 'md' }}> פסיכומטרי : {calculateRequiredGradesToPass(Grades).requiredPsych}</Text>
              <Text fontSize={{ base: 'sm', md: 'md' }}>ממוצע בגרות : {calculateRequiredGradesToPass(Grades).requiredBagrut}</Text>
            </VStack>

            <VStack display={FinalGrades.WithMorScore < RequiredFinalGrade.WithMorScore ? '' : 'none'}>
            <Text dir = 'rtl' fontSize={{ base: 'sm', md: 'md' }}> על מנת לעבור סכם קבלה יש לשפר אחד מהציונים:</Text>
              
              <Text fontSize={{ base: 'sm', md: 'md' }}> סכם ראשוני : {roundTwoDigits(calculateRequiredGradesToPass(Grades).requiredFinal)}</Text>
              <Text fontSize={{ base: 'sm', md: 'md' }}>מור : {Math.floor(calculateRequiredGradesToPass(Grades).requiredMor)}</Text>
            </VStack>
        </VStack>

      </Box>
    </Flex>
  );
}

export default FinalGradeCalc;