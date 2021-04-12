import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../contexts/GlobalContext';
import { MusicDetails } from './MusicDetails';

export const MusicList = () => {
    const { state, loadMusic } = useContext(GlobalContext);
    const currentList = state.isSearchActive ? state.foundList : state.list
    useEffect(() => {
        const fetchList = async () => {
            const res = await fetch(`https://dishamehta1995.github.io/dummydata/music.json`);
            const data = await res.json();
            loadMusic(data.sections[0].assets);
        }
        fetchList();
    },[])

    if(state.loading){
        return (<p className='description'>...loading</p>)
    }
    return (currentList.length ? (
                    <div>
                        <ul className='list'>{
                            currentList.map((music,i) => {
                                return ( <MusicDetails details={music} key={i} />)
                            })
                        }</ul>
                    </div>
            ) : ( <p className='description'>No musics found!</p> )
        )
}
