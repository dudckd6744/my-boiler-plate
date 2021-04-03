import React from 'react'
import {Menu, message } from 'antd';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { withRouter } from "react-router-dom";

function RightMenu(props) {
    const user = useSelector(state => state.user)

    const LogoutHandler =()=>{
        axios.get('/api/users/logout')
        .then(response => {
            if(response.status===200){
                console.log(response)
                props.history.push("/login")
            }else{
                message.warn("로그아웃에 실패하였습니다.")
            }
        })
    }

    if (user.userData && !user.userData.isAuth) {
        return (
            <Menu style={{float:"right"}} theme="dark" mode={props.mode} >
                <Menu.Item key="mail" style={{fontWeight:"bold"}}>
                    <a href="/login">로그인</a>
                </Menu.Item>
                <Menu.Item key="app" style={{fontWeight:"bold"}}>
                    <a href="/register">회원가입</a>
                </Menu.Item>        
            </Menu>
        )
    }else{
        return (
            <Menu style={{float:"right"}} theme="dark" mode={props.mode} >
                <Menu.Item key="logout" style={{fontWeight:"bold"}}>
                    <a onClick={LogoutHandler}>로그아웃</a>
                </Menu.Item>     
            </Menu>
        )
    }
    
}

export default withRouter(RightMenu)
