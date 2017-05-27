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

/*2. -----------A boiling water detector-----------------
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
        if (Number.isNaN(input)) { return ''; }
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
*/

/*3. --------------build a webpage based on a JSON and a mock------------------
for link and mock, please refer to "https://facebook.github.io/react/docs/thinking-in-react.html" */
import PRODUCT from './PRODUCT.json';

class ProductRow extends React.Component {
    render() {
        const name = this.props.product.stocked ? this.props.product.name :
            <span style={{ color: 'red' }}>{this.props.product.name}</span>
        return (
            <tr>
                <td>{name}</td>
                <td>{this.props.product.price}</td>
            </tr>
        )
    }
}

class ProductCategoryRow extends React.Component {
    render() {
        return <tr><th colSpan="2">{this.props.product.category}</th></tr>
    }
}

class ProductTable extends React.Component {
    render() {
        let lastCategory = null;
        const row = [];
        this.props.products.forEach((product) => {
            if (product.name.indexOf(this.props.searchText) === -1 || (this.props.checked && !product.stocked)) {
                    return;
            } 
            if (product.category !== lastCategory) {
                row.push(<ProductCategoryRow key={product.category} product={product} />);
            }
            row.push(<ProductRow product={product} key={product.name} />);
            lastCategory = product.category;
        });
        return (
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>{row}</tbody>
            </table>
        )
    }
}

class SearchBar extends React.Component {
    handleSearch(e) {
            this.props.handleSearch(e.target.value);
    }

    render() {
        return (
            <div>
                <input type="text" placeholder="search..." value={this.props.searchText} onChange={this.handleSearch.bind(this)} />
                <p>
                    <input type="checkbox" onChange={this.props.handleClick} />{' '}Only show products in stock
                </p>
            </div>
        )
    }
}

class FilterableProductTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false,
            value: ""
        }
    }

    handleCheckboxClick() {
        this.setState({
            checked: !(this.state.checked)
        })
    }

    handleSearch(text) {
        console.log(text);
        this.setState({
            value: text
        })
    }

    render() {
        return (
            <div>
                <SearchBar handleClick={this.handleCheckboxClick.bind(this)} handleSearch={this.handleSearch.bind(this)} value={this.state.value}/>
                <ProductTable products={this.props.product} checked={this.state.checked} searchText={this.state.value}/>
            </div>)
    }
}

ReactDOM.render(<FilterableProductTable product={PRODUCT} />, document.getElementById('root'));