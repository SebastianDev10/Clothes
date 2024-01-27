import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import HomePage from './HomePage';
import UserProfile from './UserProfile';
import NotFound from './NotFound';

function App() {

  const isAuthenticated = () => {
    // Tutaj implementacja sprawdzania, czy użytkownik jest zalogowany
    // Przechowanie tokenu w localStorage
    return localStorage.getItem('access_token') !== null;
};



    return (
        <Router>
            <Switch>
                <Route path="/register" component={Register} />
                <Route path="/login" component={Login} />
                <Route path="/home" render={() => (
                    isAuthenticated() ? <HomePage /> : <Redirect to="/login" />
                )} />
                {/* Inne ścieżki */}
                <Route path="/UserProfile" render={() => (
                    isAuthenticated() ? <UserProfile /> : <Redirect to="/login" />
                )} />
                <Route component={NotFound} />
            </Switch>
        </Router>
    );
}

export default App;
