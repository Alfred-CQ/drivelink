import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { ThemeEditorProvider } from '@hypertheme-editor/chakra-ui';

import theme from './theme/theme';
import AuthLayout from './layouts/auth';
import DashboardLayout from './layouts/admin';

import './assets/css/App.css';

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <ThemeEditorProvider>
        <Router>
          <Routes>
            <Route path="/auth/*" element={<AuthLayout />} />
            <Route path="/admin/*" element={<DashboardLayout />} />
            <Route path="/" element={<Navigate to="/admin/" />} />
          </Routes>
        </Router>
      </ThemeEditorProvider>
    </ChakraProvider>
  );
};

export default App;
