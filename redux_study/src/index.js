import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';

import { createStore } from 'redux';
import reducers from './reducers';

import { Provider } from 'react-redux';


// Store 생성, Reducer 전달
const store = createStore(reducers);

/* ------------ test code ---------------
    console.log(store.getState());
    // subscribe - State 의 변화가 있을 때 특정함수 실행
    const unsubscribe = store.subscribe(() => console.log(store.getState()));
    // action을 보낸다.
    import * as actions from './actions';
    store.dispatch(actions.increment());
    store.dispatch(actions.decrement());
    store.dispatch(actions.setColor([210, 210, 210]));
    // unsubscribe - 더이상 listener 를 동작시키지 않을 때 사용
    unsubscribe();
    store.dispatch(actions.setColor([100, 110, 130]));
*/

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);

/*
    Store
    - 어플리케이션의 현재 상태를 지니고 있음
    - createStore를 불러온 다음, Reducer를 인수로 전달해서 해당 함수를 실행한다.

    * dispatch(action)
        - 현재의 state와 action을 reducer로 보낸다.
        - 그러면 reducer가 어떤 변화가 필요한지 알고 변경해서 newState를 전달한다.

    * getState() - 현재 state를 반홚

    * subscribe(listener)
        - state가 바뀔 때 마다 실행 할 함수를 등록하는 것
        - listener가 상태가 바뀔 때 마다 실행 될 콜백함수이다.

    * replaceReducer(nextReducer)
        - Hot Reloading과 코드 분할에 사용

*/

/*
    React Redux
    * Provider - 복잡한 작업들을 알아서 해줌...
    * connect([options...])- 컴포넌트를 redux에 연결하는 또 다른 함수를 반환한다.
     - connect()(Component) 반환된 함수에 컴포넌트를 인수로 전달하면
        - store에 연결된 새로운 컴포넌트 클래스가 반환된다.
        - option이 없으면 this.props.store 로 접근 가능하다.
        - options...
        [mapStateToProps]
            - state를 파라미터로 갖는 함수
            - state를 해당 컴포넌트의 props로 연결시킴
        [mapDispatchToProps]
            - dispatch를 파라미티로 갖는 함수
            - dispatch한 함수를 해당 컴포넌트의 props로 연결시킴
        [mergeProps]
            - state와 dispatch를 동시에 파라미터로 갖는 함수
        [options]
            - pure - 기본값으로 true, 불필요한 업데이트를 하지 않음
            - withRef - 기본값으로 false, true 이면 redux에 연결된 컴포넌트를 ref에 담아서 getWrappedInstance()를 통해 접근 할 수 있게 해줌
*/
