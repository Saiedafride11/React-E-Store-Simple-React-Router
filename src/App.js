import './App.css';
import Header from './component/Header/Header';
import Shop from './component/Shop/Shop';
import OrderReview from './component/OrderReview/OrderReview';
import Inventory from './component/Inventory/Inventory';
import NotFound from './component/NotFound/NotFound';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import PlaceOrder from './component/PlaceOrder/PlaceOrder';


function App() {
   
  return (
    <div className="App">
      <Router>
        <Header></Header>
          <Switch>
              <Route exact path="/">
                 <Shop></Shop>
              </Route>
              <Route path="/shop">
                 <Shop></Shop>
              </Route>
              <Route path="/review">
                 <OrderReview></OrderReview>
              </Route>
              <Route path="/inventory">
                 <Inventory></Inventory>
              </Route>
              <Route path="/placeorder">
                 <PlaceOrder></PlaceOrder>
              </Route>
              <Route path="*">
                 <NotFound></NotFound>
              </Route>
          </Switch>
      </Router>
    </div>
  );
}

export default App;
