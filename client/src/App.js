import "./App.css";
import Home from "./views/Home1/Home";
import Landing from "./views/Landing/Landing";
import Form from "./views/Form/Form";
import Detail from "./views/Detail1/Detail";
import NotFound from "./views/NotFound/NotFound";
import { Route, Switch } from "react-router-dom";
import Layout from "./components/Layout/Layout";

function App() {
  return (
    <div className="App">
      <Switch>
        \{" "}
        <Route exact path="/">
          <Landing />
        </Route>
        <Route exact path="/home">
          <Layout>
            <Home />
          </Layout>
        </Route>
        <Route exact path="/detail/:id">
          <Layout>
            <Detail />
          </Layout>
        </Route>
        <Route exact path="/create">
          <Layout>
            <Form />
          </Layout>
        </Route>
        <Route>
          <Layout>
            <NotFound />
          </Layout>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
