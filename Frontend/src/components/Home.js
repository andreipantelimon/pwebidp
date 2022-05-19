import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { userService } from '../services/user.service';
import ReactLoading from 'react-loading';

import HostDashboard from "./HostDashboard"
import RefugeeDashboard from "./RefugeeDashboard"

export default function Home() {
    let navigate = useNavigate();

    const [type, setType] = useState("");
    const [user, setUser] = useState(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        let authToken = sessionStorage.getItem('Auth Token')
        console.log(authToken)
        if (authToken) {
            navigate('/')
        }

        if (!authToken) {
            navigate('/login')
        }

        userService.getMe()
            .then(response => {
                if (response.status === 403) {
                    throw new Error("Unauthorized!")
                }
                return response.json();
            })
            .then((user) => {
                console.log(user);
                setType(user.userRole)
                setUser(user)
                setLoading(false);
            })
            .catch(error => {
                sessionStorage.removeItem('Auth Token')
            })
        // eslint-disable-next-line
    }, [])


    if (isLoading) {
        return <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
            minHeight: '700px'
        }}>
            <ReactLoading type="spin" color="#1976d2" height={'4%'} width={'4%'} />
        </div >;
    }
    if (type === "HOST") {
        return (
            <HostDashboard user={user} />
        )
    } else {
        return (
            <RefugeeDashboard user={user} />
        )
    }
}