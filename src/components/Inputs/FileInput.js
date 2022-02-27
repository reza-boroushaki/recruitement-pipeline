import { useState, useRef, memo } from 'react'
import { acceptFileTypes } from '../_helpers';
import './fileInput.scss';

function FileInput({ updateForm, inputState }) {
    const [selectedFile, setSelectedFile] = useState(inputState);
    const [loaded, setLoaded] = useState(inputState?.name ? true : false);
    const droppedFileRef = useRef(null);
    const dragOverHandler = e => {
        e.preventDefault();
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
            updateForm('resume', {file: reader.result, name: files[0].name, type: files[0].type});
            setSelectedFile({file: reader.result, name: files[0].name, type: files[0].type});
        }
        reader.onloadend = function(){
            console.log("load ended")
            setLoaded(true);
        }
        if (files.length) {
            reader.readAsDataURL(files[0])
        }
    }
    return (
        <div className='fileWrapper'>
            <p className='label'><label>CV</label></p>
            <div className="drop_zone" onDrop={dropHandler} onDragOver={dragOverHandler}>
                <div className='dropText'>
                    <b>Drag files here to upload</b>
                    <p>or</p>
                    <span>CHOOSE FILE TO UPLOAD</span>
                </div>
                <input type="file" name="resume" accept={acceptFileTypes.map(item => `${item.type},`)} title='' onChange={dropHandler}/>
            </div>
            <i>Required</i>
            {
                inputState?.name || loaded
                ?
                <div className='fileName'>
                    <p ref={droppedFileRef}>{selectedFile?.name}</p><span>DONE</span>
                </div>
                :
                ''
            }
            {
                selectedFile?.file && <a className='downloadLink' href={selectedFile?.file} download>Download</a>
            }
        </div>
    )
}

export default memo(FileInput);