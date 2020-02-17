import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import Logo from './react-logo.png'
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errorPassword: false
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault()
    fetch('http://localhost:8000/login', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "email": this.state.email,
        "password": this.state.password
      })
    })
      .then((response) => {
        console.log(response)
        if (response.ok) {
          this.props.history.push('/Welcome');
        } else {
          this.setState(state => ({
            errorPassword: true
          }))
        }
      })
  }
  render() {
    return (
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='teal' textAlign='center'>
            <Image src={Logo} /> Log-in to your account
          </Header>
          {this.state.errorPassword &&
            <Message negative>
              <Message.Header>Invalid Password</Message.Header>
            </Message>}
          <Form size='large' onSubmit={this.handleSubmit}>
            <Segment stacked>
              {/* <div>Email : keke</div> */}
              {/* <div>Password : keke123</div> */}
              <Form.Input
                fluid icon='user'
                iconPosition='left'
                placeholder='E-mail address'
                value={this.state.email}
                onChange={this.handleEmailChange}
              />
              <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Password'
                type='password'
                value={this.state.password}
                onChange={this.handlePasswordChange}
              />
              <Button
                color='teal'
                fluid
                size='large'>
                Login
              </Button>
            </Segment>
          </Form>
          <Message>
            New to us? <a href='/registration'>Sign Up</a>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

export default withRouter(Login);