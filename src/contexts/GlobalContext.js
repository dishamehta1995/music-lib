import React,{useState, useReducer, createContext} from 'react';
import AppReducer from './AppReducer';

const initialState = {
    loading: true,
    list: [],
    error:null,
    foundList: [],
    isSearchActive:false,
    searchCategory: 'all'
} 
export const GlobalContext =  createContext();

export const GlobalProvider = ({children}) => {
    const [state,dispatch] = useReducer(AppReducer, initialState);    
    
    function searchMusic( name ){
        dispatch({
          type: 'SEARCH_MUSIC',
          payload: name
        })
    }
    
    function loadMusic( list ){
        dispatch({
          type: 'LOAD_MUSIC',
          payload: list
        });
    }
    
    function searchCat( list ){
        dispatch({
          type: 'SEARCH_CATEGORY',
          payload: list
        });
    }
    
    return (
        <GlobalContext.Provider value={{
            state: state,
            loadMusic,
            searchMusic,
            searchCat
        }}>
            { children }
        </GlobalContext.Provider>
    )
}

export default GlobalProvider;
