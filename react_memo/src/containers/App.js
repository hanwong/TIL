import React from 'react';
import { Header } from 'components';
import { connect } from 'react-redux';
import { getStatusRequest } from 'actions/authentication';

class App extends React.Component {
    componentDidMoutn() {
        // 쿠키 이름 요청
        function getCookie (name) {
            var value = "; " + document.cookie;
            var parts = value.split("; " + name + "=");
            if(parts.length === 2) return parts.pop().split(";").shift();
        }

        // 쿠키의 로그인데이타 요청
        let loginData = getCookie('key');

        //  로그인데이터 비정의시, 비동작
        if(typeof loginData === 'undefined') return;

        // JSON 데이터로 파싱
        loginData = JSON.parse(atob(loginData));

        // 비로그인시, 비동작
        if(!loginData.isLoggedIn) return;

        // 새로고침 시 쿠키 유효성 검사
        this.props.getStatusRequest().then(
            () => {
                console.log(this.props.status);
                // 세션이 유효하지 않은 경우
                if(!this.props.status.valid) {
                    // 세션 로그아웃
                    loginData = {
                        isLoggedIn: false,
                        username: ''
                    };
                    document.cookie = 'key=' + btoa(JSON.stringify(loginData));
                    let $toastContent = $('<span style="color: #FFB4BA">Your session is expired, please log in again</span>');
                    Materialize.toast($toastContent, 4000);
                }
            }
        );
    }

    render() {

        let re = /(login|register)/;
        let isAuth = re.test(this.props.location.pathname); 

        return (
            <div>
                {isAuth ? undefined : <Header isLoggedIn={this.props.status.isLoggedIn}/>}
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