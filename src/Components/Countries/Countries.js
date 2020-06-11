import React,{useState,useEffect} from 'react';
import axios from 'axios';
import {NativeSelect,FormControl} from '@material-ui/core';
import styles from './Countries.module.css'
const url="https://covid19.mathdro.id/api";

const Countries = ({handleCountryChange}) => {
    const[country,setCountry]=useState([]);
    useEffect(()=>{
        axios.get(`${url}/countries`)
        .then(res=>{
            const{data:{countries}} = res;
            const modified=countries.map((country)=>country.name)
            setCountry(modified);         
        })
    },[setCountry])
    return (  
        <div className={styles.container}>
            <FormControl>
                <NativeSelect disableUnderline  className={styles.native_select} onChange={(e)=>handleCountryChange(e.target.value)}>
                    <option value="">Global</option>
                    {country.map((names,i)=>(
                        <option key ={i} value={names}>{names}</option>
                    ))}
                </NativeSelect>
            </FormControl>
        </div>
    );
}
 
export default Countries;