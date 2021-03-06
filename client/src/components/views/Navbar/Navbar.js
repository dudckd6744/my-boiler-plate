import React from 'react'
import { Layout, Menu } from 'antd';
import "./section/Nav.css"
import RightMenu from './section/RightMenu';
import { HomeOutlined } from '@ant-design/icons';

const { Header,} = Layout;


function Navbar(props) {
    return (
        <Header className="header">
        <div className="logo">
            <a href ="/">
            <h1 style={{marginTop:"-18px", marginLeft:"34px", fontWeight:"bold", color:"darkblue"}} > Wooy</h1>
            </a>
        </div>
        <Menu theme="dark" mode="horizontal"  >

        <Menu.Item key="mail">
            <a href="/"><HomeOutlined  style={{fontSize:"23px", margin:"2px auto"}}/></a>
        </Menu.Item>

        <RightMenu/>

        </Menu>
        </Header>
    )
    
}

export default Navbar
