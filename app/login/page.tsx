import React, { Suspense } from 'react'
import Login from '../components/login'

const LoginPage = () => {
    return (
        <Suspense >
            <Login />
        </Suspense>
    )
}

export default LoginPage