import React from 'react'
import { Button, Flex, Typography } from 'antd'
import { useSelector } from 'react-redux'
import { type RootState } from '../store/store'
import { type iCart } from '../store/slices/sliceCart'
import { ItemCart } from './ItemCart'

const { Text } = Typography

export const Cart: React.FunctionComponent = () => {
  const productToCart = useSelector((state: RootState) => (state.sliceCart.list))
  const totalPrice = (useSelector((state: RootState) => (state.sliceCart.totalPrice))).toFixed(2)
  const totalProducts = useSelector((state: RootState) => (state.sliceCart.totalProducts))

  return (
    <Flex gap="middle" vertical style={{ flexDirection: 'column', justifyContent: 'space-between', gap: 30 }}>

      <Text style={{ fontSize: 20 }}>Корзина / {totalProducts} шт.</Text>
        {productToCart?.map((cart: iCart) => <ItemCart cart={cart} key={cart.arrayProduct.id} />)}

    <Flex gap="large" style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} >
        <Text strong style={{ fontSize: 18 }}>Сумма заказа:  {totalPrice}</Text>
        <Button type="primary">Оформить заказ</Button>
    </Flex>
    </Flex>
  )
}
