import React , { Component } from 'react';
import './App.scss';

class header extends Component {
    render() {
      return (<>
        {this.props.isAuth? <header className="App-header header-bg"></header>
        :''}
    </>)
    }
  }
  export default header;