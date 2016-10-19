import * as types from '../actions/ActionTypes';

// Reducer의 초기 상태 정의
const initialState = {
    number: 0,
    dummy: 'Dumb',
    dumbObject: {
        d: 0,
        u: 5,
        m: 1,
        b: 3
    }
};

// Reducer 함수이고 default로 내보낸다.
//  action : Action Creator 를 통해 만들어진 Action 객체, dispatch를 통해 전달됨
export default function counter(state = initialState, action) {
    switch (action.type) {
        case types.INCREMENT:
            return {
                ...state,
                number: state.number + 1,
                dumbObject: {
                    ...state.dumbObject,
                    u: 0
                }
            };
        case types.DECREMENT:
            return {
                ...state,
                number: state.number - 1
            };
        default:
            return state;
    }
}
