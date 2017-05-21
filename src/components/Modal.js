import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Form from './Form';
import Select from './Select';
import Section from './Section';
import Input from './Input';
import { colors, transitions } from '../styles';

const StyledModal = styled.div`
  height: 100vh;
  width: 100vw;
  text-align: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2;
  will-change: opacity;
  background-color: rgba(${colors.black}, 0.7);
  opacity: ${({ show }) => show ? 1 : 0};
  visibility: ${({ show }) => show ? 'visible' : 'hidden'};
  pointer-events: ${({ show }) => show ? 'auto' : 'none'};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledCard = styled.div`
  position:relative;
  width: 100%;
  max-width: 500px;
  padding: 15px;
  background-color: rgb(${colors.white});
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledCloseButton = styled.div`
  width: 35px;
  height: 35px;
  position: absolute;
  transform: rotate(45deg);
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    opacity: 0.5;
  }
`;

const StyledFirstLine = styled.div`
  position: absolute;
  width: 60%;
  border: 1px solid black;
  transition: ${transitions.base}
`;

const StyledSecondLine = styled.div`
  position: absolute;
  width: 60%;
  border: 1px solid black;
  transform: rotate(90deg);
`;

const StyledFlex = styled.div`
  display: flex;
`;

const StyledHalf = styled.div`
  width: 50%;
`;

const StyledLabel = styled.label`
  display: flex;
  width: 30%;
  align-items: center;
  font-weight: 700;
`;

const StyledBillingToggle = styled.div`
  width: 50%;
  font-weight: 700;
  margin: 10px auto;
  padding: 5px;
  transition: ${transitions.base};
  background-color: ${({ active }) => active ? `rgb(${colors.darkGrey})` : `rgb(${colors.grey})`}
  border-radius: 5px;
`;

const StyledSection = styled(Section)`
  display: ${({ show }) => show ? 'block' : 'none'};
`;

class Modal extends Component {
  state = {
    platform: '',
    orderNumber: '',
    paymentMethod: '',
    shippingAmountPaid: '',
    customerName: '',
    customerEmail: '',
    shippingAddress1: '',
    shippingAddress2: '',
    shippingCity: '',
    shippingState: '',
    shippingPostalCode: '',
    shippingCountry: '',
    billingShippingCopy: false,
    billingAddress1: '',
    billingAddress2: '',
    billingCity: '',
    billingState: '',
    billingZipCode: '',
    billingCountry: '',
    lineItems: [],
  }
  toggleBilling = () => {
    if (!this.state.billingShippingCopy) {
      this.setState({
        billingAddress1: this.state.shippingAddress1,
        billingAddress2: this.state.shippingAddress2,
        billingCity: this.state.shippingCity,
        billingState: this.state.shippingState,
        billingZipCode: this.state.shippingZipCode,
        billingCountry: this.state.shippingCountry,
        billingShippingCopy: true
      });
    } else {
      this.setState({
        billingAddress1: '',
        billingAddress2: '',
        billingCity: '',
        billingState: '',
        billingZipCode: '',
        billingCountry: '',
        billingShippingCopy: false
      });
    }
  }
  render = () => (
    <StyledModal show={this.props.show}>
      <StyledCard>
        <StyledCloseButton onClick={this.props.toggleModal}>
          <StyledFirstLine />
          <StyledSecondLine />
        </StyledCloseButton>
        <h1>Add a new order</h1>
        <Form>
          <StyledFlex>
            <StyledHalf>
              <StyledFlex>
                <StyledLabel>Platform</StyledLabel>
                <Select onChange={({ target }) => this.setState({ platform: target.value })} options={['Squarespace', 'Asos', 'Depop', 'Etsy', 'Facebook', 'Instagram', 'Offline']} />
              </StyledFlex>
            </StyledHalf>
            <StyledHalf>
              <StyledFlex>
                <StyledLabel>Payment Method</StyledLabel>
                <Select onChange={({ target }) => this.setState({ paymentMethod: target.value })} options={['Debit/Credit Card', 'Bank Transfer', 'Paypal', 'Cash']} />
              </StyledFlex>
            </StyledHalf>
          </StyledFlex>
          <Section label="Shipping Details">
            <Input
              label="Customer Name"
              value={this.state.customerName}
              onValueChange={value => this.setState({ customerName: value })}
            />
            <Input
              label="Customer Email"
              value={this.state.customerEmail}
              onValueChange={value => this.setState({ customerEmail: value })}
            />
            <Input
              label="Shipping Address 1"
              value={this.state.shippingAddress1}
              onValueChange={value => this.setState({ shippingAddress1: value })}
            />
            <Input
              label="Shipping Address 2"
              value={this.state.shippingAddress2}
              onValueChange={value => this.setState({ shippingAddress2: value })}
            />
            <Input
              label="Shipping City"
              value={this.state.shippingCity}
              onValueChange={value => this.setState({ shippingCity: value })}
            />
            <Input
              label="Shipping State"
              value={this.state.shippingState}
              onValueChange={value => this.setState({ shippingState: value })}
            />
            <Input
              label="Shipping Postal Code"
              value={this.state.shippingPostalCode}
              onValueChange={value => this.setState({ shippingPostalCode: value })}
            />
            <Input
              label="Shipping Country"
              value={this.state.shippingCountry}
              onValueChange={value => this.setState({ shippingCountry: value })}
            />
          </Section>

          <StyledBillingToggle
            active={this.state.billingShippingCopy}
            onClick={this.toggleBilling}
          >
            Same as Shipping Address
          </StyledBillingToggle>

          <StyledSection show={!this.state.billingShippingCopy} label="Billing Details">
            <Input
              label="Customer Name"
              value={this.state.customerName}
              onValueChange={value => this.setState({ customerName: value })}
            />
            <Input
              label="Customer Email"
              value={this.state.customerEmail}
              onValueChange={value => this.setState({ customerEmail: value })}
            />
            <Input
              label="Billing Address 1"
              value={this.state.billingAddress1}
              onValueChange={value => this.setState({ billingAddress1: value })}
            />
            <Input
              label="Billing Address 2"
              value={this.state.billingAddress2}
              onValueChange={value => this.setState({ billingAddress2: value })}
            />
            <Input
              label="Billing City"
              value={this.state.billingCity}
              onValueChange={value => this.setState({ billingCity: value })}
            />
            <Input
              label="Billing State"
              value={this.state.billingState}
              onValueChange={value => this.setState({ billingState: value })}
            />
            <Input
              label="Billing Postal Code"
              value={this.state.billingPostalCode}
              onValueChange={value => this.setState({ billingPostalCode: value })}
            />
            <Input
              label="Billing Country"
              value={this.state.billingCountry}
              onValueChange={value => this.setState({ billingCountry: value })}
            />
          </StyledSection>
        </Form>
      </StyledCard>
    </StyledModal>
  );
}

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired
};

export default Modal;
