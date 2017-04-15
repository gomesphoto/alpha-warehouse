import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { authenticationLogout } from '../redux/_authentication';
import { deleteSession } from '../helpers/utilities';

class Logout extends Component {
  componentWillMount() {
    this.props.authenticationLogout();
    deleteSession();
  }
  render = () => null;
}

Logout.propTypes = {
  authenticationLogout: PropTypes.func.isRequired
};

export default connect(null, { authenticationLogout })(Logout);
