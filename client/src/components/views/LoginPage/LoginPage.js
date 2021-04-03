import React, { useState } from 'react'
import { withRouter } from "react-router-dom";
import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { loginUser } from "../../../_actions/user_actions"

function LoginPage(props) {

    const dispatch = useDispatch()
    const initialId = localStorage.getItem("rememberMe") ? localStorage.getItem("rememberMe") : '';

    const rememberMeChecked = localStorage.getItem("rememberMe") ? true : false;
    const rememberId = localStorage.getItem("rememberMe") ? localStorage.getItem("rememberMe") : '';

    const [userId, setuserId] = useState(rememberId)
    const [userPassword, setuserPassword] = useState("")
    const [rememberMe, setrememberMe] = useState(rememberMeChecked)

    const handleUserId =(e)=>{
        setuserId(e.currentTarget.value)
    }
    const handleUserPassword =(e)=>{
        setuserPassword(e.currentTarget.value)
    }
    const handleRememberMe = () => {
        setrememberMe(!rememberMe)
    };

    
console.log(initialId)

    const handleSubmit =(e)=>{
        e.preventDefault();

        let body ={
            id: userId,
            password: userPassword
        }

        dispatch(loginUser(body))
        .then(response => {
            if(response.payload.loginSuccess){
                console.log(response.payload)
                window.localStorage.setItem('userId', response.payload.userId);
                message.success("로그인 되었습니다.")
                setTimeout(() => {
                    props.history.push("/")
                }, 2000);
                if (rememberMe === true) {
                    window.localStorage.setItem('rememberMe', response.payload.id);
                } else {
                    localStorage.removeItem('rememberMe');
                }
            }else{
                alert("로그인에 실패하였습니다.")
            } 
        })

    }

    return (
        <Form 
        style={{ maxWidth:"400px" , margin:"10rem auto"}}
        size="large"
        name="normal_login"
        className="login-form"
        >
        <h1 className="animate__animated animate__bounceInDown" style={{textAlign:"center" ,fontWeight:"bold"}}>
        {`<로그인>`}
        </h1>
        <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your Username!' }]}
        >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} 
            value={userId} 
            onChange={handleUserId}
            placeholder="아이디" />
        </Form.Item>
        <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
        >
            <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            value={userPassword}
            onChange={handleUserPassword}
            type="password"
            placeholder="비밀번호"
            />
        </Form.Item>
    
        <Form.Item>
            <Checkbox id="rememberMe" onChange={handleRememberMe} checked={rememberMe} >아이디 저장</Checkbox>
                <a className="login-form-forgot" href="/reset_user" style={{ float: 'right' }}>
                비밀번호를 잊어버리셨나요?
                </a>
            <Button type="primary" 
            onClick={handleSubmit}
            htmlType="submit" 
            style={{minWidth:"100%"}} >
            로그인
            </Button>
            Or <a href="/register">회원가입!</a>
        </Form.Item>
        </Form>
    );
}

export default withRouter(LoginPage)
