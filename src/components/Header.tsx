import React from 'react'
import logo from '../assets/img/logo.png'
import { Header } from 'antd/es/layout/layout'
import { Avatar, Button, Flex, Image, Typography } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { setLogin } from '../store/slices/sliceUser'

const { Text } = Typography

export const HeaderApp: React.FunctionComponent = () => {
  const dispatch = useDispatch()

  const logOut = (): void => {
    localStorage.clear()
    dispatch(setLogin(false))
  }
  return (
<Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 15px' }}>
    <Flex style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
        <Image src={logo} width={40}/>
        <Text style={{ color: 'white', fontSize: 20 }}>Fake Store API</Text>
    </Flex>
    <Flex style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
        <Text style={{ color: 'white' }}>User ID</Text>
        <Avatar size={42} icon={<UserOutlined />} />
        <Button type="link" onClick={logOut}>Выйти</Button>
    </Flex>
</Header>
  )
}
