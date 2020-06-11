import React,{useState,useEffect} from 'react';
import axios from 'axios';
import {Card} from '@material-ui/core';
import {Line,Bar} from 'react-chartjs-2';
import style from './Graph.module.css';
const url="https://covid19.mathdro.id/api";
const Graph = ({data:{confirmed,recovered,deaths},country}) => {
    const [dailyData,setDailyData]=useState([]);
    useEffect(()=>{
        axios.get(`${url}/daily`)
        .then(res=>{
            const{data}=res;
            //console.log(typeof data);
            const modified=data.map((daily)=>({
                confirmed:daily.confirmed.total,
                deaths:daily.deaths.total,
                date:daily.reportDate
            }))
            setDailyData(modified);
        })
        .catch(err=>console.log(err));
    },[])
    const barChart=(
        confirmed?
        (
         <Bar
            data={{
                labels:['Iotal','Recovered','Deaths'],
                datasets:[{
                    label:'People',
                    backgroundColor:[
                        'rgba(0,255,0,0.5)',
                        'rgba(0,0,255,0.5)',
                        'rgba(255,0,0,0.5)'
                    ],
                    data:[confirmed.value,recovered.value,deaths.value]
                }]
            }}
            options={{
                legend:{display:false},
                title:{display:true,text:`Current stats in ${country}`},
            }}
         />   
        ):null
    )
    const LineChart=( //line chart function which will just return the basic html code . Did'nt use the "return()" . 
        dailyData.length?
         ( 
           <Line
            data={{
                labels:dailyData.map(({date})=>date),
                datasets:[{
                    data:dailyData.map(({confirmed})=>confirmed),
                    label:'Confirmed',
                    borderColor:'#333fff',
                    fill:true
                },{
                    data:dailyData.map(({deaths})=>deaths),
                    label:'Deaths',
                    borderColor:'red',
                    backgroundColor:'rgba(255,0,0,0.1)',
                    fill:true
                }]
            }}
            />
            ):''
    );
    return (  
        <Card raised={true} className={style.cardGraph}>
            <div className={style.container}>
                {country?barChart:LineChart}
            </div>
        </Card>
    );
}
 
export default Graph;