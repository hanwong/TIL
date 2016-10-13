class Contactinfo extends React.Component {
  render(){
    return(
      <div> {this.props.contact.name} {this.props.contact.phone} </div>
    );
  }
};

class Contact extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      contactData:[
        { name: 'Abet', phone: '000-0000-0001' },
        { name: 'John', phone: '000-0000-0002' },
        { name: 'Betty', phone: '000-0000-0003' },
        { name: 'Matt', phone: '000-0000-0004' }
      ]
    };
  }
  render(){
    
    const mapToComponent = data => {
      return data.map(
        (contact, i) => {
          return (<Contactinfo contact={contact} key={i}/>);
        }
      );
    }; 
    
    return(
      <div>
        {mapToComponent(this.state.contactData)}
      </div>
    );
  }
};

class App extends React.Component {
  render(){
    return(
      <Contact/>
    );
  }
};

ReactDOM.render(
  <App></App>, 
  document.getElementById('root')
);
