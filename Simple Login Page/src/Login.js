import React from 'react';
import ReactDOM from 'react-dom';

function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <h1>Welcome back!</h1>;
  }
  return <h1>Please sign up.</h1>;
}

//------------Login--------------
function LoginButton(props) {
  return (
    <button onClick={props.onClick}>
      Login
    </button>
  );
}

function LogoutButton(props) {
  return (
    <button onClick={props.onClick}>
      Logout
    </button>
  );
}

class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
    }
    this.handleLoginClick = this.handleLogin.bind(this);
    this.handleLogoutClick = this.handleLogout.bind(this);
  }

  handleLoginClick() {
      this.setState({isLoggedIn: true}) 
  }

  handleLogoutClick() {
      this.setState({isLoggedIn: false})
  }

  render() {
      const isLoggedIn = this.state.isLoggedIn;
      let btn;
      if (isLoggedIn) {
          btn = (<div><LogoutButton onClick={this.handleLogoutClick}/></div>)
      } else {
          btn = (<div><LoginButton onClick={this.handleLoginClick}/></div>)
      }
      return (
          <div>
              {btn}
              <Greeting isLoggedIn={this.state.isLoggedIn}/>
          </div>
      )
  }
}

ReactDOM.render(<LoginControl/>, document.getElementById('root'))