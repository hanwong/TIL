/*
state
 - 컴포넌트에서 유동적인 데이터를 처리 할 때 사용한다.
 - 사용시 초기값 설정이 필수이다. 생성자에서 this.state={} 로 설정
 - 값을 수정할 때는 this.setState=({...})
  = react 프로세스에 따라 값 변경 후 자동으로 리렌터링 함
 - 렌더링 이후에는 this.state={} 를 사용하지 않는다.

*/

class Counter extends React.Component {

  constructor(props) {
// Counter 가 만들어 질 때 전달 받는 인자 props
// super를 통해서 상속받은 React.Component, 부모의 생성자 메소드를 먼저 실행하고, 아래의 작업들을 수행함. 먼저 super로 실행을 해줘야 아래의 작업에 접근 할 수 있다.
    super(props);
    this.state = {
      value: 0
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(){
    this.setState({
      value: this.state.value + 1
    });
  }

  /* 자바스크립트 컴포넌트에서 메소드를 실행 할 때는 해당 메소드에서 this를 참조 하지 못함.
  this를 알기 위해서 bind(this) 를 추가함.
   - this.handleClick.bind(this) - handleClick 내부의 this는 이 것이 실행되는 메서드의 this와 같다.
   - 컨벤션 상 constructor에서 바인딩 해주는 것이 좋다.

  */
  render(){
    return(
      <div>
        <h1>{this.state.value}</h1>
        <button onClick={this.handleClick}>Press </button>
      </div>
    );
  }
};

class App extends React.Component {
  render(){
    return(
      <Counter/>
    );
  }
};



ReactDOM.render(
  <App></App>,
  document.getElementById('root')
);
