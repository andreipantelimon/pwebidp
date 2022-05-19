import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import "../styles.css";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    typography: {
        h6: {
            fontSize: 18,
            fontWeight: 400
        },
        h7: {
            fontSize: 14,
        },
        h3: {
            fontSize: 50,
            fontWeight: 200
        }
    },
});

const buttonTheme = createTheme({
    palette: {
        primary: {
            main: '#ffdb57'
        }
    },
});

const RefugeeAccomodationCard = (props) => {
    return (
        <div style={{
            textAlign: 'left'
        }}>
            <ThemeProvider theme={theme}>
                <Card sx={{ maxWidth: 500 }}>
                    <CardMedia
                        component="img"
                        alt="img"
                        height="200"
                        image={props.item.accommodation.images[0]?.content !== undefined ? props.item.accommodation.images[0].content : 'https://i.imgur.com/znHeBZx.png'}
                    />
                    <CardContent>
                        <Grid container
                            style={{ height: '355px' }}
                            rowSpacing={1}
                        >
                            <Grid item xs={12}>
                                <Typography variant="h7">
                                    Host
                                </Typography>
                                <Typography variant="h6">
                                    {props.item.createdBy.fullName}
                                </Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <Typography variant="h7">
                                    From
                                </Typography>
                                <Typography variant="h6">
                                    {props.item.accommodation.startDate}
                                </Typography>
                            </Grid>
                            <Grid item xs={1} >
                                <Typography variant="h3">
                                    -
                                </Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <Typography variant="h7">
                                    To
                                </Typography>
                                <Typography variant="h6">
                                    {props.item.accommodation.endDate}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h7">
                                    Address
                                </Typography>
                                <Typography sx={{
                                    display: '-webkit-box',
                                    overflow: 'hidden',
                                    WebkitBoxOrient: 'vertical',
                                    WebkitLineClamp: 2,
                                }} variant="h6">
                                    {props.item.accommodation.address}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h7">
                                    Availability
                                </Typography>
                                <Typography variant="h6">
                                    Available: {props.item.accommodation.maxPeople - props.item.accommodation.currentPeople} / {props.item.accommodation.maxPeople}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h7">
                                    Description
                                </Typography>
                                <Typography sx={{
                                    display: '-webkit-box',
                                    overflow: 'hidden',
                                    WebkitBoxOrient: 'vertical',
                                    WebkitLineClamp: 2,
                                }} variant="h6">
                                    {props.item.accommodation.description}
                                </Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                    <CardActions sx={{ justifyContent: 'center' }}>
                        <ThemeProvider theme={buttonTheme}>
                            <Button
                                sx={{ mb: 2 }}
                                variant="contained"
                                className='card-button'
                                onClick={props.handleOpen}
                                size="small"
                            >Read More
                            </Button>
                        </ThemeProvider>
                    </CardActions>
                </Card>
            </ThemeProvider>
        </div >
    );
}

export default RefugeeAccomodationCard