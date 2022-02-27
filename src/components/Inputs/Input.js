import { useState, useRef } from 'react';

export default function Input({ attr }) {
    const { type, title, name, required = false } = attr;
    const [inputValue, setInputValue] = useState('');
    const [submitValue, setSubmitValue] = useState(inputState ? true : false);

    const inputRef = useRef(null);

    const handleInput = e => {
        setInputValue(e.target.value);
    }

    const handleEdit = e => {
        e.preventDefault();
        setSubmitValue(false);
        inputRef?.current.focus();
    }

    return (
        <div>
            <p><label>{title ? title : ''}</label></p>
            <input ref={inputRef} type={type} name={name} value={inputValue} onChange={handleInput} onFocus={handleEdit} title=''/>
        </div>
    )
}
