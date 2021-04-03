import React, { useState } from 'react'
import { withRouter } from "react-router-dom";
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import 'animate.css';
import { useDispatch } from 'react-redux';
import { registerUser } from "../../../_actions/user_actions"

function RegisterPage(props) {
    const dispatch = useDispatch();

    const [userId, setuserId] = useState("")
    const [userPassword, setuserPassword] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("")
    const [userEmail, setuserEmail] = useState("")
    const [userName, setuserName] = useState("")

    const handleUserId =(e)=>{
        setuserId(e.currentTarget.value)
    }
    const handleUserPassword =(e)=>{
        setuserPassword(e.currentTarget.value)
    }
    const handleConfirmPassword =(e)=>{
        setConfirmPassword(e.currentTarget.value)
    }
    const handleUserEmail =(e)=>{
        setuserEmail(e.currentTarget.value)
    }
    const handleUserName =(e)=>{
        setuserName(e.currentTarget.value)
    }

    const handleSubmit =(e)=>{
        e.preventDefault();

        let body ={
            id:userId,
            password:userPassword,
            email:userEmail,
            name:userName
        }
        if(userPassword !== ConfirmPassword){
            return message.warning("비밀번호를 확인해주세요.")
        }
        if(!userId || !userPassword || !ConfirmPassword || !userEmail || !userName){
            return message.warning("모든값을 입력해주세요!")
        }

        dispatch(registerUser(body))
        .then(response => {
            if(response.payload.success){
                console.log(response.payload)
                props.history.push('/login')
            }else{
                message.warning("회원가입에 실패하였습니다.")
            }
        })
    }

    return (
        <Form 
        style={{ maxWidth:"400px" , margin:"5rem auto"}}
        size="large"
        name="normal_login"
        className="login-form"
        >
        <h1 className="animate__animated animate__bounceInDown" style={{textAlign:"center" ,fontWeight:"bold"}}>
        {`<회원가입>`}
        </h1>
        <Form.Item
            name="userId"
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
        <Form.Item
            name="ConfirmPassword"
            rules={[{ required: true, message: 'Please input your Password!' }]}
        >
            <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            value={ConfirmPassword}
            onChange={handleConfirmPassword}
            type="password"
            placeholder="비밀번호확인"
            />
        </Form.Item>
        <Form.Item
            name="userEmail"
            rules={[{ required: true, message: 'Please input your Username!' }]}
        >
            <Input prefix={<UserOutlined className="site-form-item-icon" />}
            value={userEmail}
            onChange={handleUserEmail}
            placeholder="이메일" />
        </Form.Item>
        <Form.Item
            name="userName"
            rules={[{ required: true, message: 'Please input your Username!' }]}
        >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} 
            value={userName}
            onChange={handleUserName}
            placeholder="이름" />
        </Form.Item>
        <Form.Item>
            <Button type="primary" htmlType="submit" onClick={handleSubmit}>
            회원가입
            </Button>
        </Form.Item>
        </Form>
    )
}

export default withRouter(RegisterPage)
