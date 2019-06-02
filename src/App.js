import React from 'react';
import styled from 'styled-components';
import Slider from './components/Slider';
import Checkout from './components/Checkout';

import menu from './menu';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const Container = styled.div`
  width: 90%;
  margin: 0.5rem auto;
`;

class App extends React.Component {
  state = {
    menus: menu.menus,
    order: {
      name: null,
      index: null,
      subOrder: [],
      subMenus: [],
      selectedSubMenus: [],
    },
    price: null,
  }

  onClickMainMenu = (name, index) => {
    this.setState(prevState => ({
      order: {
        ...prevState.order,
        name,
        index,
        subOrder: [],
        subMenus: [],
        selectedSubMenus: [],
      },
    }));
  };

  onClickSubOrder= (name, index, price, subMenuKeys) => {
    const { menus } = this.state;
    const subMenus = [];
    if (subMenuKeys && subMenuKeys.length > 0) {
      subMenuKeys.forEach((key) => {
        subMenus.push(this.findItems(menus, key));
      });
    }
    this.setState(prevState => ({
      order: {
        ...prevState.order,
        subOrder: {
          name,
          index,
          price,
        },
        selectedSubMenus: [],
        subMenus,
      },
      price,
    }));
  }

  onClickSubMenu= (name, index, price, subMenuKeys, subMenuIndex) => {
    const { order } = this.state;
    const { selectedSubMenus } = order;
    if (!selectedSubMenus[subMenuIndex]) {
      this.setState(prevState => ({
        order: {
          ...prevState.order,
          selectedSubMenus: [
            ...prevState.order.selectedSubMenus,
            {
              name,
              index,
              price,
              subMenuIndex,
            },
          ],
        },
        price: prevState.price + price,
      }));
    } else {
      const copySelectedSubMenus = [...selectedSubMenus];
      copySelectedSubMenus[subMenuIndex] = {
        name,
        index,
        price,
        subMenuIndex,
      };
      this.setState(prevState => ({
        order: {
          ...prevState.order,
          selectedSubMenus: copySelectedSubMenus,
        },
        price: prevState.price + price,
      }));
    }
  }

  findItems= (items, key) => {
    const index = items.findIndex(item => item.key === key);
    return items[index];
  }

  render() {
    const { order, price, menus } = this.state;
    const { subMenus } = order;
    const mainMenu = this.findItems(menus, 'main');
    return (
      <Container>
        <Checkout
          orderName={order.name}
          subOrderName={order.subOrder.name}
          subOrderPrice={order.subOrder.price}
          selectedSubMenus={order.selectedSubMenus}
          totalPrice={price}
        />
        <Slider
          header="Menüler"
          desc={mainMenu.description}
          orderIndex={order.index} // find selected order
          items={mainMenu.items} // send main items inside Main Menu
          onClick={this.onClickMainMenu}
        />
        {order.index != null && (
          <>
            <Slider
              header={order.name}
              orderIndex={order.subOrder.index} // find selected order
              items={mainMenu.items[order.index].items} // sub items of order
              onClick={this.onClickSubOrder}
            />
          </>
        )}
        {subMenus && subMenus.map((item, index) => (
          <Slider
            key={`subMenuSlider${index}`}
            small
            subMenuIndex={index}
            orderIndex={order.selectedSubMenus[index]
              ? order.selectedSubMenus[index].index : null} // find selected order
            header={item.description || item.orderTag}
            items={item.items} // sub items of order
            onClick={this.onClickSubMenu}
          />
        ))}
      </Container>
    );
  }
}

export default App;
