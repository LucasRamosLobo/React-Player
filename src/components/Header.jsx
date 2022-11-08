import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

class Header extends React.Component {
  state = {
    loading: false,
    name: '',
  };

  componentDidMount() {
    this.loginFunction();
  }

  loginFunction = async () => {
    this.setState(({
      loading: true,
    }), async () => {
      const response = await getUser();
      this.setState(({
        name: response.name,
        loading: false,
      }));
    });
  };

  render() {
    const { name, loading } = this.state;
    return (
      <>
        <div>
          <Link to="/search" data-testid="link-to-search">Search</Link>
          <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
          <Link to="/profile" data-testid="link-to-profile">Profile</Link>
        </div>
        <header data-testid="header-component">
          <h3 data-testid="header-user-name">
            { loading ? <Loading /> : name }
          </h3>
        </header>
      </>
    );
  }
}
export default Header;
