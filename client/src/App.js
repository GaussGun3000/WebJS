import './styles/App.css';
import {Component} from "react";
import LanguageDropList from './components/LanguageDropList.js'
import Login from './components/Login.js'
import API from './API'

class App extends Component {
    constructor(props) {
        super(props);
        this.API = new API()
        this.state = {apiResponse: ""};
    }

    componentWillMount() {
        // this.API.testAPI()
        //     .then(res => this.setState({ apiResponse: res }))

    }
  render()
  {
    return (
        <div className="App">
          <header className="App-header">
              <Login />
          </header>
        </div>
    );
  }
}



export default App;
