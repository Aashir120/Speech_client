import React, { useEffect, useState } from 'react'
import LinearProgress from '@mui/material/LinearProgress';
import FileHeader from './FileHeader'
import { useNavigate } from 'react-router-dom';

export default function SingleFileUpload({file,onDelete,onUpload}) {
    const navigate = useNavigate();
    const[progress,setProgress] = useState(0);
    useEffect(()=>{
        async function upload(){
            const url = await uploadFile(file,setProgress);
            onUpload(file,url);
        }
        upload().then(()=>{
            alert('SuccessFully Transcribe')
            navigate('/details')
            
        })

    },[])

  return (
    <div>
        {file ? <><FileHeader file={file} onDelete={()=>onDelete()} />
      <LinearProgress variant="determinate" value={progress} /></> : null}
    </div>
  )
}
function uploadFile(file,onProgress){
    const url = 'http://localhost:5000/upload';
    const key = 'files[]';
    return new Promise((res,rej)=>{
        const xhr = new XMLHttpRequest();
        xhr.open('POST',url);

        xhr.onload=()=>{
            const response = JSON.parse(xhr.responseText);
            res(response.secure_url);
        }
        xhr.onerror=(evt)=>rej(evt);
        xhr.upload.onprogress=(event)=>{
            if(event.lengthComputable){
                const percentage = (event.loaded/event.total)*100;
                onProgress(Math.round(percentage));
            }
        }
        const formData = new FormData();
        formData.append('files[]',file);
        formData.append('files[]',key);
        xhr.send(formData)
    })
}