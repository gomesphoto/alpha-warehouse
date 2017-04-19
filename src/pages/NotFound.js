import React from 'react';
import { Link } from 'react-router-dom';
import Page from '../components/Page';
import Column from '../components/Column';

const NotFound = () => (
  <Page>
    <Column>
      <Link to="/"><h1>404 Page Not Found</h1></Link>
    </Column>
  </Page>
);
export default NotFound;
