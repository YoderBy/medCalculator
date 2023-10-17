import {
  VStack, HStack, NumberInputField, Input, Text, useColorMode, Button, SlideFade, Fade, Flex, Box, NumberInput, MenuButton, Menu, Select
} from "@chakra-ui/react";
import React, { useState } from "react";
import CalculateFinalGrade, { FinalScoreWithAndWithoutMor, Grades } from "../utils/CalculateFinalGrade";
import UnivercityNameChanger from "../utils/UnivercityNameChanger";
import calculateRequiredGradesToPass from "../utils/calculateRequiredGradesToPass";
import roundTwoDigits from "../utils/roundTwoDigits";

interface Score {
  WithMorScore: number;
  WithoutMoreScore: number;
}
interface UniversityScores {
  [year: string]: Score;
}
interface RequiredGrades {
  HebrewUnivercityScore: UniversityScores;
  TelAvivUnivercityScore: UniversityScores;
  TechnionScore: UniversityScores;
}




export const getRequiredGrade = (university: string, year: number) => {
  const key = year.toString();
  // Ensuring that "key" is used as a string index
  switch (university) {
    case 'tel aviv':
      return RequiredGrades.TelAvivUnivercityScore[key];
    //{Grades[key as keyof Grades]}
    case 'heb':
      return RequiredGrades.HebrewUnivercityScore[key];
    case 'tech':
      return RequiredGrades.TechnionScore[key];
    default:
      return RequiredGrades.TelAvivUnivercityScore[key];
  }
};


export const RequiredGrades: RequiredGrades = {
  HebrewUnivercityScore: {
    2023: { WithMorScore: 26.183, WithoutMoreScore: 25.350 },
    2022: { WithMorScore: 26.183, WithoutMoreScore: 24.350 },
    2021: {
      WithMorScore: 26.176
      , WithoutMoreScore: 26.350
    }
  },
  TelAvivUnivercityScore: {
    2023: { WithMorScore: 744.54, WithoutMoreScore: 726.58 },
    2022: {WithMorScore: 746.09, WithoutMoreScore: 729.58
    },
    2021: {
      WithMorScore: 746.41
      , WithoutMoreScore: 733.17
    }
  },
  TechnionScore: {
    2023: { WithMorScore: 201, WithoutMoreScore: 91.925 },
    2022: {
      WithMorScore: 203
      , WithoutMoreScore: 93.925
    },
    2021: { WithMorScore: 207, WithoutMoreScore: 97.925 }
  }
};
export const RequiredGrades1 = {
  HebrewUnivercityScore:
    { WithMorScore: 26.183, WithoutMoreScore: 25.350 },


  TelAvivUnivercityScore:
    { WithMorScore: 744.54, WithoutMoreScore: 726.58 },


  TechnionScore: {
    WithMorScore: 202, WithoutMoreScore: 91.925

  }
}

interface Props {
  Grades: Grades;
  setGrades: (grades: Grades) => void;
}

const FinalGradeCalc: React.FC<Props> = ({ Grades, setGrades }) => {

  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === "dark";



  const sortMin = (string: string) => {
    switch (string) {
      case 'Bagrut': return 80
      case 'Psych': return 200
      case 'MorScore': return 150
    }
    return 0;
  }

  const sortMax = (string: string) => {
    switch (string) {
      case 'Bagrut': return 140
      case 'Psych': return 800
      case 'MorScore': return 250
    }
    return 0;
  }
  const FinalGrades: FinalScoreWithAndWithoutMor = CalculateFinalGrade(Grades);
  const [yearToShow, setyearToShow] = useState(2023);
  const RequiredFinalGrade = getRequiredGrade(Grades.Univercity, yearToShow);

  const handleInputChange = (value: string, key: string) => {
    const newGrades = { ...Grades, [key]: parseFloat(value) };
    setGrades(newGrades);
  }

  return (
    <Flex direction="column" align="center" justify="center" p={4}>
      <HStack dir="rtl">
        <Text dir="rtl">
          בחר שנה:
        </Text>
        <Select
          w='150px'

          padding={'10px'}
          dir='rtl'
          onChange={(e) => setyearToShow(parseInt(e.target.value))}
          defaultValue="סכם בשנת:">
          <option value="2023">2023</option>
          <option value="2022">2022</option>
          <option value="2021">2021</option>
        </Select></HStack>
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
                <NumberInputField textAlign='center' padding={'1px'} />
              </NumberInput>
              <Text textAlign='right' fontSize="lg" color={isDarkMode ? 'white' : '#003366'}>:{label}</Text>
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
            <Text dir='rtl' fontSize={{ base: 'sm', md: 'md' }}
              color={FinalGrades.WithoutMoreScore > RequiredFinalGrade.WithoutMoreScore ? "#28a745" : "#dc3545"}
            >
              סכם ראשוני נדרש ל{UnivercityNameChanger(Grades.Univercity)}: {RequiredFinalGrade.WithoutMoreScore}
            </Text>
            <Text dir='rtl' fontSize={{ base: 'sm', md: 'md' }}
              color={FinalGrades.WithMorScore > RequiredFinalGrade.WithMorScore ? "#28a745" : "#dc3545"}
            >
              סכם קבלה נדרש ל{UnivercityNameChanger(Grades.Univercity)}: {RequiredFinalGrade.WithMorScore}
            </Text>
          </HStack>

          <VStack>
            <Text dir='rtl' fontSize={{ base: 'sm', md: 'md' }} >
               סכם ראשוני שחושב(ללא מור): {FinalGrades.WithoutMoreScore}
            </Text>

            <Text dir='rtl' fontSize={{ base: 'sm', md: 'md' }} >
              סכם סופי שחושב(עם מור): {FinalGrades.WithMorScore}
            </Text>

          </VStack>
          <VStack display={FinalGrades.WithoutMoreScore < RequiredFinalGrade.WithoutMoreScore && FinalGrades.WithMorScore < RequiredFinalGrade.WithMorScore ? '' : 'none'}
                  alignItems={'flex-start'}
                  spacing={{ base: 2, md: 4 }}
                  bg={isDarkMode ? '#2C2C2C' : '#cce7ff'}
                  p={5}
                  borderRadius="md"
                  boxShadow="lg">
                    
          <VStack display={FinalGrades.WithoutMoreScore < RequiredFinalGrade.WithoutMoreScore ? '' : 'none'}
          >
          
            <Text dir='rtl' fontSize={{ base: 'sm', md: 'md' }}> הנתונים שהוזנו לא מספיקים על מנת לעבור סכם ראשוני. האופציות לשיפור הן:</Text>
            <Text fontSize={{ base: 'sm', md: 'md' }}> פסיכומטרי : {calculateRequiredGradesToPass(Grades, yearToShow).requiredPsych}</Text>
            <Text fontSize={{ base: 'sm', md: 'md' }}>ממוצע בגרות : {calculateRequiredGradesToPass(Grades, yearToShow).requiredBagrut}</Text>
          </VStack>

          <VStack display={FinalGrades.WithMorScore < RequiredFinalGrade.WithMorScore ? '' : 'none'}>
            <Text dir='rtl' fontSize={{ base: 'sm', md: 'md' }}>  הנתונים שהוזנו לא מספיקים על מנת לעבור סכם קבלה. האופציות לשיפור הן:</Text>
            <Text fontSize={{ base: 'sm', md: 'md' }}> סכם ראשוני : {roundTwoDigits(calculateRequiredGradesToPass(Grades, yearToShow).requiredFinal)}</Text>
            <Text fontSize={{ base: 'sm', md: 'md' }}>מור : {Math.floor(calculateRequiredGradesToPass(Grades, yearToShow).requiredMor)}</Text>
          </VStack>
          </VStack>
        </VStack>

      </Box>
    </Flex>
  );
}

export default FinalGradeCalc;