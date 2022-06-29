import React from 'react';
import Select from 'react-select'

const SelectField = ({styles, label, options, onChange, defaultValue, isMulti, count, qindex}) => {
    const [selectedOptions, setSelectedOptions] = React.useState([]);

    const handleSelect = (e) => {
        onChange(e, qindex);
        setSelectedOptions(e);
    }

    return ( <div className="wrap-select">
        <h1>{label}</h1>
        <Select 
            styles={styles} 
            isMulti={isMulti} 
            options={options} 
            onChange={(e) => handleSelect(e)} 
            defaultValue={defaultValue} 
            value={selectedOptions} 
            isOptionDisabled={() => selectedOptions.length >= count} />
    </div>  
    )
}

export default SelectField