import { useState, useRef } from 'react'

export default function FileInput({ updateForm, inputState }) {
    const [selectedFile, setSelectedFile] = useState(inputState);
    const droppedFileRef = useRef(null);
    const dragOverHandler = e => {
        e.preventDefault();
        console.log('File(s) in drop zone');
    }
    const dropHandler = e => {
        e.preventDefault();
        const { files } = e.dataTransfer || e.target;
        const fileTypeExists = acceptFileTypes.find(item => item.type === files[0].type);
        if(!fileTypeExists){
            return;
        }
        let reader = new FileReader();
        reader.onload = function(){
            updateForm('resume', {file: reader.result, name: files[0].name});
            setSelectedFile({file: reader.result, name: files[0].name});
        }
        reader.onloadend = function(){
            console.log("load ended")
        }
        if (files.length) {
            reader.readAsDataURL(files[0])
        }
    }
    return (
        <>
            <div className="drop_zone" onDrop={dropHandler} onDragOver={dragOverHandler}>
                <p>Drag file to this Drop Zone</p>
                <input type="file" name="resume" accept={acceptFileTypes.map(item => `${item.type},`)} title='' onChange={dropHandler}/>
            </div>
            <i>Required</i>
            <p ref={droppedFileRef}>{selectedFile?.name}</p>
            {
                selectedFile?.file && <a href={selectedFile?.file} download>download</a>
            }
        </>
    )
}
