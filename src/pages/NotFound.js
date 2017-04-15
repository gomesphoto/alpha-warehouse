import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import Page from '../components/Page';
import Column from '../components/Column';

class NotFound extends Component {
  componentDidMount = () => {
    this.props.hideLogo(true);
  }
  componentWillUnmount = () => {
    this.props.hideLogo(false);
  }
  render = () => (
    <Page>
      <Column>
        <Link to="/"><h1>404 Page Not Found</h1></Link>
      </Column>
    </Page>
  );
}

NotFound.propTypes = {
  hideLogo: PropTypes.func.isRequired
};

export default NotFound;
