import React from 'react';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

class Search extends React.Component {
  state = {
    isInputValid: false,
    searchArtistInput: '',
    artistName: '',
    isLoading: false,
    isRequesting: false,
    albuns: [],
  };

  // componentDidMount() {
  //   this.showLoading();
  // }

  handleDisableButton = () => {
    const { searchArtistInput } = this.state;
    const min = 2;
    const isSearchValid = searchArtistInput.length >= min;
    this.setState({ isInputValid: isSearchValid });
  };

  onInputChangeInput = (event) => {
    const { value } = event.target;
    this.setState({
      searchArtistInput: value,
    }, this.handleDisableButton);
  };

  // showLoading = () => {
  //   const loadingTime = 2000;
  //   this.setState({ isLoading: true });
  //   setTimeout(() => {
  //     this.setState({ isLoading: false });
  //   }, loadingTime);
  // };

  //   showLoadingInRequest = () => {
  //   const loadingTime = 2000;
  //   setTimeout(() => <Loading />, loadingTime);
  // };

  handleFetch = () => {
    const { searchArtistInput } = this.state;
    const loadingTime = 1500;
    this.setState({ isRequesting: true });
    searchAlbumsAPI(searchArtistInput).then((res) => this.setState({
      albuns: res,
      searchArtistInput: '',
    }));
    setTimeout(() => this.setState({ isRequesting: false }), loadingTime);
  };

  handleSearch = async (e) => {
    const { searchArtistInput } = this.state;
    e.preventDefault();
    this.setState({
      artistName: searchArtistInput,
    });
    this.handleFetch();
  };

  render() {
    const { isInputValid, searchArtistInput, isLoading, artistName, albuns,
      isRequesting } = this.state;

    const searchPage = (
      <form action="" method="get">
        <label htmlFor="searchArtistInput">
          <input
            data-testid="search-artist-input"
            type="text"
            name="searchArtistInput"
            value={ searchArtistInput }
            onChange={ this.onInputChangeInput }
          />
        </label>
        <button
          data-testid="search-artist-button"
          disabled={ !isInputValid }
          type="submit"
          onClick={ this.handleSearch }
        >
          Pesquisar
        </button>
      </form>
    );

    const resultsAlbuns = (
      <>
        <p className="title-results">
          { `Resultado de álbuns de:
            ${artistName}` }
        </p>
        <ul className="album-list">
          {albuns.map((album) => (
            <li
              className="album-item"
              key={ album.collectionId }
            >
              { this.renderAlbum(album) }
            </li>
          ))}
        </ul>
      </>
    );

    return (
      <div data-testid="page-search">
        { isLoading ? <Loading />
          : (
            <>
              <section>{ searchPage }</section>
              <section>
                {artistName
                && (
                  isRequesting ? <Loading />
                    : (
                      <div>
                        { albuns.length === 0
                          ? (
                            <p className="title-results">
                              Nenhum álbum foi encontrado
                            </p>
                          )
                          : resultsAlbuns }
                      </div>
                    ))}
              </section>
            </>
          ) }
      </div>
    );
  }
}

export default Search;
