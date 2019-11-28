import React from 'react';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Container, Cart, CartItens, LogoHeader} from './styles';


export default function Header({ navigation, cartSize }) {
  const cartSize = useSelector(state => state.cart.length);

  return (
      <Container>
        <LogoHeader />
        <Cart onPress={() => navigation.navigate('Cart') }>
          <Icon name="shopping-basket" size={24} color="#FFF" />
          <CartItens>{cartSize || 0}</CartItens>
        </Cart>
      </Container>
    );
}
