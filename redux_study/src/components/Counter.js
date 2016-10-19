import React, { Component } from 'react';

import Value from './Value';
import Control from './Control';

// import { connect, bindActionCreators } from 'react-redux';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Conter extends Component {

    constructor(props) {
        super(props);
        this.setRandomColor = this.setRandomColor.bind(this);
    }

    setRandomColor() {
        const color = [
            Math.floor((Math.random()*55) + 200),
            Math.floor((Math.random()*55) + 200),
            Math.floor((Math.random()*55) + 200)
        ];

        this.props.handleSetColor(color);
    }

    render() {
        const color = this.props.color;
        const style = {
            background: `rgb(${color[0]}, ${color[1]}, ${color[2]})`
        };
        return(
            <div style={style}>
                <Value number={this.props.number}/>
                <Control
                    onPlus={this.props.handleIncrement}
                    onSubtract={this.props.handleDecrement}
                    onRandomizeColor={this.setRandomColor}
                />
            </div>
        );
    }
}

// Redux 안에 있는 State와 dispatch를 컴포넌트의 props에 연결
const mapStateToProps = (state) => {
    return {
        number: state.counter.number,
        color: state.ui.color
    };
}

const mapDispatchToProps = (dispatch) => {
    // 아래 주석의 기능을 자동으로 실행해줌, 함수의 이름이 ActionCreator와 동일하게 적용됨
    // return bindActionCreators(actions, dispatch);

    return {
        handleIncrement: () => {
            // Action Creator에서 만든 Action을 받아서 Dispatch한다.
            dispatch(actions.increment());
        },
        handleDecrement: () => {
            dispatch(actions.decrement());
        },
        handleSetColor: (color) => {
            dispatch(actions.setColor(color));
        }
    };

};

// 컴포넌트를 redux에 연결
export default connect(mapStateToProps, mapDispatchToProps)(Conter);
// connect() 로 연결하면 this.props.store.getState().counter.number 와 같은 방법으로 해야됨.
// connect(mapStateToProps, mapDispatchToProps) 로 연결하면 this.props.number 와 같은 방식으로 연결 가능
