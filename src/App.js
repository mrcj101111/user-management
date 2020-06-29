import React from 'react';
import './App.scss';
import PersonList from './components/user-interface/index'

function App() {
  return (
    <div className="App">
      <h1>User Management</h1>
      <PersonList />
    </div>
  );
}

export default App;
