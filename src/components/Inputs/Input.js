import { useState } from 'react';

export default function Input({ attr }) {
    const { type, title, name, required = false } = attr;
    const [inputValue, setInputValue] = useState('');
    const [submitValue, setSubmitValue] = useState(inputState ? true : false);

    const handleInput = e => {
        setInputValue(e.target.value);
    }

    return (
        <div>
            <p><label>{title ? title : ''}</label></p>
            <input type={type} name={name} value={inputValue} onChange={handleInput} title=''/>
        </div>
    )
}
