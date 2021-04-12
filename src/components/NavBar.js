import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../contexts/GlobalContext';

export const NavBar = () => {
    const { searchMusic, state, searchCat } = useContext(GlobalContext);

    const category = ['Title', 'Description', 'Keywords'];
    const [isCheck,setIsCheck] = useState([false, false, false]);
    const [selectValue,setSelectValue] = useState([]);
    const [selectAll,setSelectAll] = useState(false);
    const [openOptions,setOpenOptions] = useState(false);

    const selectOption = (event,i) => {
        let toggleChange = [...isCheck]
        toggleChange[i] = !isCheck[i]
        setIsCheck(toggleChange)
        
        let updateOptions = selectValue;
        if(event.target.checked && !updateOptions.includes(event.target.name)){
            setSelectValue([...updateOptions,event.target.name])
            if(selectValue.length === (category.length - 1)){
                setSelectAll(true)
            }
        }else{
            setSelectValue(updateOptions.filter(updateOptions => updateOptions !== event.target.name))
            setSelectAll(false)
        }
    }
    const hangleSelectAll = (event) => {
        setSelectAll(!selectAll);
        !selectAll ? setSelectValue(category) : setSelectValue([])
        !selectAll ? setIsCheck([true, true, true]) : setIsCheck([false, false, false])
    }
    const handleSearchMusic = (e) => {
        if(e.which === 32 || e.which === 13){
            searchCat(selectValue);
            let word = e.target.value.split(" ")
            searchMusic(word)
        }
    }
    
    return (
        <div className='navbar'>
            <h1 className='title'>Music Library</h1>       
            <div className='d-flex align-center'>
                <div className='col'>
                <input
                    type='text'
                    value={selectValue}
                    className='form-control search-input'
                    placeholder='select category'
                    readOnly
                    onClick={(e) => setOpenOptions(!openOptions)}
                />
                <div className={openOptions ? 'show menu ' : 'hide menu'}>
                    <div className='input-wrap'>
                        <input 
                            type='checkbox' 
                            name='all'
                            className={selectAll ? 'checked ' :''}
                            checked = {selectAll}
                            onChange={(e) => hangleSelectAll()}
                        />
                        <label htmlFor='all'>All</label>
                    </div>
                    {
                        category.map((list,i) => { 
                            return <div key={i} className='input-wrap'>
                                <input 
                                    type='checkbox' 
                                    name={list}
                                    checked = {isCheck[i]}
                                    onChange ={(e) => selectOption(e,i)}
                                />
                            
                                <label htmlFor={list}>{list}</label>
                                </div> 
                        })
                    }
                </div>
                </div>
                <div className='search-bar col'>
                    <input
                        type='text'
                        className='form-control search-input'
                        placeholder='Search Music'
                        onClick={(e) => setOpenOptions(false)}
                        onKeyPress={handleSearchMusic}
                        required />
                </div>
          </div>
        </div>
    )
}
