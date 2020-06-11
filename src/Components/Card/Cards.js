import React from 'react';
import {Card,CardContent,Typography,Grid,Backdrop} from '@material-ui/core'
import style from './Cards.module.css'
import CountUp from 'react-countup'
import cx from 'classnames'
import CircularProgress from '@material-ui/core/CircularProgress';
const Cards = ({data:{confirmed,recovered,deaths,lastUpdate}}) => {
    const date=new Date(lastUpdate).toDateString();
    const time=new Date(lastUpdate).toLocaleTimeString();
    if(!confirmed){
        return(
            ''
        );
    }
    return ( 
        <div className={style.container}>
            <Grid container spacing={3} justify="center">
                <Grid item component={Card} xs={10} md={3} className={cx(style.card,style.infected)}>
                    <CardContent variant="outlined">
                        <Typography color="textSecondary" gutterBottom>Total</Typography>
                        <Typography variant="h4">
                            <CountUp
                            start={0} 
                            end={confirmed.value}
                            duration={1.0}
                            separator=","
                            />
                        </Typography>
                        <Typography color="textSecondary">{date}</Typography>
                        <Typography variant="body2">Number of total cases</Typography> 
                    </CardContent>     
                </Grid>
                <Grid item component={Card} xs={10} md={3} className={cx(style.card,style.recovered)}>
                    <CardContent variant="outlined">
                        <Typography color="textSecondary" gutterBottom>Recoverd</Typography>
                        <Typography variant="h4">
                            <CountUp
                                start={0} 
                                end={recovered.value}
                                duration={1.0}
                                separator=","
                                />
                        </Typography>
                        <Typography color="textSecondary">{date}</Typography>
                        <Typography variant="body2">Number of Recoverd cases</Typography> 
                    </CardContent>     
                </Grid> 
                <Grid item component={Card} xs={10} md={3} className={cx(style.card,style.deaths)}>
                    <CardContent variant="outlined">
                        <Typography color="textSecondary" gutterBottom>Deaths</Typography>
                        <Typography variant="h4">
                            <CountUp
                                start={0} 
                                end={deaths.value}
                                duration={1.0}
                                separator=","
                                />
                        </Typography>
                        <Typography color="textSecondary">{date}</Typography>
                        <Typography variant="body2">Number of deaths cases</Typography> 
                    </CardContent>     
                </Grid>  
            </Grid>
            <Typography style={{position:"relative",margin:"20px",textAlign:"center"}} variant="h6" color="textPrimary">Last Updated: {time}</Typography>
        </div>
     );
}
 
export default Cards;