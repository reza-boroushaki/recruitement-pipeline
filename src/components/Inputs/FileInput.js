import { useState, useRef } from 'react'

export default function FileInput({ updateForm, inputState }) {
    const [selectedFile, setSelectedFile] = useState(inputState);
    const droppedFileRef = useRef(null);
    return (
        <>
            <div className="drop_zone" onDrop={dropHandler} onDragOver={dragOverHandler}>
                <p>Drag file to this Drop Zone</p>
                <input type="file" name="resume" accept={acceptFileTypes.map(item => `${item.type},`)} title='' onChange={dropHandler}/>
            </div>
            <i>Required</i>
        </>
    )
}
