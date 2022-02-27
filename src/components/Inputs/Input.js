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

    const handleClear = e => {
        e.preventDefault();
        setInputValue('');
        updateForm(name, '');
    }

    return (
        <div>
            <p><label>{title ? title : ''}</label></p>
            <input ref={inputRef} type={type} name={name} value={inputValue} onChange={handleInput} onFocus={handleEdit} title=''/>
            {
                inputValue?.length && !submitValue
                ?
                    <div>
                        <button onClick={handleClear}>clear</button>
                        <button onClick={handleSubmit}>submit</button>
                    </div>
                :
                ''
            }
            {
                submitValue && (
                    <button onClick={handleEdit}>edit</button>
                )
            }
        </div>
    )
}