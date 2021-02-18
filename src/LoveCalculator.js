import React, { useState } from 'react';
import { Grid, TextField, Button, Typography, makeStyles } from '@material-ui/core'
import axios from 'axios';

const LoveCalculator = () => {
    const { marginTop } = useStyle();
    const [name, setName] = useState({
        yourName: '',
        yourPartnerName: ''
    });
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = ({ target }) => {
        const { name, value } = target;
        setName(oldState => ({ ...oldState, [name]: value }));
    };

    const options = {
        headers: {
            'x-rapidapi-key': '6da530e0e0msh3222c5642047dafp17285cjsn05d7d0cec8a6',
            'x-rapidapi-host': 'love-calculator.p.rapidapi.com'
        }
    };

    const handleSubmit = () => {
        const { yourName, yourPartnerName } = name;
        setIsLoading(true);
        axios.get(`https://love-calculator.p.rapidapi.com/getPercentage?fname=${yourName}&sname=${yourPartnerName}`, options)
            .then(res => setData(res.data))
            .catch(error => console.log(error))
            .finally(setIsLoading(false));
    };
    return (
        <div className={marginTop}>
            <Grid container alignItems='center' justify='center' direction='column' spacing={2}>
                <Grid item>
                    <Typography variant='h3' color='error'>Love Calculator!</Typography>
                </Grid>
                <Grid item >
                    <TextField name='yourName' label="Enter Your Name" variant='outlined' size='small' onChange={handleChange} />
                </Grid>
                <Grid item>
                    <TextField name='yourPartnerName' label="Enter Your Love Name" variant='outlined' size='small' onChange={handleChange} />
                </Grid>
                <Grid item>
                    <Button name='percentage' color='primary' disabled={isLoading} variant='contained' onClick={handleSubmit} >
                        Calculate percentage
                    </Button>
                </Grid>
                {data && <>
                    <Typography variant='h4'>{data.percentage}{`%`}</Typography>
                    <Typography variant='h4'>{data.result}</Typography>
                </>}
            </Grid>
        </div>
    );

};

const useStyle = makeStyles((theme) => ({
    marginTop: {
        marginTop: theme.spacing(10),
    },
}));

export default LoveCalculator;