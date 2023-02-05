import React, {useCallback, useEffect, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import { AiOutlineCloudUpload } from "react-icons/ai";
import SingleFileUpload from './SingleFileUpload';
import CircularProgress from '@mui/material/CircularProgress';

const  Dashboard=()=> {
  const[files,setFiles] = useState([]);
  const onDrop = useCallback((acceptedFiles,rejectedFiles) => {
    const accFiles = acceptedFiles.map(file=>({file,errors:[]}));
    

    setFiles((curr)=>[...curr,...accFiles]);
    
  }, [])
  const {getRootProps, getInputProps,fileRejections} = useDropzone({onDrop,maxFiles:1,accept:{'audio/wav': ['.wav'],'audio/mp3': ['.mp3'],'video/mp4': ['.mp4']}})

  function onDelete(file) {
    setFiles((curr) => curr.filter((fw) => fw.file === file));
    
  }
  function onUpload(file, url) {
    setFiles((curr) =>
      curr.map((fw) => {
        if (fw.file === file) {
          return { ...fw, url };
        }
        return fw;
      })
    );
    
  }
  

 

  return (
    <div data-aos='fade-up'
    data-aos-delay='800' className='container justify-center h-[60vh]  flex mx-auto mt-20 origin-top-right w-7/12 rounded-md shadow-2xl div-container'>
      <div className='mx-auto container sm:m-4 md:m-16 lg:m-20 bg-white  rounded-2xl'>
      <div>
      {files.length == 0 ? 
    <div className='uploader-container hover:div-container border-dashed sm:m-4 md:m-8 lg:m-8 mx-auto container w-auto  border-gray-200 border-4 rounded-2xl'  {...getRootProps()}>
    <div className=' flex-col justify-items-center text-center content-center' >
    <AiOutlineCloudUpload className='ml-[45%] icon-cloud' size={70} color="#7cc0d8"/>
      <input {...getInputProps()} />
      <p className='heading' >Drop your images here, or <span className='heading-span'>browse</span></p>
      <p className='heading-p' >Supports: MP4, MOV, WAV, AVI, MKV</p>
    </div>
    
    
    </div>
    :
    <div className='justify-center items-center bg-gray-200 p-6 ml-16 mt-6 mr-16' >
    <CircularProgress className='ml-64  mb-4' color='secondary' />
    <h1 className='text-red-500 text-center' >Please Hang Tight! transcription is in progress....</h1>
    </div>
  }
</div>
    {fileRejections.length ? <h1 className='text-red-500 text-center' >This Format of File is not accepted!, Please upload specified Files Format</h1>  :
    files.map((fileWrapper,index)=>(
      <SingleFileUpload onUpload={onUpload} onDelete={onDelete} key={index} file={fileWrapper.file}/> 
    ))}
    </div>
    </div>
  )
}

export default Dashboard;