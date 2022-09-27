import React from 'react';
import { Box } from './constants/Box';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import Aplication from './components/Aplication/Aplication';

export default class App extends React.Component {
  render() {
    return (
      <Box>
        <ErrorBoundary>
          <Aplication />
        </ErrorBoundary>
      </Box>
    );
  }
}
