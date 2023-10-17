import { get } from "http";
import { getRequiredGrade } from "../components/FinalGradeCalc";
import CalculateFinalGrade, { CalculationVariable, Grades } from "./CalculateFinalGrade";
import roundTwoDigits from "./roundTwoDigits";

const calculateRequiredGradesToPass = (grades : Grades, year: number) => {
    
    const RequiredGrades ={
        TelAvivUnivercityScore:  getRequiredGrade('tel aviv', year),
        HebrewUnivercityScore:  getRequiredGrade('heb', year),
        TechnionScore:          getRequiredGrade('tech', year)
    }

    let answer =  {requiredMor: 0, requiredFinal: 0, requiredPsych : 0, requiredBagrut: 0} ;
    const score = CalculateFinalGrade(grades);
    switch (grades.Univercity){
        case 'tel aviv':{
            answer.requiredMor = 
            (RequiredGrades.TelAvivUnivercityScore.WithMorScore - 
            score.WithoutMoreScore*CalculationVariable.TauFinalVariable - 
            CalculationVariable.TauInterfaceVariable)
            /CalculationVariable.TauMorVariable ;
            
            answer.requiredFinal = 
            (RequiredGrades.TelAvivUnivercityScore.WithMorScore - 
            grades.MorScore*CalculationVariable.TauMorVariable - 
            CalculationVariable.TauInterfaceVariable)
            /CalculationVariable.TauFinalVariable ;
            
            // f = Grades.Psych * 0.71416463 + Grades.Bagrut * 2.87103659 - 124.21018293
            answer.requiredBagrut = roundTwoDigits((RequiredGrades.TelAvivUnivercityScore.WithoutMoreScore -
             grades.Psych * 0.71 + 124.21)/2.87)

            answer.requiredPsych =Math.floor(1+ (RequiredGrades.TelAvivUnivercityScore.WithoutMoreScore -
                grades.Bagrut * 2.87103659 + 124.21018293)/0.71416463)

            //console.log(grades.Bagrut)
            //console.log(grades.Psych * 0.71416463 + 
            //    grades.Bagrut * 2.87103659 - 124.21018293)
            

        }break;
        case 'heb' :{
            
            answer.requiredMor = 
            roundTwoDigits((RequiredGrades.HebrewUnivercityScore.WithMorScore - 
            score.WithoutMoreScore*CalculationVariable.HebFinalVariable - 
            CalculationVariable.HebInterfaceVariable)
            /CalculationVariable.HebMorVariable) ;
            
            answer.requiredFinal = 
            roundTwoDigits( (RequiredGrades.HebrewUnivercityScore.WithMorScore - 
            grades.MorScore*CalculationVariable.HebMorVariable - 
            CalculationVariable.HebInterfaceVariable)
            /CalculationVariable.HebFinalVariable) ;

            // f  1.2235 * 0.032073 * Grades.Psych - 1.2235 * 0.3672 + 
            // 1.2235* 0.39630 * Grades.Bagrut - (29.00617)- 20.0621*1.2235 - 4.4598 
            const f = RequiredGrades.HebrewUnivercityScore.WithoutMoreScore;
            answer.requiredBagrut  = roundTwoDigits(0.1 + ((f + 11.5086 - 0.0274689*grades.Psych) / 0.145462))

             answer.requiredPsych = 1 +  Math.floor((f + 11.5086 - 0.145462*grades.Bagrut) / 0.0274689)

        }break;
        case 'tech': {
            answer.requiredMor = RequiredGrades.TechnionScore.WithMorScore;
            answer.requiredBagrut = roundTwoDigits((answer.requiredBagrut + 19 - grades.Psych*0.075)/0.5)
            answer.requiredPsych = Math.floor((answer.requiredBagrut + 19 - grades.Bagrut*0.5)/0.075)
        
        }break;
    }
    return answer
}
export default calculateRequiredGradesToPass;