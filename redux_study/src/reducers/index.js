import { combineReducers } from 'redux';
import counter from './counter';
import ui from './ui';

const reducers = combineReducers({
    counter, ui
});

export default reducers;

/*
    Reducer
    - 이전 상태와 액션을 받아서 다음 상태를 반환한다.
    - **이전 상태를 변경하는 것이 아나리 새로운 상태를 반환하는 것
    (previousState, action) => newState

    **주의**
    - 비동기 작업 X
    - 인수 변경 X
    - 동일한 인수, 동일한 결과 - Math.random, Date.now 같은 함수를 쓰면 안된다.
*/
