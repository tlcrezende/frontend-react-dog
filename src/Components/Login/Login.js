import React from 'react'
import { Routes, Route } from 'react-router-dom'
import LoginForm from './LoginForm'
import LoginCreate from './LoginCreate'
import LoginPasswordLost from './LoginPasswordLost'
import LoginPasswordReset from './LoginPasswordReset'

// Aqui já declaro e enumero todas as rotas que terei dentro da pagina de Login
function Login() {
  return (
    <div>Login
      <Routes>
        <Route path="/" element={<LoginForm />}/>
        <Route path="criar" element={<LoginCreate />}/>
        <Route path="perdeu" element={<LoginPasswordLost />}/>
        <Route path="resetar" element={<LoginPasswordReset />}/>
      </Routes>
    </div>
  )
}

export default Login