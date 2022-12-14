import React from 'react'
import { Route, Switch } from 'react-router-dom';
import { Navbar2 } from './components/Navbar2';
import {Content } from './components/Content';
import {ShopingCart} from './components/ShopingCart';
function App() {
  return (
    <div>
        <Navbar2/>
        <Switch>
            <Route path="/shopingcart" component={ShopingCart}/>
            <Route path="/" component={Content}/>

        </Switch>
    </div>
  )
}

export default App;