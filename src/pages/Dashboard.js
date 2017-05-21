import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Modal from '../components/Modal';
import FadeIn from '../components/FadeIn';
import Button from '../components/Button';
import Form from '../components/Form';
import Select from '../components/Select';
import PlusButton from '../components/PlusButton';
import searchIcon from '../assets/search.svg';
import CircleButton from '../components/CircleButton';
import inverseLogo from '../assets/alpha-warehouse-inverse.svg';
import { colors, fonts, responsive } from '../styles';
import { getOrderStatus, ellipseText, parseName, getCurrencySymbol } from '../helpers/utilities';
import { dashboardImportFile, dashboardUpdateSearchQuery, dashboardToggleModal } from '../redux/_dashboard';
import CSVToArray from '../libraries/csvtoarray';

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
  padding: 5px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledForm = styled(Form)`
  display: flex;
  position: relative;
  margin: 5px;
  padding: 0;
  padding-left: 20px;
  width: 60%;
  @media (${responsive.sm.max}) {
    width: 45%;
  }
`;

const StyledSearchWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const StyledImgWrapper = styled.div`
  width: 18%;
  height: 100%;
  min-width: 120px;
  min-height: 30px;
  display: flex;
  align-items: center;
  margin: 0 10px;
`;

const StyledInverseLogo = styled.img`
  width: 100%;
  margin-top: 4%;
`;

const StyledInput = styled.input`
  padding: 5px;
  width: 100%;
  padding-left: 24px;
  line-height: 1.2;
  font-size: ${fonts.small};
  background: transparent;
  color: rgb(${colors.white});
  border: 1px solid rgb(${colors.white});
`;

const StyledSelectWrapper = styled.div`
  width: 85px;
  height: 26px;
`;

const StyledIcon = styled.img`
  width: 20px;
  height: 20px;
  position: absolute;
  top: 3px;
  left: 5px;
`;

const StyledButton = styled(Button)`
  padding: 5px;
  margin: 5px;
  min-width: 10%;
  max-width: 100px;
  height: 26px;
  font-size: ${fonts.small};
`;

const StyledPlusButton = styled(PlusButton)`
  margin-right: 20px;
`;

const StyledInputFile = styled.input`
  display: none;
  pointer-events: none;
  opacity: 0;
  visibility: hidden;
`;

const BaseTable = styled.div`
  width: 100%;
  font-size: ${fonts.small};
  color: rgb(${colors.dark});
`;

const StyledRow = styled.div`
  width: 100%;
  height: 45px;
  position: relative;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-around;
  border-bottom: 1px solid #222;
  padding: 5px 0;
  &:hover {
    background-color: rgba(${colors.lightGrey}, 0.7);
  }
`;

const StyledTableHeader = styled(StyledRow)`
  background: rgb(${colors.lightGrey});
  & td {
    font-size: ${fonts.medium};
    font-weight: 400;
  }
`;

const StyledTableBody = styled.div`
  width: 100%;
  height: calc(100vh - 140px);
  position: relative;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  overflow-y: scroll;
`;

const StyledColumn = styled.div`
  display: flex;
  text-align: left !important;
  justify-content: flex-start;
  align-items: center;
  flex-grow: ${({ flex }) => flex || 'inherit'};
  padding: ${({ noPadding }) => noPadding ? 'none' : '5px 10px'};
  width: ${({ width }) => `${width}%` || 'auto'};
  font-size: ${({ bold }) => bold ? fonts.medium : 'inherit'};
  font-weight: ${({ bold }) => bold ? 500 : 'inherit'};
`;

class Dashboard extends Component {

  toggleUpload = () => this.fileInput.click(({ target }) => target.value);

  convertCSVtoJSON = () => {
    const file = this.fileInput.files[0];
    const reader = new FileReader();
    reader.onload = ({ target }) => this.props.dashboardImportFile(CSVToArray(target.result));
    reader.readAsText(file);
  }

  renderTable = (orders) => {
    let lastOrderID = null;
    const render = orders.map((order) => {
      if (lastOrderID === order.orderID) return null;
      lastOrderID = order.orderID;
      return (
        <StyledRow key={order.orderID}>
          <StyledColumn width={6} noPadding><CircleButton /></StyledColumn>
          <StyledColumn bold width={10}>{`#${order.orderID}`}</StyledColumn>
          <StyledColumn width={12}>{moment(order.createdAt).format('DD/MM/YYYY')}</StyledColumn>
          <StyledColumn width={14}>{parseName(order.shippingName)}</StyledColumn>
          <StyledColumn width={40}>{`${ellipseText(order.shippingAddress1, 12, true)} ${order.shippingCity} ${order.shippingZip} ${order.shippingCountry}`}</StyledColumn>
          <StyledColumn width={8}>{`${getCurrencySymbol(order.currency)} ${order.total}`}</StyledColumn>
          <StyledColumn width={10}>{getOrderStatus(order)}</StyledColumn>
        </StyledRow>
      );
    });
    return render;
  }

  render() {
    return (
      <StyledWrapper>
        <BaseLayout>
          <BaseHeader>
            <StyledImgWrapper>
              <StyledInverseLogo src={inverseLogo} alt="Alpha Warehouse" />
            </StyledImgWrapper>
            <StyledForm>
              <StyledSelectWrapper>
                <Select options={['Item', 'Status', 'Name', 'Address']} />
              </StyledSelectWrapper>
              <StyledSearchWrapper>
                <StyledIcon src={searchIcon} />
                <StyledInput placeholder="Search Orders" onChange={this.props.dashboardUpdateSearchQuery} />
              </StyledSearchWrapper>
            </StyledForm>
            <StyledInputFile type="file" accept=".csv" onChange={this.convertCSVtoJSON} innerRef={c => this.fileInput = c} />
            <StyledPlusButton white onClick={this.props.dashboardToggleModal} />
            <StyledButton type="submit" white text="Import CSV" onClick={this.toggleUpload} />
          </BaseHeader>
          <BaseTable border="0" cellspacing="0" cellpadding="0">
            <StyledTableHeader>
              <StyledColumn width={6} noPadding>{''}</StyledColumn>
              <StyledColumn width={10}>Order ID</StyledColumn>
              <StyledColumn width={12}>Date</StyledColumn>
              <StyledColumn width={14}>Customer Name</StyledColumn>
              <StyledColumn width={40}>Customer Address</StyledColumn>
              <StyledColumn width={8}>Total</StyledColumn>
              <StyledColumn width={10}>Status</StyledColumn>
            </StyledTableHeader>
            <StyledTableBody>
              {this.renderTable(this.props.orders)}
            </StyledTableBody>
          </BaseTable>
        </BaseLayout>
        <Modal show={this.props.modalShow} toggleModal={this.props.dashboardToggleModal} />
      </StyledWrapper>
    );
  }
}

Dashboard.propTypes = {
  dashboardImportFile: PropTypes.func.isRequired,
  dashboardUpdateSearchQuery: PropTypes.func.isRequired,
  dashboardToggleModal: PropTypes.func.isRequired,
  modalShow: PropTypes.bool.isRequired,
  orders: PropTypes.array.isRequired
};

const reduxProps = ({ dashboard }) => ({
  fetching: dashboard.fetching,
  importFetching: dashboard.importFetching,
  orders: dashboard.orders,
  query: dashboard.query,
  modalShow: dashboard.modalShow
});

export default connect(reduxProps, {
  dashboardImportFile,
  dashboardUpdateSearchQuery,
  dashboardToggleModal
})(Dashboard);
