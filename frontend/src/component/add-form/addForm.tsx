import React, { Component } from 'react';
import {
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Button,
} from '@material-ui/core';
import Axios from 'axios';

interface IProps {
  fetchDataFromBackend: any;
}

class AddForm extends Component<IProps> {
  state = {
    email: '',
    name: '',
    password: '',
  };

  handleOnChange = (event: any) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleAddNewUser = async () => {
    const myData = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
    };

    await Axios.post('http://localhost:8080/add', myData);

    this.setState({ name: '', email: '', password: '' });

    this.props.fetchDataFromBackend();
  };

  render() {
    return (
      <React.Fragment>
        <FormControl className='form'>
          <InputLabel htmlFor='my-email'>Email address</InputLabel>
          <Input
            onChange={this.handleOnChange}
            id='my-email'
            name='email'
            value={this.state.email}
            required
            aria-describedby='my-helper-text'
          />
          <FormHelperText id='my-helper-text'>
            We'll never share your email.
          </FormHelperText>
        </FormControl>
        <FormControl className='form'>
          <InputLabel htmlFor='my-name'>Name</InputLabel>
          <Input
            required
            value={this.state.name}
            name='name'
            onChange={this.handleOnChange}
            id='my-name'
          />
        </FormControl>
        <FormControl className='form'>
          <InputLabel htmlFor='my-password'>Password</InputLabel>
          <Input
            required
            name='password'
            value={this.state.password}
            onChange={this.handleOnChange}
            id='my-password'
            type='password'
          />
        </FormControl>
        <FormControl className='form'>
          <Button
            onClick={this.handleAddNewUser}
            size='medium'
            color='primary'
            variant='contained'
          >
            Add Form
          </Button>
        </FormControl>
      </React.Fragment>
    );
  }
}

export default AddForm;
