import React from 'react';
import LibrarySong from './LibrarySong';

const Library = ({songs,setCurrentSong,audioRef,isPlaying,setSong,libraryStatus}) => {
    return ( 
        <div className={`library ${libraryStatus ? "active-library" : " "}`}>
            <h2>Library</h2>
            <div className="library-container">
                {songs.map(song=><LibrarySong songs={songs} setSong={setSong} audioRef={audioRef} isPlaying={isPlaying} song={song} key={song.id} setCurrentSong={setCurrentSong}/>)}
            </div>
        </div>
     );
}
 
export default Library;