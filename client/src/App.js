import './App.css';
import Home from './views/Home/Home';
import Landing from './views/Landing/Landing';
import Form from './views/Form/Form';
import Detail from './views/Detail/Detail'
import { Route, useLocation} from "react-router-dom";
import NavBar from './components/NavBar/NavBar';
import SearchBar from "./components/SearchBar/SearchBar"

function App() {
  const location = useLocation();
  return (
    <div className="App">
      {location.pathname !== "/" && <NavBar component={SearchBar}/>}
      
      <Route exact path="/">
        <Landing />
      </Route>
      
      <Route exact path= "/home">
        <Home />
      </Route>

      <Route exact path= "/detail/:id">
        <Detail />
      </Route>

      <Route exact path="/create">
        <Form />
      </Route>

    </div>
  );
}

export default App;
