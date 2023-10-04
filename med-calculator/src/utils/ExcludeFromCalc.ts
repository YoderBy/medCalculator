import { TableRow, mustHaveClass } from "../components/GradeTable";
import AddBonus from "./AddBonus";

const ExcludeFromCalc = (row: TableRow, currentAverage: number | null, bonusCriteria : string) => {
    if (
        ( (!mustHaveClass.includes(row.class)) && (bonusCriteria==='tel aviv' || bonusCriteria === 'heb') ) ||
        ( (![...mustHaveClass, 'ספרות', 'תנ"ך'].includes(row.class)) && (bonusCriteria == 'tech') )) {
        if (row.unit && currentAverage && row.grade) {
            const gain = row.grade + AddBonus(row, bonusCriteria);
            if (gain <= currentAverage) { 
                console.log("the gain is " + gain + 'and the average is ' + currentAverage);
                console.log('kick it');
                return true 
            };
        }
    }
    return false;
}
export default ExcludeFromCalc;