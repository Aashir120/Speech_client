import React, { useEffect, useState } from 'react'
import Typewriter from 'typewriter-effect';

const Details = () => {

  const [topic, setTopic] = useState([]);
  const [transcribe, setTranscribe] = useState([]);
  const [speech, setSpeech] = useState();
  const [speaker, setSpeaker] = useState();

  const FetchTopic = () => {
    fetch(`http://localhost:5000/topic`)
      .then(res => res.json())
      .then(
        (result) => {
          setTopic(result)
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log(error);
          // setIsLoaded(true);
          // setError(error);
        }
      )

  }
  const FetchTranscribe = () => {
    fetch(`http://localhost:5000/download`)
      .then(res => res.json())
      .then(
        (result) => {
          setTranscribe(result)
          
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log(error);
          // setIsLoaded(true);
          // setError(error);
        }
      )

      countUniqueSpeakers(transcribe)

  }
  const FetchSpeech = () => {
    fetch(`http://localhost:5000/speech`)
      .then(res => res.json())
      .then(
        (result) => {
          setSpeech(result)
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log(error);
          // setIsLoaded(true);
          // setError(error);
        }
      )

  }

  const countUniqueSpeakers=(lines)=> {
    console.log('hello');
    let speakers = new Set();
    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];
      if (line.startsWith("Speaker")) {
        let speaker = line.split(" ")[0];
        speakers.add(speaker);
      }
    }
    console.log(speakers);
    setSpeaker(speakers.size)
  }
  



  useEffect(() => {

    FetchTopic()
    FetchTranscribe()
    FetchSpeech()  

  }, [])

  const [state, setQuery] = useState({
    query: '', list: []
  })
  const handleChange = (e) => {
    const results = transcribe.filter(post => {
      if (e.target.value === "") return transcribe
      return post.toLowerCase().includes(e.target.value.toLowerCase())
    })
    setQuery({
      query: e.target.value,
      list: results
    })
  }
  return (
    <div className='justify-center items-center' >
      <h1 className='text-black font-bold text-[42px] text-center capitalize mt-16'  >transcription Details</h1>
      <div className='justify-center items-center mt-6' >
        <form className='items-center justify-center text-center'>
          <input className='w-[300px]  btn-quaternary border-[1px] border-black h-[50px] p-4' placeholder='Search Your Content Here .... ' type="search" value={state.query} onChange={handleChange} />
        </form>
        <ol className='justify-center  items-center container mx-auto list-inside list-disc' >
          {(state.query === '' ? "" : state.list.map(post => {
            return <li className='justify-center  text-lg font-bold ' key={post}>{post} <span className='text-gray-400 text-sm pt-4' >time duration in seconds</span></li>
          }))}
        </ol>
      </div>
      {topic.length === 0 ? <h1>There is not topic</h1> :
        <div className='flex mt-8 flex-row border-[1px] border-black container mx-auto justify-around' >
          <div  >
            <h1 className='text-black font-bold text-xl text-center' >Topic</h1>
            <hr className='border-[1px] border-black w-[500px]' />
            <p className='text-xl text-center p-4' >{topic[0]}</p>
          </div>
          <div>
          <h1 className='text-black font-bold text-xl text-center' >Confidence</h1>
            <hr className='border-[1px] border-black w-[500px]' />
            <p className='text-xl text-center p-4' >{topic[1]}</p>
          </div>
        </div>
      }
      <div className='justify-center mt-8 items-center container mx-auto' >
      <h1 className='font-bold p-4 text-center text-[32px]' >Speech-To-Text Translation</h1>
      <p> <Typewriter options={{
    strings: speech,
    autoStart: true,
    loop: true,
    deleteSpeed:10,
    delay:50
  }}/></p>
      </div>
      <div className='justify-center mt-8 items-center container mx-auto' >
      <h1 className='font-bold p-4 text-center text-[32px]' >Speaker Diarization & Timestamp - {speaker}</h1>
      <p>{transcribe}</p>
      </div>
    </div>
  )
}


export default Details;