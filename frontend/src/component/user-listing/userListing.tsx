import React, { Component } from 'react';
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  Button,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Modal,
} from '@material-ui/core';
import Axios from 'axios';

interface IProps {
  data: any[];
  fetchDataFromBackend: any;
}

interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
}

class userListing extends Component<IProps> {
  state = {
    modalOpen: false,
    name: '',
    email: '',
    password: '',
  };

  handleOpenModal = (name: string, email: string, password: string) => {
    this.setState({ modalOpen: true, name, email, password });
  };
  handleCloseModal = () => this.setState({ modalOpen: false });

  handleDeleteUser = async (id: string) => {
    await Axios.delete(`http://localhost:8080/delete/${id}`);
    this.props.fetchDataFromBackend();
  };

  handleOnChange = (event: any) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleUpdateUser = async (id: string) => {
    const myData = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
    };

    await Axios.put(`http://localhost:8080/update/${id}`, myData);

    this.setState({ name: '', email: '', password: '' });

    this.handleCloseModal();
    this.props.fetchDataFromBackend();
  };

  render() {
    return (
      <TableContainer component={Paper}>
        <Table aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align='right'>Name</TableCell>
              <TableCell align='right'>Email</TableCell>
              <TableCell align='right'>Password</TableCell>
              <TableCell align='right'>Update</TableCell>
              <TableCell align='right'>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.data &&
              this.props.data.map((value: IUser) => (
                <TableRow key={value._id}>
                  <TableCell component='th' scope='row'>
                    {value._id}
                  </TableCell>
                  <TableCell align='right'>{value.name}</TableCell>
                  <TableCell align='right'>{value.email}</TableCell>
                  <TableCell align='right'>{value.password}</TableCell>
                  <TableCell align='right'>
                    <Button
                      onClick={() =>
                        this.handleOpenModal(
                          value.name,
                          value.email,
                          value.password
                        )
                      }
                      color='primary'
                      variant='contained'
                    >
                      Update
                    </Button>
                  </TableCell>
                  <TableCell align='right'>
                    <Button
                      onClick={() => this.handleDeleteUser(value._id)}
                      color='secondary'
                      variant='contained'
                    >
                      Delete
                    </Button>
                  </TableCell>
                  <Modal
                    open={this.state.modalOpen}
                    onClose={this.handleCloseModal}
                  >
                    <div className='modal'>
                      <FormControl className='form'>
                        <InputLabel htmlFor='my-email'>
                          Email address
                        </InputLabel>
                        <Input
                          onChange={this.handleOnChange}
                          value={this.state.email}
                          id='my-email'
                          name='email'
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
                          name='name'
                          value={this.state.name}
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
                        <div className='button-container'>
                          <Button
                            onClick={() => this.handleUpdateUser(value._id)}
                            size='medium'
                            color='primary'
                            variant='contained'
                          >
                            Update Details
                          </Button>
                          <Button
                            onClick={this.handleCloseModal}
                            size='medium'
                            color='secondary'
                            variant='contained'
                          >
                            Close Modal
                          </Button>
                        </div>
                      </FormControl>
                    </div>
                  </Modal>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}

export default userListing;
