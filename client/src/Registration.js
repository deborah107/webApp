import { Button, Form, Grid, Header, Image, Segment } from 'semantic-ui-react'
import Logo from './react-logo.png'
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class Registration extends Component {
  constructor() {
    super();
    this.state = {
      fullname: '',
      email: '',
      password: ''
    };

    this.handleFullnameChange = this.handleFullnameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleFullnameChange(event) {
    this.setState({ fullname: event.target.value });
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch('http://localhost:8000/users', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "fullname": this.state.fullname,
        "email": this.state.email,
        "password": this.state.password
      })
    });
  }

  render() {
    return (
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='teal' textAlign='center'>
            <Image src={Logo} /> Register your account
          </Header>
          <Form size='large' onSubmit={this.handleSubmit}>
            <Segment stacked>
              <Form.Input
                fluid icon='user'
                iconPosition='left'
                placeholder='Fullname'
                value={this.state.fullname}
                onChange={this.handleFullnameChange}
              />
              <Form.Input
                fluid icon='envelope'
                iconPosition='left'
                placeholder='E-mail address'
                value={this.state.email}
                onChange={this.handleEmailChange}
              />
              <Form.Input
                fluid icon='lock'
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
                Register
              </Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}

export default withRouter(Registration);