
import { Dropdown } from 'bootstrap';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Books from './components/Books';
import Dropdown1 from './components/Dropdown1';
import Electronics from './components/Electronics';
import Fashion from './components/Fashion';
import Food from './components/Food';
import Home_and_Kitchen from './components/Home_and_Kitchen';
import Link1 from './components/Link1';
import Mobile from './components/Mobile';
import Navbar from './components/Navbar';
import Navbar21 from './components/Navbar21';
import NewRelease from './components/NewRelease';
import AllCategories from './components/AllCategories';
import SelectYourAddress from './components/SelectYourAddress';
import Cart from './components/Cart';

function App() {
  return (
    <div>
      <Navbar/>
      <Navbar21/>
    <Switch>
   
    <Route path="/SelectYourAddress" component={SelectYourAddress}/>
    <Route path="/link1" component={Link1 }/>
    
    <Route path="/New release" component={NewRelease}/>
    <Route path="/food" component={Food}/>
    <Route path="/electronics" component={Electronics}/>
    <Route path="/mobile" component={Mobile}/>
    <Route path="/fashion" component={Fashion}/>
    <Route path="/home and kitchen" component={Home_and_Kitchen}/>
    <Route path="/books" component={Books}/>
    <Route path="/all categories" component={AllCategories}/>
    <Route path="/cart" component={Cart}/>
    

    

    

    </Switch>
    </div>
  );
}

export default App;
