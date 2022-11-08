import PropTypes from 'prop-types';
import React from 'react';
import Loading from './Loading';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  state = {
    isNameValid: false,
    loginNameInput: '',
    isLoading: false,
  };

  handleDisableButton = () => {
    const { loginNameInput } = this.state;
    const min = 3;
    const isLoginValid = loginNameInput.length >= min;
    this.setState({ isNameValid: isLoginValid });
  };

  onInputChangeInput = (event) => {
    const { value } = event.target;
    this.setState({
      loginNameInput: value,
    }, this.handleDisableButton);
  };

  handleFetch = () => {
    const { loginNameInput } = this.state;
    this.setState({ isLoading: true });
    createUser({ name: loginNameInput }).then(this.setState({ isLoading: false }));
  };

  handleLogin = async (e) => {
    e.preventDefault();
    const { history } = this.props;
    this.handleFetch();
    history.push('/search');
  };

  render() {
    const { isNameValid, loginNameInput, isLoading } = this.state;
    const loginPage = (
      <form action="" method="get">
        <label htmlFor="loginNameInput">
          <input
            data-testid="login-name-input"
            type="text"
            name="loginNameInput"
            value={ loginNameInput }
            onChange={ this.onInputChangeInput }
          />
        </label>
        <button
          data-testid="login-submit-button"
          disabled={ !isNameValid }
          type="submit"
          onClick={ this.handleLogin }
        >
          Entrar
        </button>
      </form>
    );

    return (
      <div data-testid="page-login">
        { isLoading ? <Loading /> : loginPage }
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
