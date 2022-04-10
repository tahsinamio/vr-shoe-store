import React, { useState, useEffect } from 'react'
import DesoIdentity from './libs/desoIdentity'
const IdentityUsersKey = 'identityUsersV2'
import DesoApi from './libs/desoApi'
import { setConstantValue } from 'typescript'

export default function login() {
    const [loggedIn, setLoggedIn] = useState(false)
    const [userloggedin, setuserloggedin] = useState(false)
    const [toUsername, setToUsername] = useState('@MelanieJ')
    const [message, setMessage] = useState('👉 waiting for you to send your GM...')
    const [publicKey, setSetPublicKey] = useState(null)
    const [desoIdentity, setDesoIdentity] = useState(null)
    const [desoApi, setDesoApi] = useState(null)

    useEffect(() => {
        const di = new DesoIdentity()
        setDesoIdentity(di)
        const da = new DesoApi()
        setDesoApi(da)

        let user = {}
        if (localStorage.getItem(IdentityUsersKey) === 'undefined') {
            user = {}
        } else if (localStorage.getItem(IdentityUsersKey)) {
            user = JSON.parse(localStorage.getItem(IdentityUsersKey) || '{}')
        }

        if (user.publicKey) {
            setLoggedIn(true)
            setSetPublicKey(user.publicKey)
        }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const login = async () => {
        const user = await desoIdentity.loginAsync(4)
        setSetPublicKey(user.publicKey)
        setLoggedIn(true)
    }

    const onClick = () => {
        login()
        setuserloggedin(true)
    }

    return (
        <div className={'loginBtn'}>
            <button className={'button-23'} onClick={onClick}>
                {loggedIn ? 'LoggedIn' : 'LogIn'}
            </button>
        </div>
    )
}
