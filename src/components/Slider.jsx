import React, { Component } from 'react';
import { Carousel } from 'react-responsive-carousel';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import SliderItem from './SliderItem';

const CarouselStyled = styled(Carousel)`
  margin-bottom: 0.5rem;
  .slide{
    background: transparent !important;
  }
  .control-arrow{
    background-color: darkgray !important;
    opacity: 1;
  }
`;

const H1 = styled.h1`
  margin: 0 0 0.25rem 0;
  font-size: ${props => (props.small ? '1.2rem' : '2rem')};
`;

const Span = styled.span`
  font-size: 1rem;
  font-weight: 400;
  margin-left: 0.5rem;
  vertical-align: middle;
`;

class Slider extends Component {
  state={
    centerSlidePercentage: 50,
  }

  componentDidMount() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    const width = window.innerWidth;
    if (width >= 1200) {
      this.setState({
        centerSlidePercentage: 15,
      });
    }
    if (width >= 992 && width < 1200) {
      this.setState({
        centerSlidePercentage: 25,
      });
    }
    if (width <= 768 && width < 992) {
      this.setState({
        centerSlidePercentage: 33,
      });
    }
    if (width <= 568 && width < 768) {
      this.setState({
        centerSlidePercentage: 50,
      });
    }
    if (width < 568) {
      this.setState({
        centerSlidePercentage: 100,
      });
    }
  }

  render() {
    const {
      header, desc, items, onClick, orderIndex, small, subMenuIndex,
    } = this.props;
    const { centerSlidePercentage } = this.state;
    return (
      <>
        <H1 small={small}>
          {header}
          <Span>{desc}</Span>
        </H1>
        <CarouselStyled
          centerMode
          emulateTouch
          centerSlidePercentage={centerSlidePercentage}
          showIndicators={false}
          showThumbs={false}
          style={{ backgroundColor: 'white' }}
          selectedItem={orderIndex}
        >
          {items.map((item, index) => (
            <SliderItem
              key={`slider${index}`}
              index={index}
              orderIndex={orderIndex}
              subMenuIndex={subMenuIndex}
              name={item.name}
              price={item.price || null}
              subMenuKeys={item.subMenus || null}
              image={item.image}
              onClick={onClick}
              items={item.items}
              small={small}
            />
          ))}
        </CarouselStyled>
      </>
    );
  }
}

Slider.defaultProps = {
  orderIndex: null,
  header: null,
  desc: null,
  small: false,
  subMenuIndex: null,
};

Slider.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string,
  })).isRequired,
  onClick: PropTypes.func.isRequired,
  orderIndex: PropTypes.number,
  subMenuIndex: PropTypes.number,
  header: PropTypes.string,
  desc: PropTypes.string,
  small: PropTypes.bool,
};

export default Slider;
