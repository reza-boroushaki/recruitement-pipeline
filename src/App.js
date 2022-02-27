import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Edit from './pages/Edit';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/edit/:id" component={Edit} />
      </Switch>
    </Router>
  );
}

export default App;
