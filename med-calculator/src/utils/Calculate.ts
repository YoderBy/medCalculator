import { TableRow } from "../components/GradeTable";
import AddBonus from "./AddBonus";


const Calculate = (allRows: TableRow[], bonusCriteria: string) => {
    let sum = 0;
    let count = 0;

    allRows.forEach(row => {
        if (row.unit && row.grade) {
            if (row.class == 'מתמטיקה' && bonusCriteria == 'tech' && row.unit == 5) {
                sum += (row.unit + 5) * (row.grade + AddBonus(row, bonusCriteria));
                count += 10;
            }
            else {
                sum += row.unit * (row.grade + AddBonus(row, bonusCriteria));
                count += row.unit;
            }
        }
    })

    if (sum === 0) {
        return null
    }

    const Avg = Math.round((sum / count) * 100) / 100;
    //console.log(Avg + "  " + bonusCriteria);
    if (Avg > 119 && bonusCriteria === 'tech') {
        return 119
    }
    if (Avg > 117 && bonusCriteria === 'tel aviv') {
        return 117
    }
    if (Avg > 130 && bonusCriteria === 'heb') {
        return 130
    }
    return Avg;



}

export default Calculate;