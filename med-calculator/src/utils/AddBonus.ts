import { TableRow, bonusClass } from "../components/GradeTable";

const AddBonus = (row: TableRow, bonusCriteria: string) => {
    switch (bonusCriteria) {
        case "tel aviv":
            if (row.unit) {
                //console.log( row.class + " "+ row.unit +"  "+ bonusCriteria);
                if (row.class === 'מתמטיקה' && row.unit === 5) {
                    return 30;
                }
                if ((row.class === 'מתמטיקה' || row.class === 'אנגלית') && row.unit === 4) {
                    return 12.5;
                }
                if (bonusClass.includes(row.class) && row.unit === 5) {
                    return 25;
                }
                if (row.unit === 5) {
                    return 20;
                }   
            }
            break;
        case "tech":
            if (row.unit) {
                
                //console.log( row.class + " "+ row.unit +"  " +bonusCriteria);
                if (row.class === 'מתמטיקה' && row.unit === 5) {
                    return 35;
                }
                if ((row.class === 'מתמטיקה' || row.class === 'אנגלית') && row.unit === 4) {
                    return 10;
                }
                if (bonusClass.includes(row.class) && row.unit === 5) {
                    return 30;
                }
                if (row.unit === 5) {
                    return 20;
                }
            }
            break;
        case "heb":

            if (row.unit) {
                
                //console.log( row.class + " "+ row.unit +"  "+ bonusCriteria);
                if (row.class === 'מתמטיקה' && row.unit === 5) {
                    return 35;
                }
                if ((row.class === 'מתמטיקה' || row.class === 'אנגלית')
                && row.unit === 4) {
                    return 12.5;
                }
                if (bonusClass.includes(row.class) && row.unit === 5) {
                    return 25;
                }
                if (row.unit === 5) {
                    return 20;
                }
            }
            break;
    }
    return 0;
}

    export default AddBonus;