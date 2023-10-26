import React from 'react'
import { Flex, Typography, Image } from 'antd'
import { deleteProduct, type iCart } from '../store/slices/sliceCart'
import { DeleteOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { type iProduct } from '../models'

const { Text } = Typography

interface iProps {
  cart: iCart
}

export const ItemCart: React.FunctionComponent<iProps> = ({ cart }) => {
  const dispatch = useDispatch()
  const delProduct = (product: iProduct): void => {
    dispatch(deleteProduct(product))
  }
  return (
    <Flex gap="middle" vertical>
        <Flex>
        <Text strong>{cart.arrayProduct.title}</Text>
        </Flex>
        <Flex gap="large" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
        <Image src={cart.arrayProduct.image} alt={cart.arrayProduct.title} height={45} width={40}/>
        <Text>Кол-во:</Text>
        <Text>{cart.quantity}</Text>
        <Text strong>Цена:</Text><Text>{cart.arrayProduct.price}</Text>
        <DeleteOutlined onClick={() => { delProduct(cart.arrayProduct) }} style={{ color: 'red', cursor: 'pointer', fontSize: '20px' }}/>
        </Flex>
    </Flex>
  )
}
