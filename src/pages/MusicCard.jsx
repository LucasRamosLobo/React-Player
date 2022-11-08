import PropTypes from 'prop-types';
import React from 'react';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  render() {
    const {
      trackId,
      trackName,
      previewUrl,
      isLoad,
      upd,
      checkedPrevious,
    } = this.props;

    const element = { trackId, trackName, previewUrl };

    return (
      <div className="music-div" key={ trackId }>
        <p className="song-name">{trackName}</p>

        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>
            audio
          </code>
        </audio>

        <label htmlFor={ trackId } data-testid={ `checkbox-music-${trackId}` }>
          Favorita
          <input
            type="checkbox"
            name={ trackId }
            id={ trackId }
            defaultChecked={ checkedPrevious }
            onChange={ async ({ target }) => {
              isLoad(true);
              if (target.checked) {
                await addSong(element).then(() => {
                  isLoad(false);
                });
              } else {
                upd(elemento.trackId);
                await removeSong(element).then(() => {
                  isLoad(false);
                });
              }
            } }
          />
        </label>

      </div>
    );
  }
}

MusicCard.propTypes = {
  trackId: PropTypes.number.isRequired,
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  isLoad: PropTypes.func.isRequired,
  upd: PropTypes.func.isRequired,
  checkedPrevious: PropTypes.bool.isRequired,
};

export default MusicCard;
