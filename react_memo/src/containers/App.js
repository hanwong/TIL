import React from 'react';
import { Header } from 'components';
import { connect } from 'react-redux';
import { getStatusRequest } from 'actions/authentication';

class App extends React.Component {
    render() {

        let re = /(login|register)/;
        let isAuth = re.test(this.props.location.pathname); 

        return (
            <div>
                {isAuth ? undefined : <Header/>}
                {this.props.children}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        status: state.authentication.status
    };
};
 
const mapDispatchToProps = (dispatch) => {
    return {
        getStatusRequest: () => {
            return dispatch(getStatusRequest());
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);