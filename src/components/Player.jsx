import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlay,faAngleRight,faAngleLeft, faPause} from "@fortawesome/free-solid-svg-icons"

const Player = ({
        songs,
        setSong,
        currentSong,
        setCurrentSong,
        isPlaying,
        setIsPlaying,
        audioRef,
        songInfo,
        setSongInfo
    }) => {
    //state

    const activeLibraryUpdate = (nextprev) =>{
        const newSong = songs.map((item)=>{
            if(item.id===nextprev.id){
                return{
                    ...item,
                    active:true,
                };
            }else{
                return{
                    ...item,
                    active:false
                };
            }
        });

        setSong(newSong)
    }
    //useRef
    //const audioRef=useRef(null)


    const playSongHandler=()=>{
        if(isPlaying){
            audioRef.current.pause();
            setIsPlaying(!isPlaying);
        }else{
            audioRef.current.play();
            setIsPlaying(!isPlaying);
        }
    }


    const getTime=(time)=>{
        return(
            Math.floor(time/60) + ":" + ("0"+Math.floor(time%60)).slice(-2)
        )    
    }

    const handleDrag=(e)=>{
        audioRef.current.currentTime = e.target.value; 
        setSongInfo({...songInfo,currentTime:e.target.value})
    }

    const handleSkipSong=async(direction)=>{
       let index = songs.findIndex(song=>song.id===currentSong.id);
       if(direction==="forward"){
           await setCurrentSong(songs[(index+1)%songs.length]);
           activeLibraryUpdate(songs[(index+1)%songs.length])

       }if(direction==="backward"){
           if((index-1)%songs.length === -1){
               await setCurrentSong(songs[songs.length-1])
               activeLibraryUpdate(songs[songs.length-1])
               if(isPlaying) audioRef.current.play()
               return;
           }
        await setCurrentSong(songs[(index-1)%songs.length])
        activeLibraryUpdate(songs[(index-1)%songs.length])
       }
       if(isPlaying) audioRef.current.play();
    }


    return ( 
        <div className="player">
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                <input 
                min={0} 
                max={songInfo.totalDuration || 0} 
                value={songInfo.currentTime} 
                onChange={handleDrag}
                type="range"/>
                <p>{songInfo.totalDuration?getTime(songInfo.totalDuration):"0:00"}</p>
            </div>
            <div className="btn-control">
            <FontAwesomeIcon 
             onClick={()=>handleSkipSong("backward")}
            className="skip-backward" 
            size="2x"
            icon={faAngleLeft}/>
            <FontAwesomeIcon 
            onClick={playSongHandler} 
            className="play" 
            size="2x" 
            icon={isPlaying?faPause:faPlay}/>
            <FontAwesomeIcon 
            onClick={()=>handleSkipSong("forward")}
            className="skip-forward" 
            size="2x" 
            icon={faAngleRight}/>
            </div>
            
        </div>
     );
}
 
export default Player;