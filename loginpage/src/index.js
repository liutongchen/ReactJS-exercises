import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/*1. ------------A Login Page------------------
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

function

class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
    }
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
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
*/

/*-----A boiling water detector-----------------*/
function BoilingVerdict(props) {
    if (props.temperature >= 100) {
        return <p>The water would boil</p>
    } else {
        return <p>The water would not boil</p>
    }
}

class TemperatureInput extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.onTemperatureChange(e.target.value);
    }

    render() {
        const temperature = this.props.temperature;
        return (
            <fieldset>
                <legend>Please enter temperature in {Calculate.scaleNames[this.props.scale]}</legend>
                <input value={temperature} onChange={this.handleChange} />
            </fieldset>
        )
    }
}

class Calculate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            temperature: "",
            scale: "c"
        }
        this.handleCelciusChange = this.handleCelciusChange.bind(this);
        this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    }
    static scaleNames = {
        c: "Celcius",
        f: "Fahrenheit"
    }

    static toCelsius(fahrenheit) {
        return (fahrenheit - 32) * 5 / 9;
    }

    static toFahrenheit(celsius) {
        return (celsius * 9 / 5) + 32;
    }

    static tryConvert(temp, convert) {
        const input = parseFloat(temp);
        if (Number.isNaN(input)) { return 0; }
        const output = convert(input);
        const rounded = Math.round(output * 1000) / 1000;
        return rounded.toString();
    }

    handleCelciusChange(temperature) {
        this.setState({
            scale: 'c',
            temperature: temperature
        })
    }

    handleFahrenheitChange(temperature) {
        this.setState({
            scale: 'f',
            temperature: temperature
        })
    }

    render() {
        const scale = this.state.scale;
        const temperature = this.state.temperature;
        const Celcius = scale === 'f' ? Calculate.tryConvert(temperature, Calculate.toCelsius) : temperature;
        const Fahrenheit = scale === "c" ? Calculate.tryConvert(temperature, Calculate.toFahrenheit) : temperature;

        return (
            <div>
                <TemperatureInput scale="c" onTemperatureChange={this.handleCelciusChange} temperature={Celcius} />
                <TemperatureInput scale="f" onTemperatureChange={this.handleFahrenheitChange} temperature={Fahrenheit} />
                <BoilingVerdict temperature={Celcius} />
            </div>
        )
    }
}

ReactDOM.render(<Calculate />, document.getElementById('root'))