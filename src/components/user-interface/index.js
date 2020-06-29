import React from 'react';

import axios from 'axios';

export default class PersonList extends React.Component {
  state = {
    users: []
  }

  componentDidMount() {
    axios.get(`https://jsonplaceholder.typicode.com/users`)
      .then(res => {
        const users = res.data;
        this.setState({ users });
      })
  }

  render() {
      this.state.users.map((data) => console.log(data))
    return (
      <ul>
        { this.state.users.map((data) => data.id)}
      </ul>
    )
  }
}