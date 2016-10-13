class Codelab extends React.Component {
// 컴포넌트가 어떻게 생길지 정의
  // 어떤 뷰를 보여줄지 jsx 형태로 리턴한다.
  render() {

    return (
      <div>
        <h1>Hello {this.props.name}</h1>
        <h2>{this.props.number}</h2>
        <div>{this.props.children}</div>
      </div>
    );
  }
}
// 여기서 만든 컴포넌트를 다른 컴포넌트에서 사용할 수 있다.
Codelab.propTypes = {
  name: React.PropTypes.string,
  number: React.PropTypes.number.isRequired
};

Codelab.defaultProps = {
  name: 'Unknwon'
};

class App extends React.Component {
  render(){
    return(
      <Codelab name={this.props.name} 
        number={this.props.number}>{this.props.children}</Codelab>
    );
  }
}

// ReactDOM은 실제 페이지에 jsx 형태의 코드를 렌더링 할 때 사용된다.
// 렌더링 할 컴포넌트, 컴포넌트를 렌더링 할 엘리먼트
ReactDOM.render(<App number={5}>I am your child</App>, document.getElementById('root'));

// JSX 유의사항 
//  - JSX 코드는 컨테이너 요소 안에 포함 시켜줘야 한다.
//  - 코드 내에 js를 표현하기 위해서는 {} 로 감싸준다.
//  - style 설정을 할 때는 key를 캐멀케이스 형태인 객체로 작성한다.
//  - 주석 : {/*...*/}


/* 
props 
 - 컴포넌트 내부의 immutable data를 처리 할 때 사용한다.
 - 기본값 설정 
  = 컴포넌트 선언이 끝난 후, defaultProps 객체를 설정한다. 
 - type 검증
  = 컴포넌트 선언이 끝난 후, propTypes 객체를 설정한다. 
*/

/*
state
 - 컴포넌트에서 유동적인 데이터를 처리 할 때 사용한다.
 - 사용시 초기값 설정이 필수이다. 생성자에서 this.state={} 로 설정
 - 값을 수정할 때는 this.setState=({...}) 
  = react 프로세스에 따라 값 변경 후 자동으로 리렌터링 함
 - 렌더링 이후에는 this.state={} 를 사용하지 않는다.
 
*/