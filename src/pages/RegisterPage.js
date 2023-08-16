import React, { useState } from 'react'

const RegisterPage = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const register = async (ev) => {
        ev.preventDefault()
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/register`, {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' }
        })
        console.log(response)
        if (response.status === 200) {
            alert('Registration Successfull')
        }
        else
            alert('Registration Failed. Try again Later')
    }
    return (
        <div>
            <form className='register' onSubmit={register}>
                <h1>Register</h1>
                <input type='text' placeholder='username' value={username} onChange={ev => setUsername(ev.target.value)} />
                <input type='password' placeholder='password' value={password} onChange={ev => setPassword(ev.target.value)} />
                <button>Register</button>
            </form>
        </div>
    )
}

export default RegisterPage
