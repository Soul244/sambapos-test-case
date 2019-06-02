import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Text = styled.p`
  margin: 0;
`;

const H4 = styled.h4`
  margin: 0;
  margin-bottom: 0.25rem;
`;

const CheckOutContainer = styled.div`
  display:flex;
  flex-direction: column;
  position: fixed;
  padding: 0.375rem 0.75rem;
  border-radius: 0 8px 0 0;
  bottom: 0;
  left: 0;
  color:black;
  background-color: rgba(255,255,255,1);
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
  z-index:99;
`;

const checkOut = (value, prefix, suffix) => (
  `${value ? `${prefix || ''} ${value || ''} ${suffix || ''}` : ''}`
);

function Checkout({
  orderName, totalPrice, subOrderName, subOrderPrice, selectedSubMenus,
}) {
  return (
    <CheckOutContainer>
      <H4>Checkout</H4>
      <Text>{orderName}</Text>
      <Text style={{ paddingLeft: ' 0.5rem' }}>
        {checkOut(subOrderName, '-')}
        {checkOut(subOrderPrice, '-', '₺')}
      </Text>
      {selectedSubMenus.map(item => (
        <Text>
          {checkOut(item.name, '--')}
          {checkOut(item.price, 'Extra:', '₺')}
        </Text>
      ))}
      <Text>
        {checkOut(totalPrice, 'Total Price:', '₺')}
      </Text>
    </CheckOutContainer>
  );
}

Checkout.defaultProps = {
  orderName: null,
  totalPrice: null,
  subOrderName: null,
  subOrderPrice: null,
  selectedSubMenus: null,
};

Checkout.propTypes = {
  orderName: PropTypes.string,
  totalPrice: PropTypes.number,
  subOrderName: PropTypes.string,
  subOrderPrice: PropTypes.number,
  selectedSubMenus: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.number,
  })),
};

export default Checkout;
