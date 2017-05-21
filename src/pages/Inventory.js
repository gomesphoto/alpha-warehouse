import React, { Component } from 'react';
import styled from 'styled-components';
import FadeIn from '../components/FadeIn';
import Button from '../components/Button';
import inverseLogo from '../assets/alpha-warehouse-inverse.svg';
import { colors, fonts } from '../styles';
import { lineItems as inventory } from '../libraries/inventory.json';

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

const StyledButton = styled(Button)`
  padding: 5px;
  margin: 5px;
  min-width: 10%;
  height: 26px;
  font-size: ${fonts.small};
`;

const BaseTable = styled.div`
  width: 100%;
  font-size: ${fonts.small};
  color: rgb(${colors.dark});
`;

const StyledRow = styled.div`
  width: 100%;
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

const StyledImg = styled.img`
  width: 50px;
  height: 50px;
`;

class Inventory extends Component {
  goToDashboard = () => window.browserHistory.push('/dashboard');

  renderTable = items => items.map(item => (
    <StyledRow key={item.id}>
      <StyledColumn width={10} noPadding><StyledImg src={item.imageUrl} /></StyledColumn>
      <StyledColumn bold width={10}>{item.sku}</StyledColumn>
      <StyledColumn width={80}>{item.productName}</StyledColumn>
    </StyledRow>
  ));

  render() {
    return (
      <StyledWrapper>
        <BaseLayout>
          <BaseHeader>
            <StyledImgWrapper>
              <StyledInverseLogo src={inverseLogo} alt="Alpha Warehouse" />
            </StyledImgWrapper>
            <StyledButton type="submit" white text="Go To Dashboard" onClick={this.goToDashboard} />
          </BaseHeader>
          <BaseTable border="0" cellspacing="0" cellpadding="0">
            <StyledTableHeader>
              <StyledColumn width={10}>Image</StyledColumn>
              <StyledColumn width={10}>SKU</StyledColumn>
              <StyledColumn width={80}>Name</StyledColumn>
            </StyledTableHeader>
            <StyledTableBody>
              {this.renderTable(inventory)}
            </StyledTableBody>
          </BaseTable>
        </BaseLayout>
      </StyledWrapper>
    );
  }
}

export default Inventory;
