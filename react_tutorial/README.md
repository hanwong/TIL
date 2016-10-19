##Flux

> Action -> Dispatcher -> Store -> View

* 시스템에서 어떤 Action을 받았을 때
* Dispatcher가 받은 Action을 통제하여
* Store에 있는 데이터를 업데이트 하고
* 변동된 데이터가 있으면 View를 리렌더링 한다.
  * View에서도 Store에 직접 접근하지 않고,
  * View에서 Dispatcher로 Action을 보낸다.
  * 그리고 Dispatcher에서 작업이 중첩되지 않도록 한다.
    * 다른 Action이 Store의 데이터를 처리 할 때 까지 대기 시킨다.

### 역할

* Action Creator (전보기사) - 앱에서 어떤 부분이 업데이트 되어야 하는지 정의함.
  * 어떤 Action을 수행해야 하는지 전달 받으면 Dispatcher가 알아들을 수 있도록 변환하여 전달한다.
* Dispatcher (교환원) - Action을 받으면 읽고 어떤 부분을 업데이트 할지 정해준다.
  * 동기적으로 실행됨 - 여러 Action이 들어오면 우선권을 가진 Action부터 순서대로 처리한다.
* Store (정부관료) - 모든 상태와 관련된 로직을 지니고 있다.
* View (발표자) - 앱 내부에 대해서 알지 못하고 사람들이 알 수 있는 HTML로 바꿀 수 있다.


### 시나리오
**준비작업**
* Store가 "Action이 들어오면 나에게 줘~" 라고 Dispatcher 에게 말한다.
* View는 Store에게 최신 상태를 묻고 Store가 전달해준다.
  * 그리고 그것을 자식에게 넘겨준다.
  * 그리고 또 상태가 바뀌면 알려달라고 Store에게 부탁한다.

**작업**
* 준비작업이 끝나면 View는 Action Creator에게 Action을 만들어 달라고 한다.
* Action Creator는 포맷을 변경해서 Dispatcher에게 넘겨준다.
* Dispatcher는 받은 순서에 맞춰서 Store로 보내고 값을 업데이트 한다.
* Store에서 상태가 변경이 완료가 되면 자신을 구독하고 있는 View에게 그 사실을 알린다.
* View는 Store에게 바뀐 값을 보내달라고 한다.



## Redux

1. 단 한개의 Store를 가진다.
2. State는 읽기 전용이다.
  - action이 dispatch 되어야만 변경 할 수 있다.
3. Reducer 는 순수함수로 작성되어야 한다.
  - 이 안에서 비동기적 처리를 하면 안된다, 네트워크, DB에 접근하면 안된다.
  - 인수를 변경하면 안되고, 같은 인수로 실행된 함수는 같은 결고를 반환한다.

### Flux와 의 차이
* Store가 하나 뿐이다.

* Dispatcher가 없다.
  * 대신, 어떤 작업을 해야할지 정하는것은 Store가 한다.
  * 이 작업을 실질적으로 수행하는 것은 Reducer 이다.

* Reducer - 변화를 일으켜 주는 함수.
  * Store가 어떤 상태를 변화 시켜야 할지 Reducer에게 묻는다.
  * 여려 개의 Reducer를 관리하는 Root Reducer가 있다.
  * Root Reducer가 Action을 받으면 담당하는 Reducer가 처리한다.
  * (복사를 열심히 하는 사무실 직원 같다.)
    * 복사본을 만들어서 변경사항을 저장한다.
    * State가 직접 변경되지 않고, 각각의 State 조각이 복사되고 변경된 후, 새로운 State 만들어진다.

* View  
  * Smart Component
    * Action 처리를 책임진다.
  * Dumb Component
    * Action의 직접 의존성을 가지지는 않고, Action을 Props통해 전달 받아 사용한다.

* View layer binding
  * Store를 View에 연결 시키는 작업
  * 기술적인 세부사항을 자신이 처리해서 세부사항을 신경쓰지 않아도 되도록 한다.

* Root Component
  * 모든 팀이 일을 하도록 하게하는 임무를 가지고 있다.
  * 전반적인 설정을 맡는다.

**데이터흐름**
* View가 Action을 요청하면 Action Creator가 Action을 생성해서 준다.
* View가 Store에게 Action을 준다.
* Store가 현재 상태트리와 Action을 Root Reducer에게 보내면,
* Root Reducer가 현재 상태를 나눠서 담당 서브 Reducer에게 보낸다.
* 서브 Reducer는 State의 사본을 만들어서 변경할것을 변경하고 사본을 돌려준다.
* Root Reducer는 변경된 상태를 모두 모아서 Store에게 돌여준다.
* 그러면 Store가 View layer binding에게 State가 변경된 것을 알려주면,
* 새로운 State를 달라고 하고, 새로운 State를 받는다.
* 새 데이터를 받고 View에게 특정 부분을 업데이트 하라고 한다.

[Redux로의 카툰 안내서](http://bestalign.github.io/2015/10/26/cartoon-intro-to-redux/)
