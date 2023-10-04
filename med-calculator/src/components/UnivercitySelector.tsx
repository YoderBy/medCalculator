import { Select } from "@chakra-ui/react";
interface Props {
    setSelectedUniversity: (value: string) => void;
  }

const UnivercitySelector: React.FC<Props> = ({ setSelectedUniversity }) => {

    return(
        <Select 
            padding={'15px'}
            dir='rtl' 
            onChange={(e) => setSelectedUniversity(e.target.value)}
            defaultValue="tel aviv">
                <option value="tel aviv">תל אביב</option>
                <option value="tech">טכניון</option>
                <option value="heb">העברית</option>
        </Select>
        )
}

export default UnivercitySelector;