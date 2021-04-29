import { createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import CheckOut from "./components/CheckOut/CheckOut";
import DashBord from "./components/Dashbord/DashBord";
import LogIn from "./components/LogIn/LogIn";
import MyOrders from "./components/MyOrders/MyOrders";
import NavBar from "./components/NavBar/NavBar";
import NoFound from "./components/NoFound/NoFound";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Products from "./components/Products/Products";

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});

  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]} >
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/">
            <Products />
          </Route>

          <PrivateRoute path="/checkout/:productId">
            <CheckOut />
          </PrivateRoute>
          <Route path="/login">
            <LogIn />
          </Route>
          <PrivateRoute path="/myOrders" >
            <MyOrders />
          </PrivateRoute>

          <PrivateRoute path="/dashbord">
            <DashBord />
          </PrivateRoute>

          <Route path="*">
            <NoFound />
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider >


  );
}

export default App;
