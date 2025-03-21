
import { createCookieSessionStorage } from 'react-router-dom'
import { create } from "zustand"


interface UserAuth {
    token: string
    setToken: : () => void
}