import React, { useEffect } from 'react'

import RefugeeNavigation from './RefugeeNavigation';
import { accommodationService } from '../services/accommodation.service';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import RefugeeAccomodationCard from './RefugeeAccommodationCard';
import RefugeeModal from './RefugeeModal';

const RefugeeDashboard = (props) => {
    const [accomodations, setAccommodations] = React.useState([])
    const [city, setCity] = React.useState("")
    const [people, setPeople] = React.useState(-1)
    // const [days, setDays] = React.useState(-1)
    const [alone, setAlone] = React.useState(false)
    const [dateFrom, setDateFrom] = React.useState("")
    const [dateTo, setDateTo] = React.useState("")
    const [accommodationOpen, setAccommodationOpen] = React.useState(-1);

    var _ = require('lodash');

    const handleCityChange = (e) => {
        setCity(e.target.value)
    }
    const handlePeopleChange = (e) => {
        setPeople(e.target.value)
    }

    const handleAloneChange = () => {
        setAlone(!alone)
    }

    function handleDateFromChange(date) {
        setDateFrom(date)
    }

    function handleDateToChange(date) {
        setDateTo(date)
    }

    const handleFilter = () => {
        console.log(city, people, dateFrom, dateTo, alone)
        accommodationService.getAllAccommodations(city, people, dateFrom, dateTo, alone)
            .then((response) => { return response.json() })
            .then((accomodations) => {
                console.log(accomodations)
                setAccommodations(accomodations)
            })
            .catch(error => {
                console.log(error)
            })
    }

    const myAccomodations = () => {
        const myAccomodations = accomodations.filter(acc => {
            return acc.accommodation.guests.find(user => _.isEqual(user, props.user)) !== undefined
        })
        setAccommodations(myAccomodations)
    }

    useEffect(() => {
        accommodationService.getAllAccommodations()
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

    const handleAccommodationClose = () => setAccommodationOpen(-1);

    return (
        <div>
            <RefugeeNavigation
                user={props.user}
                handleCityChange={handleCityChange}
                handlePeopleChange={handlePeopleChange}
                handleAloneChange={handleAloneChange}
                handleDateFromChange={handleDateFromChange}
                handleDateToChange={handleDateToChange}
                handleFilter={handleFilter}
                dateFrom={dateFrom}
                dateTo={dateTo}
                myAccomodations={myAccomodations}
            />
            <Box sx={{ width: '100%', pl: 50, pr: 3, mt: 5 }}>
                <Grid
                    container
                    spacing={8}
                    sx={{ mt: 1, mb: 4 }}
                    justifyContent="flex-start"
                    alignItems="flex-start"
                >
                    {accomodations.map(item => (
                        <Grid key={item.id} item xs={4}>
                            <RefugeeAccomodationCard item={item} handleOpen={() => setAccommodationOpen(item.id)} />
                            <RefugeeModal item={item} user={props.user} open={accommodationOpen === item.id} handleClose={handleAccommodationClose} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </div>
    )
}

export default RefugeeDashboard
