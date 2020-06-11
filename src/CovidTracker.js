import React,{useEffect,useState} from 'react';
import Cards from './Components/Card/Cards';
import Graph from './Components/Graph/Graph';
import Countries from './Components/Countries/Countries';
import {Typography,Backdrop} from '@material-ui/core';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
const url="https://covid19.mathdro.id/api";
const CovidTracker = () => {
    const[data,setData]=useState({});
    const[country,setCountry]=useState('');
    useEffect(()=>{
        let newURL=`${url}`;
        if(country){
            newURL=`${url}/countries/${country}`;
        }
        axios.get(`${newURL}`)
        .then(res=>{
            setData({
                confirmed:res.data.confirmed,
                recovered:res.data.recovered,
                deaths:res.data.deaths,
                lastUpdate:res.data.lastUpdate
            })
        });
    },[country])
    const handleOnChange=(country)=>{
        setCountry(country);
       // console.log(data);
    }
    const styles={
        fontFamily: "Fredericka the Great, cursive",
        marginTop:"5%",
        textShadow: "1px 1px 1px #000, 3px 3px 5px rgba(0,0,233,0.4)"
    }
    if(!data.confirmed){
        return(
            <div>
                <Backdrop open={!data.confirmed}> 
                    <CircularProgress color="inherit" style={{zIndex:"1",position:"relative"}} />
                </Backdrop>
            </div>
        );
    }
    return ( 
        <div className="main-container">
            <Typography variant="h2" style={styles} gutterBottom>
                COVID-19
            </Typography>
            <Cards data={data}/>
            <Countries handleCountryChange={handleOnChange}/>
            <Graph data={data} country={country}/>
            <FavoriteBorderIcon color="primary"/>
            <Typography variant="h5" style={{fontFamily: "Cormorant Garamond, serif"}}>Stay Home ! Stay Safe!</Typography>
        </div>
     );
}
 
export default CovidTracker;