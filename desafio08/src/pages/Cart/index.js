import React from 'react';
import * as CartActions from '../../store/modules/cart/actions';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Container,
  Footer,
  FinishButton,
  Total,
  TotalText,
  TotalValue,
  Table,
  FinishButtonText,
  Product,
  Title,
  Image,
  ProductInfo,
  RemoveProduct,
  List,
  Price,
  EmptyCart,
  EmptyText,
  UpdateAmount,
  TotalPrice,
  AddButton,
  RemoveButton,
  Input,
  CartProduct,
  Buttons } from './styles';
import { formatPrice } from '../../util/format';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function Cart({ navigation  }) {
   const cart = useSelector(state => state.cart.map(product => ({
     ...product,
     subtotal: formatPrice(product.price * product.amount),
   })));

   const total = useSelector(state => formatPrice(
     state.cart.reduce((total, product) => {
       return total + product.price * product.amount;
     }, 0)
   ));

   const dispatch = useDispatch();

   function increment(product) {
      dispatch(CartActions.updateAmountRequest(product.id, product.amount + 1));
   }

   function decrement(product) {
    dispatch(CartActions.updateAmountRequest(product.id, product.amount - 1));
   }

   function remove(id) {
    dispatch(CartActions.removeFromCart(id));

    navigation.navigate('Home');
   }

  return (
    <Container>
      {cart.length ?
      <Table>
        <List
          vertical
          data={cart}
          extraData={this.props}
          keyExtractor={product => String(product.id)}
          renderItem={({item}) => (
              <CartProduct>
                <Product>
                  <Image source={{ uri: item.image }} ></Image>
                    <ProductInfo>
                      <Title>{item.title}</Title>
                      <Price>{item.priceFormatted}</Price>
                    </ProductInfo>
                  <RemoveProduct onPress={() => remove(item.id)}>
                    <Icon name="delete-forever" size={24} color='#7159c1'/>
                  </RemoveProduct>
                </Product>

                <UpdateAmount>
                  <Buttons>
                    <RemoveButton>
                    <Icon
                        name="remove-circle-outline"
                        size={20}
                        color="#7159c1"
                        onPress={() => decrement(item)}
                      />
                    </RemoveButton>
                    <Input readOnly >{item.amount}</Input>
                    <AddButton>
                      <Icon
                        name="add-circle-outline"
                        size={20}
                        color="#7159c1"
                        onPress={() => increment(item)}
                      />
                    </AddButton>
                  </Buttons>
                  <TotalPrice>{item.subtotal}</TotalPrice>
                </UpdateAmount>
              </CartProduct>
          )}
        />
          <Footer>
            <Total>
              <TotalText>TOTAL</TotalText>
              <TotalValue>{total}</TotalValue>
            </Total>
            <FinishButton>
              <FinishButtonText>FINALIZAR PEDIDO</FinishButtonText>
            </FinishButton>
          </Footer>
        </Table> :

        <EmptyCart>
          <Icon name="remove-shopping-cart" size={64} color="#eee" />
          <EmptyText>Seu carrinho está vazio.</EmptyText>
        </EmptyCart>}
    </Container>
  );
}
