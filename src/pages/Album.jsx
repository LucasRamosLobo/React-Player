import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';

class Album extends React.Component {
  state = {
    musicas: [],
    objArtist: {},
  };

  componentDidMount() {
    this.fetchMusics();
  }

  fetchMusics = async () => {
    const { match: { params: { id } } } = this.props;
    const req = await getMusics(id);
    const arr = [...req];
    this.setState({
      objArtist: arr.shift(),
      musicas: arr,
    });
  };

  render() {
    const { musicas, objArtist } = this.state;
    return (

      <div data-testid="page-album">
        <Header />
        <div data-testid="artist-name">{ objArtist.artistName }</div>
        <div data-testid="album-name">{ objArtist.collectionName }</div>
        { musicas.map((element) => (
          <MusicCard
            key={ element.artistId }
            trackName={ element.trackName }
          />
        ))}
      </div>

    );
  }
}
Album.propTypes = {
  match: PropTypes.shape().isRequired,
};
export default Album;
