import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const SliderItemStyled = styled.div`
  position: relative;
  height: ${props => (props.small ? '120px' : '240px')}
  margin-right: 0.25rem;
`;

const Image = styled.div`
    background: url(${props => props.src});
    background-position: center;
    background-size: cover;
    width: 100%;
    height: 100%;
    display:inline-block;
    position: relative;
    :after{
      content: "";
      position: absolute;
      background-color: ${props => (props.selected ? 'rgba(255, 69, 0, 0.8)' : 'transparent')};;
      display:block;
      width: 100%;
      height: 100%;
    }
    :hover {
      :after{
        content: "";
        position: absolute;
        background-color: rgba(255, 69, 0, 0.3);
        transition: 0.4s;
      }
    }
`;

const TextContainer = styled.div`
  position: absolute;
  content:"";
  bottom:0;
  left: 0;
  color: white;
  font-weight: 500;
  width: 100%;
  background: rgba(0,0,0,0.7);
`;

const TextInnerContainer = styled.div`
  padding: 0.375rem 0.75rem;
  font-weight: 600;
`;

function SliderItem({
  name, price, subMenuKeys, image, index, onClick, orderIndex, subMenuIndex, small,
}) {
  return (
    <SliderItemStyled
      onClick={() => onClick(
        name,
        index,
        price,
        subMenuKeys,
        subMenuIndex,
      )}
      small={small}
    >
      <Image src={image} selected={orderIndex === index} />
      <TextContainer>
        <TextInnerContainer>
          {name}
        </TextInnerContainer>
      </TextContainer>
    </SliderItemStyled>
  );
}

SliderItem.defaultProps = {
  price: null,
  orderIndex: null,
  small: false,
  name: null,
  subMenuIndex: null,
  subMenuKeys: null,
};

SliderItem.propTypes = {
  name: PropTypes.string,
  price: PropTypes.number,
  image: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  orderIndex: PropTypes.number,
  small: PropTypes.bool,
  subMenuIndex: PropTypes.number,
  subMenuKeys: PropTypes.array,
};

export default SliderItem;
