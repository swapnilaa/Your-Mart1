//import logo from './logo.svg';
//import { Route } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import { Content } from './components/Content';
import { Navbar2 } from './components/Navbar2';
import { ShopingCart } from './components/ShopingCart';


function App() {
  
  
  
  return (
    <div className='m-2'>
       <Navbar2/>
      
      
      <Switch> 
      <Route path="/shopingcart" component={ShopingCart}/>
      <Route path="/" component={Content}/>
      </Switch>
      
    </div>
  );
}

export default App;
