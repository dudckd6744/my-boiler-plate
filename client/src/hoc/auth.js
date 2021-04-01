import React, { useEffect } from 'react'
import { auth } from"../_actions/user_actions";
import { useDispatch, useSelector } from 'react-redux';
import { message } from 'antd';

export default  function (SpecificComonent, option, adminRoute = null) {
    function AuthenticationCheck(props){


        const user = useSelector(state => state.user)
        const dispatch = useDispatch();

        useEffect(() => {
            
            dispatch(auth())
            .then(response => {
                if(!response.payload.isAuth){
                    if(option){
                        message.warn("로그인이 필요합니다.")
                        props.history.push('/login')
                    }
                }else{
                    if(adminRoute && !response.payload.isAdmin){
                        props.history.push('/')
                    }else{
                        if(option === false){
                            message.warn("로그인된 상태입니다.")
                            props.history.push('/')
                        }
                    }
                }
            })
        }, [])
        return (
            <SpecificComonent {...props} user={user} />
        )
    }
    return AuthenticationCheck
}
// 
