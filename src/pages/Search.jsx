import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

class Search extends React.Component {
  state = {
    isButtonDisabled: true,
    nome: '',
    isLoad: false,
    response: [],
    noAlbum: false,
    artista: '',

  };

  handleChange = (event) => {
    const { nome } = this.state;
    const { target } = event;
    this.setState({
      nome: target.value,
      isButtonDisabled: nome.length < 1,
      artista: target.value,
    }, () => {
    });
  };

  botao = async (event) => {
    event.preventDefault();
    const { nome } = this.state;
    this.setState(({
      isLoad: true,
    }));
    const albums = await searchAlbumsAPI(nome);
    console.log(albums);
    this.setState({
      nome: '',
      isLoad: false,
      response: albums,
    }, () => {
      const { response } = this.state;
      this.setState({
        noAlbum: response.length === 0,
      });
    });
  };

  render() {
    const { nome, isButtonDisabled, isLoad, response, noAlbum, artista } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        { isLoad ? <Loading /> : (

          <form>
            <input
              data-testid="search-artist-input"
              value={ nome }
              onChange={ this.handleChange }
              placeholder="Nome da banda"
              type="text"
            />
            <button
              type="button"
              data-testid="search-artist-button"
              disabled={ isButtonDisabled }
              onClick={ this.botao }
            >
              Pesquisar
            </button>
          </form>
        )}
        <h3>
          {
            `Resultado de álbuns de: ${artista}`
          }
        </h3>

        {
          noAlbum && <h4>Nenhum álbum foi encontrado</h4>
        }

        {
          response.map((element) => (
            <div key={ element.collectionName }>
              <h2>
                {element.artistName}
              </h2>
              <img src={ element.artworkUrl100 } alt={ element.artistName } />
              <Link
                data-testid={ `link-to-album-${element.collectionId}` }
                to={ `album/${element.collectionId}` }
              >
                { element.collectionName }
              </Link>
            </div>
          ))
        }

      </div>
    );
  }
}
export default Search;
