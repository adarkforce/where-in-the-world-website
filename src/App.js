import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import HeaderRoute from './routes/HeaderRoute';
import Home from './app/pages/Home';
import DetailPage from './app/pages/DetailPage';

function App() {
  return (
    <div>
      <Switch>

        <HeaderRoute subheaderMode='goBack' path="/detail/:id">
          <DetailPage />
        </HeaderRoute>

        <HeaderRoute path="/">
          <Home />
        </HeaderRoute>

      </Switch>
    </div>
  );
}

export default App;
