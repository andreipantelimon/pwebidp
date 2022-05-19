import React, { useEffect } from 'react'
import { accommodationService } from '../services/accommodation.service';
import AccomodationCard from './AccommodationCard';
import HostNavigation from './HostNavigation';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import EditAccommodationModal from './EditAccommodationModal';
import { createTheme } from '@mui/material/styles'

const HostDashboard = (props) => {
    const [accomodations, setAccommodations] = React.useState([])
    const [accommodationOpen, setAccommodationOpen] = React.useState(-1);

    useEffect(() => {
        accommodationService.getActiveAccommodations()
            .then((response) => { return response.json() })
            .then((accomodations) => {
                console.log(accomodations)
                setAccommodations(accomodations)
            })
            .catch(error => {
                console.log(error)
            })
        // eslint-disable-next-line
    }, [])

    const greenTheme = createTheme({
        palette: {
            primary: {
                main: '#ffdb57'
            }
        },
    });

    const whiteTheme = createTheme({
        palette: {
            primary: {
                main: '#FFFFFF'
            }
        },
    });

    const [activeButtonTheme, setActiveButtonTheme] = React.useState(greenTheme)
    const [pastButtonTheme, setPastButtonTheme] = React.useState(whiteTheme)

    const togglePast = () => {
        accommodationService.getPastAccommodations()
            .then((response) => { return response.json() })
            .then((accomodations) => {
                console.log(accomodations)
                setAccommodations(accomodations)
                setActiveButtonTheme(whiteTheme)
                setPastButtonTheme(greenTheme)
            })
            .catch(error => {
                console.log(error)
            })
    }

    const toggleActive = () => {
        accommodationService.getActiveAccommodations()
            .then((response) => { return response.json() })
            .then((accomodations) => {
                console.log(accomodations)
                setAccommodations(accomodations)
                setActiveButtonTheme(greenTheme)
                setPastButtonTheme(whiteTheme)
            })
            .catch(error => {
                console.log(error)
            })
    }

    const handleAccommodationClose = () => setAccommodationOpen(-1);

    return (
        <div>
            <HostNavigation
                user={props.user}
                toggleActive={toggleActive}
                togglePast={togglePast}
                activeButtonTheme={activeButtonTheme}
                pastButtonTheme={pastButtonTheme}
            />
            <Box sx={{ width: '97%', ml: 3, mr: 3 }}>
                <Grid
                    container
                    spacing={8}
                    sx={{ mt: 1, mb: 4 }}
                    justifyContent="flex-start"
                    alignItems="flex-start"
                >
                    {accomodations.map(item => (
                        <Grid key={item.id} item xs={3}>
                            <AccomodationCard item={item} handleOpen={() => setAccommodationOpen(item.id)} />
                            <EditAccommodationModal item={item} user={props.user} open={accommodationOpen === item.id} handleClose={handleAccommodationClose} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </div>
    )
}

export default HostDashboard