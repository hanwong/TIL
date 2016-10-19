import * as types from './ActionTypes';

/*
    Action 작업에 대한 정보를 지니고 있는 객체
     - { type: ... }속성을 반드시 가지고 있어야 됨.
*/

// Action Creator
export function increment() {
    // Action 객체를 반환
    return {
        type: types.INCREMENT
    };
}

export function decrement() {
    return {
        type: types.DECREMENT
    };
}

export function setColor(color) {
    return {
        type: types.SET_COLOR,
        color
    };
}
