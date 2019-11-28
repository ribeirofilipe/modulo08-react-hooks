import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../../services/api';
import { FlatList } from 'react-native';
import { formatPrice } from '../../util/format';
import * as CartActions from '../../store/modules/cart/actions';
import { connect } from 'react-redux';

import {
  Container,
  Shoe,
  Image,
  Price,
  ProductButton,
  Title,
  CartAdd,
  ProductAmount,
  AddProduct
} from './styles';

export default function Home({ navigation }) {
  const amount = useSelector(state => state.cart.reduce((amount, product) => {
      amount[product.id] = product.amount;

      return amount;
    }, {}),
  );

  const [products, setProducts] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    async function loadProducts() {
      const response = await api.get('/products');

      const data = response.data.map(product => ({
        ...product,
        priceFormatted: formatPrice(product.price),
      }));

      setProducts(data);
    }

    loadProducts();
  }, [products]);

  function handleAddProduct(id) {
    dispatch(CartActions.addToCartRequest(id));

    setTimeout(() => {
      navigation.navigate('Cart');
    }, (300));
  }

    return (
      <Container>
        <FlatList
          horizontal
          data={products}
          keyExtractor={product => String(product.id)}
          renderItem={({ item }) => (
              <Shoe key={item.id}>
                <Image source={{ uri: item.image }} />
                <Title>{item.title}</Title>
                <Price>{item.priceFormatted}</Price>

                <AddProduct onPress={() => handleAddProduct(item.id)}>
                  <ProductButton>
                    <Icon name="add-shopping-cart" size={20} color="#FFF" />
                    <ProductAmount>
                      {amount[item.id] || 0}
                    </ProductAmount>
                  </ProductButton>
                  <CartAdd>ADICIONAR</CartAdd>
                </AddProduct>
              </Shoe>
            )}
          />
      </Container>
    );
  }
