import logo from './logo.svg';
import './App.css';
import {Component} from "react";

class App extends Component
{
    constructor(props) {
        super(props);
        this.state = { apiResponse: "" };
    }

    callAPI() {
        fetch("http://localhost:8000/testAPI/?rid=1")
            .then(res => res.text())
            .then(res => this.setState({ apiResponse: res }));
    }

    componentWillMount() {
        this.callAPI();
    }
  render()
  {
    return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo"/>
              <p>API response: {this.state.apiResponse}</p>
          </header>
        </div>
    );
  }
}

export default App;
