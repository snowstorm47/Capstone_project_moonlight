import { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { DashboardOutlined, PieChartOutlined } from '@ant-design/icons';
const { Header, Footer, Sider, Content } = Layout;

// Introduce submenu components
const SubMenu = Menu.SubMenu;

export default class Notification extends Component {
  render() {
    return (
      <Layout>
        <Sider width={256} style={{ minHeight: '100vh' }}>
          <div style={{ height: '32px', background: 'rgba(255,255,255,.2)', margin: '16px' }} />
          <Menu theme='dark' mode='inline' defaultSelectedKeys={['1']}>
            <Menu.Item key='1'>
              <PieChartOutlined /> 
              <span>Helloworld</span>
            </Menu.Item>
            <SubMenu
              key='sub1'
              title={ 
                <span>
                  <DashboardOutlined />
                  <span>Dashboard</span>
                </span>
              }>
              <Menu.Item key='2'>Analysis page</Menu.Item>
              <Menu.Item key='3'>Monitoring page</Menu.Item>
              <Menu.Item key='4'>Workbench</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', textAlign: 'center', padding: 0 }}>Header</Header>
          <Content style={{ margin: '24px 16px 0' }}>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>{this.props.children}</div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    );
  }
}