import roundTwoDigits from "./roundTwoDigits";
export interface FinalScoreWithAndWithoutMor {
    WithMorScore: number,
    WithoutMoreScore: number
}

export interface FinalGrades {
    HebrewUnivercityScore: FinalScoreWithAndWithoutMor,
    TelAvivUnivercityScore: FinalScoreWithAndWithoutMor,
    TechnionScore: FinalScoreWithAndWithoutMor
}
export interface Bagruts {
    HebrewUnivercityScore: number,
    TelAvivUnivercityScore: number,
    TechnionScore: number
}
export interface Grades {
    Univercity: string,
    Psych: number,
    Bagrut: number,
    MorScore: number
}
export const CalculationVariable = {
    TauFinalVariable: 0.3148421445,
    TauMorVariable:  0.3722744907,
    TauInterfaceVariable: 432.0584815,
    TauPsychVariable: 0.71416463,
    TauBagrutVariable: 2.87103659,

    HebFinalVariable: 0.25,
    HebMorVariable:  0.75 *0.0261 ,
    HebInterfaceVariable: 20.6791*0.75,
    HebPsychVariable:  0.032073,
    HebBagrutVariable: 0.39630
}
const CalculateFinalGrade = (Grades: Grades) => {

    const calculateFinalGradeHebrew = (Grades: Grades) => {

        //f = (1.2235 *((0.39630 *b - 20.0621;) * 0.3 + ( 0.032073 * p + 0.3672) * 0.7) - 4.4598 + 0.0005) 
        // f = -11.5086 + 0.145462 b +  p0.0274689
        // b = (f + 11.5086 - 0.0274689p) / 0.145462
        // p = (f + 11.5086 - 0.145462 b) / 0.0274689
        const BagrutCalcHebrew = 
        0.39630 * Grades.Bagrut - 20.0621;
        const PsychHebrewUnivercity = 
        0.032073 * Grades.Psych + 0.3672;
        const WeightedHebrewScoreBeforeMor =
         BagrutCalcHebrew * 0.3 + PsychHebrewUnivercity * 0.7;
        const FinalHebrewScoreBeforeMor =
         Math.floor((1.2235 * WeightedHebrewScoreBeforeMor - 4.4598 + 0.0005) * 1000) / 1000;
        const FinalHebrewScoreWithMor =
         0.75 * (Grades.MorScore * 0.0261 + 20.6791) +
          0.25 * FinalHebrewScoreBeforeMor
        const FinalHebrew: FinalScoreWithAndWithoutMor =
            { WithMorScore: roundTwoDigits(FinalHebrewScoreWithMor), 
            WithoutMoreScore: roundTwoDigits(FinalHebrewScoreBeforeMor) }
        return FinalHebrew// final score
    }

    const calculateFinalGradeTechnion = (Grades: Grades) => {
        const FinalTechnion: FinalScoreWithAndWithoutMor =
        {
            WithoutMoreScore: roundTwoDigits(Grades.Bagrut * 0.5 + 0.075 * Grades.Psych - 19),
            WithMorScore: Grades.MorScore
        };
        return FinalTechnion;

    }

    const calculateFinalGradeTelAviv = (Grades: Grades) => {
        // f = 
        const WeightedTelAvivScoreBeforeMor = Grades.Psych * 0.71416463 + 
        Grades.Bagrut * 2.87103659 - 124.21018293
        const WeightedTelAvivScoreWithMor = WeightedTelAvivScoreBeforeMor * 0.3148421445 + Grades.MorScore * 0.3722744907 + 432.0584815
        const FinalTelAviv: FinalScoreWithAndWithoutMor =
            { WithMorScore: roundTwoDigits(WeightedTelAvivScoreWithMor), WithoutMoreScore: roundTwoDigits(WeightedTelAvivScoreBeforeMor) };
        return FinalTelAviv;
    }

    switch (Grades.Univercity) {
        case "tel aviv": return calculateFinalGradeTelAviv(Grades)
        case "heb": return calculateFinalGradeHebrew(Grades)
        case "tech": return calculateFinalGradeTechnion(Grades)

    }
    const ErrorScore: FinalScoreWithAndWithoutMor =
        { WithMorScore: -1, WithoutMoreScore: -1 };
    return ErrorScore;

}
export default CalculateFinalGrade



/*
                    var B = 3.9630 * bag - 20.0621;
                    var P = 0.032073 * psy + 0.3672;
                    var X = 0.3 * B + 0.7 * P;
                    var Y = Math.floor((1.2235 * X - 4.4598 + 0.0005) * 1000) / 1000;
תקנון מו"ר/מרק"ם )m):
M = 0.0261 * m + 20.6791
ציון משוקלל סופי לקבלה :
//S = 0.75 * M + 0.25 * Y


טכניון
נוסחת חישוב הסכם- S (בהנחה שהציון הפסיכומטרי P הוא 670):
S=0.5*D+0.075*P-19
גמה: 19-(670*0.075)+(107.6*0.5)=85*/

//Tell aviv
//P*0.71416463	B*2.87103659	-124.21018293
