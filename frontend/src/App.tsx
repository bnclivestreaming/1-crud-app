import React, { Component } from 'react';
import './App.css';
import { FormComponent, UserListing } from './component';
import { Typography } from '@material-ui/core';
import Axios from 'axios';

class App extends Component {
  state = {
    usersData: [],
  };

  componentDidMount() {
    this.fetchDataFromBackend();
  }

  fetchDataFromBackend = async () => {
    const { data } = await Axios.get('http://localhost:8080/');
    const usersData = data.data;
    this.setState({ usersData });
  };

  render() {
    return (
      <div className='app'>
        <div className='form-container'>
          <Typography variant='h4'>Add new User</Typography>
          <FormComponent fetchDataFromBackend={this.fetchDataFromBackend} />
        </div>
        <div className='listing-container'>
          <UserListing
            data={this.state.usersData}
            fetchDataFromBackend={this.fetchDataFromBackend}
          />
        </div>
      </div>
    );
  }
}

export default App;
