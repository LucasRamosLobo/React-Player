import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import MusicCard from './MusicCard';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      id: undefined,
      resposta: undefined,
      loading: false,
      content: false,
      favorites: [],
    };

    this.allContent = this.allContent.bind(this);
    this.loading = this.loading.bind(this);
    this.update = this.update.bind(this);
  }

  async componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    this.state.id = id;

    this.setState({ loading: true });

    await getMusics(id).then(async (resposta) => {
      await getFavoriteSongs().then((resp) => {
        this.setState({ favorites: resp });
      });
      this.setState({ resposta, loading: false, content: true });
    });
  }

  allContent() {
    const { resposta, favorites } = this.state;
    const { artworkUrl100, collectionName, artistName } = resposta[0];
    const aux = resposta.filter((e) => (e.trackId > 0));

    const formato = aux.map((e) => {
      const checkedPrevious = favorites.some((ele) => ele.trackId === e.trackId);
      return (
        <MusicCard
          trackId={ e.trackId }
          trackName={ e.trackName }
          previewUrl={ e.previewUrl }
          isLoad={ this.loading }
          upd={ this.update }
          checkedPrevious={ checkedPrevious }
          key={ e.trackId }
        />
      );
    });

    return (
      <div className="whole-content">
        <div className="lado-esquerdo">
          <img
            src={ artworkUrl100 }
            alt={ collectionName }
            className="details"
          />
          <p data-testid="album-name" className="details">{ collectionName }</p>
          <p data-testid="artist-name" className="details">{ artistName }</p>
        </div>

        <div className="lado-direito">
          <h1>Músicas:</h1>
          {formato}
        </div>
      </div>
    );
  }

  loading(bool) {
    this.setState({ loading: bool });
  }

  update(key) {
    const { favorites } = this.state;
    const remove = favorites.filter((e) => e.trackId !== key);

    this.setState({ favorites: remove });
  }

  render() {
    const { loading, content } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        { loading ? (<h1>Carregando...</h1>) : ('')}
        { content ? this.allContent() : ('')}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
