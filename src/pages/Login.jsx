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

  buttonRequisicao = async () => {
    const { nome } = this.state;
    const { history } = this.props;
    this.setState(({
      isLoading: false,
    }));
    await createUser({ name: nome });
    history.push('/search');
  };

  // Botão habilitado caso o nome digitado tenha 3 ou mais caracteres

  render() {
    const { nome, isButtonDisabled, isLoading } = this.state;

    return (
      <div data-testid="page-login">
        { isLoading ? (
          <form>
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
              onClick={ this.buttonRequisicao }
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
