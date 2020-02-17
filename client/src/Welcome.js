import React, { useState, useEffect } from 'react';
import { Grid, Header, Image } from 'semantic-ui-react'
import userIcon from './user.png'

function fetchData() {
    return fetch('http://localhost:8000/users')
        .then((response) => {
            return response.json();
        })
}

export default function Welcome() {
    const [users, setUser] = useState([])
    useEffect(() => {
        fetchData().then(resp => {
            console.log(resp)
            setUser(resp)
        })
    }, [])

    return (
        <Grid textAlign='center' style={{ height: '50vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h2' color='teal' textAlign='center'>
                    <Image src={userIcon} /> Users List
                 </Header>
                {users.map((user) => <li>{user.fullname}</li>)}
            </Grid.Column>
        </Grid>
    )
}