import { useState, useEffect, useRef, memo } from 'react';
import './input.scss';

function Input({ attr, updateForm, stage, stageChange, inputState = '' }) {
    const { type, title, name, required = false } = attr;
    const [inputValue, setInputValue] = useState('');
    const [submitValue, setSubmitValue] = useState(inputState ? true : false);

    const inputRef = useRef(null);

    const handleInput = e => {
        setInputValue(e.target.value);
        e.target.style.width = ((e.target.value.length + 1) * 8) + "px";
    }

    const handleSubmit = e => {
        e.preventDefault();
        setSubmitValue(true);
        inputRef?.current.classList.remove('editing');
        updateForm(name, inputValue);
        if(name === 'skills') setInputValue('');
    }

    const handleEdit = e => {
        e.preventDefault();
        setSubmitValue(false);
        e.target.classList.add('editing');
        inputRef?.current.focus();
    }

    const handleClear = e => {
        e.preventDefault();
        setInputValue('');
        inputRef?.current.classList.remove('editing');
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
        <div className={`${name} input`}>
            <p className='label'><label>{title ? title : ' '}</label></p>
            <input style={{width: inputValue ? ((inputValue.length + 1) * 8) + "px" : 'fit-content'}} className={!inputValue ? 'empty' : ''} ref={inputRef} type={type} name={name} value={inputValue} onChange={handleInput} onFocus={handleEdit} title=''/>
            {
                inputValue?.length && !submitValue
                ?
                    <div className='clearSubmitButtons'>
                        <button onClick={handleClear}></button>
                        <button onClick={handleSubmit}></button>
                    </div>
                :
                ''
            }
            {
                submitValue && (
                    <button className='editButton' onClick={handleEdit}></button>
                )
            }
        </div>
    )
}

export default memo(Input);