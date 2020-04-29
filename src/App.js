import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import NavBar from './widgets/NavBar';
import Routes from './Routes';
import './app.css';
import NotificationPopup from './infrastructure/notificationPopup';
import apolloClient from './apollo.client';
import { ApolloProvider } from '@apollo/react-hooks';

const App = () => (
  <ApolloProvider client={apolloClient}>
    <Router>
      <NavBar />
      <Container className="page">
        <NotificationPopup />
        <Routes />
      </Container>
    </Router>
  </ApolloProvider>
);

export default App;
