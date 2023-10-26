import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { type iLogin } from '../models'
import { useAuthUserMutation } from '../services/api'
import { setLogin } from '../store/slices/sliceUser'
import { Button, Flex, Input, Layout, Typography } from 'antd'
import { UserOutlined } from '@ant-design/icons'

const { Text } = Typography

export const LoginForm: React.FunctionComponent = () => {
  const navigate: ReturnType<typeof useNavigate> = useNavigate()
  const [fetchAuth] = useAuthUserMutation()
  const [log, setLog] = useState('')
  const [pass, setPass] = useState('')
  const [err, setErr] = useState(false)
  const dispatch = useDispatch()

  const handleSubmit = (log: string, pass: string): void => {
    const bodyLog: iLogin = {
      username: log,
      password: pass
    }

    void fetchAuth({ bodyLog }).unwrap().then((result) => {
      console.log(result)
      if (result?.token !== null) {
        localStorage.setItem('token', result.token)
        dispatch(setLogin(true))
        navigate('/')
      }
    }).catch(() => { setErr(true) })
  }

  return (
    <Layout style = {{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: '#E5E5E5', height: '100vh' }}>
      <Flex style = {{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 20, padding: 24, height: 350, width: 300, background: 'white' }}>
        <Text>Интернет-магазин</Text>

        <Layout style={{ flexDirection: 'column', width: '90%', gap: 5, background: 'transparent' }}>
        <Text style = {{ color: 'gray' }}>Логин</Text>
        <Input size="large" placeholder="Введите логин" prefix={<UserOutlined />} onChange={(e) => { setLog(e.target.value) }} />
        </Layout>

        <Layout style={{ flexDirection: 'column', width: '90%', gap: 5, background: 'transparent' }}>
        <Text style = {{ color: 'gray' }}>Пароль</Text>
        <Input size="large" placeholder="Введите пароль" onChange={(e) => { setPass(e.target.value) }}/>
        </Layout>

        <Button type='primary' onClick={() => { handleSubmit(log, pass) }}>Войти</Button>

        {err ? <Text style={{ color: 'red' }}>Отказано в доступе</Text> : null}
      </Flex>
    </Layout>
  )
}
