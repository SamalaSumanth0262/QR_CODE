import React from 'react';
import { hot } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import store from './store';
import MainContainer from './containers/MainContainer';
import './GlobalStyle.scss';
class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <MainContainer />
        <ToastContainer draggable={true} pauseOnHover={true} position={toast.POSITION.BOTTOM_LEFT} />
      </Provider>
    );
  }
}

export default hot(module)(App);
