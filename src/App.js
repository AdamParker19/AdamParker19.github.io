import React, { useState } from 'react';

import './App.scss';
import { useHistory } from 'react-router-dom';
import LoginForm from './LoginForm';


function App() {
  const history = useHistory();




  if (localStorage.getItem('token') != null) {
    history.push('/dashboard');
  }




  return (
    <div className="App">
      <title>App</title>
      <header className="App-header">

        <LoginForm />
      </header>
    </div>

  );


}

export default App;
