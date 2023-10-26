import React, { useState } from 'react'
import { Card, Button, Typography, Flex, Alert, Rate } from 'antd'
import { type iProduct } from '../models'
import { ShoppingCartOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { getProduct } from '../store/slices/sliceCart'

const { Text } = Typography

const alertCart = (
  <Alert message="Товар добавлен в корзину" type="success" showIcon
  style={{ position: 'fixed', top: 0, left: '50%', transform: 'translateX(-50%)', zIndex: 999 }}/>)

interface iProps {
  product: iProduct
}

export const ProductCard: React.FC<iProps> = ({ product }) => {
  const dispatch = useDispatch()
  const [alert, setAlert] = useState(false)

  const addToCart = (product: iProduct): void => { // добавление товара в корзину
    dispatch(getProduct(product))
    setTimeout(() => { setAlert(false) }, 3000)
  }

  return (
<Flex>
  <Card
    hoverable
    style={{ width: 240, height: 450, padding: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}
    cover={<img alt={product.title}
    src={product.image} style={{ width: 150, maxWidth: 'none', height: 200, justifyContent: 'center' }}/>}
  >
    <Flex style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', gap: 10 }}>

    <Text strong style={{ width: '100%' }}>{product.title}</Text>

    <Rate disabled defaultValue={product.rating.rate} />

    <Flex align={'center'} justify={'space-between'} gap={'large'}>
      <Text strong>Цена:</Text> <Text>{product.price}</Text>
      <Button type="primary" icon={<ShoppingCartOutlined />}
            size={'large'} onClick={() => { addToCart(product); setAlert(true) }}/>
    </Flex>
    </Flex>
  </Card>
  {alert ? alertCart : null}
</Flex>
  )
}
