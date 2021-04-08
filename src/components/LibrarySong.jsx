import React from 'react';

const LibrarySong = ({songs,song,setCurrentSong,audioRef,isPlaying,setSong}) => {

    const currentSongHandler=async()=>{

        await setCurrentSong(song);
        //add active state
        const newSong = songs.map((item)=>{
            if(item.id===song.id){
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
        
        if(isPlaying) audioRef.current.play();
    }

    return ( 
        <div onClick={currentSongHandler} className={`library-song ${song.active?"selected":""}`}>
            <img src={song.cover} alt="albumb"/>
            <div className="discription">
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
            </div>
        </div>
     );
}
 
export default LibrarySong;