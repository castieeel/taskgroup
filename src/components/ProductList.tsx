import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { type RootState } from '../store/store'
import { type iProduct } from '../models'
import { useLazyGetProductsQuery } from '../services/api'
import { ManOutlined, ShoppingCartOutlined, SketchOutlined, ThunderboltOutlined, WomanOutlined } from '@ant-design/icons'
import { Flex, Layout, Menu, Spin, theme } from 'antd'
import { ProductCard } from './ProductCard'
import { Cart } from './Cart'
import { HeaderApp } from './Header'

const { Sider, Content } = Layout

export const ProductList: React.FunctionComponent = () => {
  const { token: { colorBgContainer } } = theme.useToken()
  const [cart, setCart] = useState(false)
  const [fetchQuery, { data: products, isLoading }] = useLazyGetProductsQuery()
  const countToCart: number = useSelector((state: RootState) => (state.sliceCart.totalProducts))

  const handleClick = (categories: string): void => {
    void fetchQuery({ categories })
    setCart(false)
  }

  return (
    <Layout style={{ flexDirection: 'column' }}>
      <HeaderApp/>
    <Layout style={{ flexDirection: 'row', minHeight: '100vh' }}>
      <Sider trigger={null} style={{ paddingTop: 5 }} collapsible>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <WomanOutlined />,
              label: 'Женская одежда',
              onClick: () => { handleClick('women%27s%20clothing') }
            },
            {
              key: '2',
              icon: <ManOutlined />,
              label: 'Мужская одежда',
              onClick: () => { handleClick('men%27s%20clothing') }
            },
            {
              key: '3',
              icon: <SketchOutlined />,
              label: 'Бижутерия',
              onClick: () => { handleClick('jewelery') }
            },
            {
              key: '4',
              icon: <ThunderboltOutlined />,
              label: 'Электроника',
              onClick: () => { handleClick('electronics') }
            },
            {
              key: '5',
              icon: <ShoppingCartOutlined />,
              label: `Корзина (${countToCart})`,
              onClick: () => { setCart(true) }
            }
          ]}
        />
      </Sider>
      <Layout style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      { isLoading
        ? <Spin size="large"/>
        : <Content
          style={{
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            width: '100%'
          }}
        >
         <Flex align='center' justify='flex-start' gap={'large'} wrap='wrap'>
         {cart
           ? <Cart/>
           : products?.map((product: iProduct) => <ProductCard product={product} key={product.id}/>)}
          </Flex>
        </Content>}
        </Layout>
      </Layout>
    </Layout>
  )
}
