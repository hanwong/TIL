import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

const propTypes = {
    isLoggedIn: PropTypes.bool,
    onLogout: PropTypes.func
};

const defaultProps = {
    isLoggedIn: false,
    onLogout: () => { console.error('logout function not defined.'); }
};

class Header extends Component {
    render() {

        const loginButton = (
            <li>
                <Link to="/login">
                    <i className="material-icons">vpn_key</i>
                </Link>
            </li>
        );

        const logoutButton = (
            <li>
                <a>
                    <i className="material-icons">lock_open</i>
                </a>
            </li>
        );

        return(
            <nav>
                <div className="nav-wrapper blue darken-1">
                    <Link className="brand-logo center">MEMOPAD</Link>

                    <ul>
                        <li><a><i className="material-icons">search</i></a></li>
                    </ul>

                    <div className="right">
                        <ul>
                            { this.props.isLoggedIn ? logoutButton : loginButton }
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default Header;
