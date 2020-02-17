import React from "react";
import { Link } from "react-router-dom"
import { Button, Grid} from 'semantic-ui-react'

function Home() {
    return (
                <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                    <Grid.Column style={{maxWidth: 450}}>
                    <Link to="/login">
                        <Button 
                        color='teal'
                        fluid
                        size='large'>
                            Login
                        </Button>
                        </Link>
                    </Grid.Column>
            </Grid>
    );
}

    
    export default Home;