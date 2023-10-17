import { VStack, Heading, Image, Table, Thead, Tr, Th, Text, Tbody, Input, NumberInput, NumberInputField, useColorMode, Button, SlideFade } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useMemo, useState } from "react";
import { addAbortSignal } from "stream";
import AddBonus from "../utils/AddBonus";
import ExcludeFromCalc from "../utils/ExcludeFromCalc";
import Calculate from "../utils/Calculate";
import { set } from "react-hook-form";
import UnivercitySelector from "./UnivercitySelector";
import UnivercityNameChanger from "../utils/UnivercityNameChanger";
export const bonusClass =
 ['אנגלית', 'פיזיקה','פיסיקה', 'כימיה', 'ביולוגיה', 'ספרות', 'היסטוריה', 'תנ"ך'];
export const mustHaveClass = ['אנגלית', 'מתמטיקה', 'היסטוריה', 'עברית', 'אזרחות'];

export interface TableRow {
    id: number;
    class: string;
    grade?: number;
    unit?: number;
    bonus?: null | number;
    isRed?: boolean;
}
interface Props {
    InputRows: TableRow[];
    bonusCriteria: string;
}
const GradeTable = ({ InputRows, bonusCriteria }: Props) => {
    const { colorMode } = useColorMode();
    const isDarkMode = colorMode === 'dark';
    const [display, setdisplay] = useState(true);
    const [rows, setRows] = useState<TableRow[]>(InputRows);
    const [BonusRows, setBonusRows] = useState<TableRow[]>([{ id: 9, class: '' }]);
    const initialAverage = Calculate([...rows, ...BonusRows], bonusCriteria);

    const redRows = useMemo(() => {
        return [...rows, ...BonusRows].filter(row => ExcludeFromCalc(row, initialAverage, bonusCriteria)).map(row => row.id);
    }, [rows, BonusRows, initialAverage]);

    const Average = Calculate([...rows, ...BonusRows].filter(row => !redRows.includes(row.id)), bonusCriteria) || '';
    
    useEffect(() => {
        // Get the data from localStorage and update the state on component mount
        const savedRows = localStorage.getItem('gradeRows');
        const savedBonusRows = localStorage.getItem('bonusRows');
        if(savedRows) {console.log(JSON.parse(savedRows))}
        if(savedRows) {
          setRows(JSON.parse(savedRows));
        }
        if(savedBonusRows) {
          setBonusRows(JSON.parse(savedBonusRows));
        }
      
      }, []);

    const handleChange = (id: number, field: string, value: number | string) => {

        const updateRow = (row: TableRow) => {
            if (row.id !== id) return row;

            const updatedRow = { ...row, [field]: value };
            updatedRow.bonus = AddBonus(updatedRow, bonusCriteria);
            return updatedRow;
        };

        if (id <= 8) {
            setRows(prev => prev.map(updateRow));

        } else {
            setBonusRows(prev => prev.map(updateRow));
        }

        if (id === BonusRows[BonusRows.length - 1].id) {
            const newId = id + 1;
            const newRow: TableRow = {
                id: newId,
                class: '',
                grade: undefined,
                unit: undefined,
                bonus: null
            };
            setBonusRows(prev => [...prev, newRow]);
        }

        localStorage.setItem('gradeRows', JSON.stringify(rows));
        localStorage.setItem('bonusRows', JSON.stringify(BonusRows));
    };
    const [showTable, setShowTable] = useState(true);
    useEffect(() => {

        const updateBonusForRows = (rowsToUpdate: TableRow[]): TableRow[] => {
            return rowsToUpdate.map(row => {
                const updatedRow = { ...row };
                updatedRow.bonus = AddBonus(updatedRow, bonusCriteria);
                return updatedRow;
            });
        };

        setRows(prevRows => updateBonusForRows(prevRows));
        setBonusRows(prevBonusRows => updateBonusForRows(prevBonusRows));

        console.log("Bonus Criteria changed to:", UnivercityNameChanger(bonusCriteria));

    }, [bonusCriteria]);
    return (
        <>
            <Button
                onClick={() => {
                    setShowTable(!showTable);
                    if (display) {
                        const a = setTimeout(() => {
                            setdisplay(false)
                        }, 500);
                    }
                    else {
                        setdisplay(true);
                    }
                }}

                colorScheme={showTable ? "red" : "green"}
            >
                {showTable ? 'הסתר' : 'הצג'} מחשבון בגרויות
            </Button>

            <SlideFade in={showTable} offsetY="220px">
            <Heading
                dir="rtl"

                fontSize={{ base: 'lg', md: "2xl" }}
                color={isDarkMode ? 'white' : '#003366'}

                borderColor={isDarkMode ? 'gray.600' : '#007acc'}
            >
                הממוצע ב{UnivercityNameChanger(bonusCriteria)} הוא:{" "}
                <Text as="span" fontWeight="bold" color={isDarkMode ? "#d6eeff" : "#28a745"}>
                    {Average}
                </Text>
            </Heading>

                <Table 
                    display = {display? '' : 'none'}
                    color={isDarkMode ? 'white' : '#003366'}
                    border="1px solid"
                    borderColor={isDarkMode ? 'gray.600' : '#007acc'}
                    dir="rtl">
                    <Thead>
                        <Tr>
                            <Th  fontSize={'xs'}>מקצוע</Th>
                            <Th >יחידות</Th>
                            <Th>ציון בגרות</Th>
                            <Th >בונוס</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {
                            rows.map(row =>
                                <Tr backgroundColor={redRows.includes(row.id) ? (isDarkMode ? '#663333' : '#FFEAEA') : (isDarkMode ? 'gray.800' : 'white')} key={row.id}>
                                    <Th>{row.class}</Th>
                                    <Th  maxW = '120px'>
                                        <NumberInput
                                        maxW = '80px'
                                        defaultValue={row.unit}
                                            min={2}
                                            max={10}
                                            onChange={(valueString) => {
                                                const value = parseInt(valueString);
                                                handleChange(row.id, 'unit', value);
                                            }}
                                            bg={isDarkMode ? 'gray.600' : 'gray.50'}
                                            color={isDarkMode ? 'gray.200' : 'black'}
                                        >
                                            <NumberInputField  
                                            h = {'100%'} fontSize={'s'} textAlign = 'center' padding={'1px'} />
                                        </NumberInput>
                                    </Th>
                                    <Th  minW = {{base: '', md: '150px'}}>
                                        <NumberInput  
                                           maxW = '80px'
                                            defaultValue={row.grade}
                                            min={55}
                                            max={100}
                                            onChange={(valueString) => {
                                                const value = parseInt(valueString);
                                                handleChange(row.id, 'grade', value);
                                            }}
                                            bg={isDarkMode ? 'gray.600' : 'gray.50'}
                                            color={isDarkMode ? 'gray.200' : 'black'}
                                        >
                                            <NumberInputField h = {'100%'} fontSize={'s'} textAlign = 'center' padding={'1px'} />
                                        
                                        </NumberInput>
                                    </Th>
                                    <Th>{AddBonus(row, bonusCriteria)}</Th>
                                </Tr>
                            )
                        }

                        {
                            BonusRows.map(row =>
                                <Tr backgroundColor={redRows.includes(row.id) ? (isDarkMode ? '#663333' : '#FFEAEA') : (isDarkMode ? 'gray.800' : 'white')} key={row.id}>
                                    <Th>
                                        <Input bg={"whiteAlpha.400"} h = {'100%'} fontSize={'s'} textAlign = 'center' padding={'1px'}    onChange={(e) => { handleChange(row.id, 'class', e.target.value) }} defaultValue={row.class}></Input></Th>
                                    <Th >
                                        <NumberInput  
                                            maxW = '80px'
                                            w={{base: 'auto', md: 'auto'}}
                                            defaultValue={row.unit}
                                            min={2}
                                            max={10}
                                            onChange={(valueString) => {
                                                const value = parseInt(valueString);
                                                handleChange(row.id, 'unit', value);
                                            }}
                                            bg={isDarkMode ? 'gray.600' : 'white'}
                                            color={isDarkMode ? 'gray.200' : 'black'}>
                                            <NumberInputField h = {'100%'} fontSize={'s'} textAlign = 'center' padding={'1px'} />
                                        </NumberInput>
                                    </Th>
                                    <Th>
                                        <NumberInput  w={{base: 'auto', md: 'auto'}}
                                        maxW = '80px'
                                            defaultValue={row.grade}
                                            min={55}
                                            max={100}
                                            onChange={(valueString) => {
                                                const value = parseInt(valueString);
                                                handleChange(row.id, 'grade', value);
                                            }}

                                            bg={isDarkMode ? 'gray.600' : 'white'}
                                            color={isDarkMode ? 'gray.200' : 'black'}
                                        >
                                            <NumberInputField  h = {'100%'} fontSize={'s'} textAlign = 'center' padding={'1px'}  />
                                        </NumberInput>
                                    </Th>
                                    <Th>{AddBonus(row, bonusCriteria)}</Th>
                                </Tr>
                            )}

                    </Tbody>
                </Table>
            </SlideFade>
        </>)
}
export default GradeTable;