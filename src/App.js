import React,{useState,useRef} from 'react';
import './App.css';
import Player from './components/Player';
import Song from './components/Song';
import data from './utils';
import Library from './components/Library'
import Nav from './components/nav';


function App() {
  const [song,setSong] = useState(data());
  const [currentSong,setCurrentSong] = useState(song[0]);
  const [isPlaying,setIsPlaying] = useState(false);
  const [songInfo,setSongInfo] = useState({
    currentTime:0,
    totalDuration:0,
})
const [libraryStatus,setLibraryStatus] = useState(false);
  
  const audioRef=useRef(null)

  const updateTimeHandler = (e)=>{
    const currentTime = e.target.currentTime;
    const totalDuration = e.target.duration;
    setSongInfo({...songInfo,currentTime,totalDuration})
  }

  const autoSkipHandler = async ()=>{
    let index = song.findIndex(item=>item.id===currentSong.id);
        await setCurrentSong(song[(index+1)%song.length]);
        if(isPlaying){
          audioRef.current.play();
        }
  }

  return (
    <div className={`App ${libraryStatus?"library-active":""}`}>
      <Nav 
      libraryStatus={libraryStatus} 
      setLibraryStatus={setLibraryStatus}
      />

      <Song 
      currentSong={currentSong}
      />

      <Player 
      songInfo={songInfo} 
      setSongInfo={setSongInfo} 
      audioRef={audioRef} 
      isPlaying={isPlaying} 
      setIsPlaying={setIsPlaying} 
      currentSong={currentSong}
      setCurrentSong={setCurrentSong}
      songs={song}
      setSong={setSong}
      />

      <Library 
      audioRef={audioRef} 
      setSong={setSong} 
      isPlaying={isPlaying} 
      songs={song} 
      setCurrentSong={setCurrentSong} 
      libraryStatus={libraryStatus}
      />

      <audio 
        onTimeUpdate={updateTimeHandler} 
        onLoadedMetadata = {updateTimeHandler}
        onEnded={autoSkipHandler}
        ref={audioRef} 
        src={currentSong.audio}>
      </audio>
    </div>
  );
}

export default App;
