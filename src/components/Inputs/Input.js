import { useState, useEffect, useRef, memo } from 'react';

function Input({ attr, updateForm, stage, stageChange, inputState = '' }) {
    const { type, title, name, required = false } = attr;
    const [inputValue, setInputValue] = useState('');
    const [submitValue, setSubmitValue] = useState(inputState ? true : false);

    const inputRef = useRef(null);

    const handleInput = e => {
        setInputValue(e.target.value);
    }

    const handleSubmit = e => {
        e.preventDefault();
        setSubmitValue(true);
        updateForm(name, inputValue);
        if(name === 'skills') setInputValue('');
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

    useEffect(() => {
        if(stage > 0 && (inputValue === '' || !submitValue) && required){
            stageChange(0);
        }
    }, [stage, inputValue, required, stageChange, submitValue]);

    useEffect(() => {
        setInputValue(inputState);
    }, [inputState]);

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

export default memo(Input);