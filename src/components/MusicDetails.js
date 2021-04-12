import React, { useContext, useState } from 'react';
import  placeholder from '../assets/placeholder.png';

 export const MusicDetails = ({ details }) => {
    function createMarkup() {
        return {__html: details.description};
    }
    return (
        <li className='list-item' >
            <div className='wrapper d-flex'>
                <div className='img-wrap col'>
                    <img src={placeholder} alt='{details.title}' className='img-responsive'/>
                </div>
                <div className='col'>
                    <p className='list-title'> {details.title} </p>
                    <p className='list-info'> {
                        details.supplement_information.map((item) => {
                            return item
                        })} 
                    </p>
                    <p className='list-description' dangerouslySetInnerHTML={createMarkup()} />
                    {
                        details.links.map((item,i) => {
                          return <a href={item['file_url']} key={i} className='list-links'>
                              {
                                item['icon_url']!== '' ? <img src={item['icon_url']} className='icon' /> : ''
                              }
                              {item['text']}</a>
                        })
                    }
                </div>
            </div>
        </li>
    );
}
