const UnivercityNameChanger = (name:string) =>{
    switch (name){
        case 'tel aviv':
            return 'תל אביב';
        case 'tech':
            return 'טכניון';
        case 'heb':
            return 'עברית';
        }
    return 'תל אביב'
}
export default UnivercityNameChanger;