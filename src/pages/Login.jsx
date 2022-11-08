import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends React.Component {
  state = {
    nome: '',
    isButtonDisabled: true,
    isLoading: true,
  };

  handleChange = (event) => {
    const { nome } = this.state;
    const { target } = event;
    this.setState({
      nome: target.value,
      isButtonDisabled: nome.length < 2,
    }, () => {
    });
  };

  buttonReq = async (event) => {
    const { nome } = this.state;
    const { history } = this.props;
    this.setState(({
      isLoading: false,
    }));
    await createUser({ name: nome });
    history.push('/search');
    event.preventDefault();
  };

  render() {
    const { nome, isButtonDisabled, isLoading } = this.state;

    return (
      <div data-testid="page-login">
        { isLoading ? (
          <form onSubmit={ this.buttonReq }>
            <input
              data-testid="login-name-input"
              value={ nome }
              onChange={ this.handleChange }
              type="text"
            />
            <button
              type="button"
              data-testid="login-submit-button"
              disabled={ isButtonDisabled }
              onClick={ this.buttonReq }
            >
              Entrar
            </button>
          </form>
        ) : <Loading />}
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.string.isRequired,
};
export default Login;
