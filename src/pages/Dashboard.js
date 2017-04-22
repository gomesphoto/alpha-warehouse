import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Modal from '../components/Modal';
import FadeIn from '../components/FadeIn';
import Button from '../components/Button';
import inverseLogo from '../assets/alpha-warehouse-inverse.svg';
import { colors, fonts } from '../styles';
import { dashboardGetOrders, dashboardImportFile, dashboardUpdateSearchQuery } from '../redux/_dashboard';

const StyledWrapper = styled(FadeIn)`
  height: 100vh;
  width: 100vw;
  padding: 30px;
  text-align: center;
`;
const BaseLayout = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgb(${colors.white});
  box-shadow: 1px 4px 5px 2px rgba(${colors.dark}, 0.25);
`;

const BaseHeader = styled.div`
  background-color: rgb(${colors.black});
  min-height: 30px;
  display: flex;
  justify-content: space-between;
`;

const StyledImgWrapper = styled.div`
  width: 15%;
  height: 100%;
  min-width: 100px;
  min-height: 30px;
  display: flex;
  align-items: center;
  margin: 0 10px;
`;

const StyledInverseLogo = styled.img`
  width: 100%;
  margin-top: 2%;
`;

const StyledInput = styled.input`
  background: transparent;
  margin: 5px;
  width: 50%;
  border: 1px solid rgb(${colors.white});
  color: rgb(${colors.white});
`;

const StyledButton = styled(Button)`
  padding: 0;
  min-width: 10%;
  height: 20px;
  font-size: ${fonts.small};
`;

class Dashboard extends Component {
  componentDidMount() {
    this.props.dashboardGetOrders();
  }

  importFileCSV = () => {
    this.props.dashboardImportFile();
  }
  render() {
    return (
      <StyledWrapper>
        <BaseLayout>
          <BaseHeader>
            <StyledImgWrapper>
              <StyledInverseLogo src={inverseLogo} alt="Alpha Warehouse" />
            </StyledImgWrapper>
            <StyledInput onChange={this.props.dashboardUpdateSearchQuery} />
            <StyledButton white text="Import CSV" onClick={this.importFileCSV} />
          </BaseHeader>
        </BaseLayout>
        <Modal show={this.props.modalShow} />
      </StyledWrapper>
    );
  }
}

Dashboard.propTypes = {
  dashboardGetOrders: PropTypes.func.isRequired,
  dashboardImportFile: PropTypes.func.isRequired,
  dashboardUpdateSearchQuery: PropTypes.func.isRequired,
  modalShow: PropTypes.bool.isRequired
};

const reduxProps = ({ dashboard }) => ({
  fetching: dashboard.fetching,
  importFetching: dashboard.importFetching,
  orders: dashboard.orders,
  query: dashboard.query,
  modalShow: dashboard.modalShow
});

export default connect(reduxProps, {
  dashboardGetOrders,
  dashboardImportFile,
  dashboardUpdateSearchQuery
})(Dashboard);
