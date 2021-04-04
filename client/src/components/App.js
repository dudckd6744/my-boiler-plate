import React,{Suspense} from "react";
import {
  Route,
  Switch,
  withRouter
} from "react-router-dom";

import Auth from "../hoc/auth";
import TheSidebar from "./views/TheSide/TheSidebar";
import Navbar from "./views/Navbar/Navbar"
import LoginPage from "./views/LoginPage/LoginPage";
import LandingPage from "./views/LandingPage/LandingPage"
import RegisterPage from "./views/RegisterPage/RegisterPage"
import { Layout, Breadcrumb } from 'antd';
import 'antd/dist/antd.css';

const { Content } = Layout;

function App() {
  
  // console.log(user)
  if(!localStorage.getItem("userId")){
  return (
      <Suspense fallback={(<div>Loading...</div>)}>
        <Layout>
          <Navbar/>
          <Layout>
          <TheSidebar/>
          <Layout style={{ padding: '0 24px 24px' }}>
              <Breadcrumb style={{ margin: '16px 0' }}>
              {/* <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item> */}
              </Breadcrumb>
              <Content
              className="site-layout-background"
              style={{
                  padding: 24,
                  margin: 0,
                  minHeight: 820,
              }}
              >
                <Switch>
                  <Route exact path="/" component={Auth(LandingPage, null)} />
                  {/* <Route exact path="/login" component={Auth(LoginPage, false)} /> 
                  <Route exact path="/register" component={Auth(RegisterPage,false)} />  */}
                </Switch>         
              </Content>
          </Layout>
        </Layout>
      </Layout>          
      </Suspense>
    )
  }
  else{
    
    return (
      <Suspense fallback={(<div>Loading...</div>)}>
        <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
          <Switch>
            {/* <Route exact path="/" component={Auth(LandingPage, null)} /> */}
            <Route exact path="/login" component={Auth(LoginPage, false)} />
            <Route exact path="/register" component={Auth(RegisterPage, false)} />
          </Switch>
        </div>
      </Suspense>
    );
    
}
}
  
  

export default withRouter(App);