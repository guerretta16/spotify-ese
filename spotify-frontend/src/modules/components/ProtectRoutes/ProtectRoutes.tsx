import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAppSelector } from '../../../app/hooks'

interface Prop {
    children: React.ReactNode
}

const ProtectRoutes = ({children} : Prop) => {

    const access_token = useAppSelector(state => state.persistedReducer.spotifyToken.access_token);

    if(access_token == ""){
        return <Navigate to='/' replace={true}/>
    }

    return <>{children}</>

}

export default ProtectRoutes