import React,{Suspense} from "react";
import {
  Route,
  Switch
} from "react-router-dom";

import Auth from "../hoc/auth";
import LandingPage from "./views/LandingPage/LandingPage";
import LoginPage from "./views/LoginPage/LoginPage";
import RegisterPage from "./views/RegisterPage/RegisterPage";
import TheSidebar from "./views/TheSide/TheSidebar";
import Navbar from "./views/Navbar/Navbar"
import 'antd/dist/antd.css';
import { Layout, Breadcrumb } from 'antd';

const { Content } = Layout;
// This site has 3 pages, all of which are rendered
// dynamically in the browser (not server rendered).
//
// Although the page does not ever refresh, notice how
// React Router keeps the URL up to date as you navigate
// through the site. This preserves the browser history,
// making sure things like the back button and bookmarks
// work properly.

function App() {
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
                <Route exact path="/login" component={Auth(LoginPage, false)} />
                <Route exact path="/register" component={Auth(RegisterPage,false)} />
              </Switch>         
            </Content>
        </Layout>
      </Layout>
    </Layout>
      {/* <TheSidebar/> */}
      
        
    </Suspense>
  );
}
export default App;