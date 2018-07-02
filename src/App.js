import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import Main from './components/Main';
import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';


const styles = {
  center_style: {
    height: '50px',
    width: '600px',
    margin: 'auto',
    marginTop: '5%',
  },
  h1_style: {
    color: 'white',
    textAlign : 'center',
    fontFamily: 'Verdana',
    fontSize: '60px'
  },
}

// alert configuration
const options = {
  position: 'bottom center',
  timeout: 5000,
  offset: '30px',
  transition: 'scale'
}


class App extends Component {
  render() {
    return (
      <div style={styles.center_style}>
        <Helmet>
            <style>{'body { background-color:#0099ff }'}</style>
        </Helmet>
        <h1 style={styles.h1_style}>Clutch it</h1>
        <AlertProvider template={AlertTemplate} {...options}>
          <Main />
        </AlertProvider>
      </div>
    );
  }
}

export default App;
