import React from 'react'
import { Layout } from 'antd';

import AcHeader from './acHeader'

const { Content, Footer } = Layout;

function App()
{
  return (
    <Layout className="layout">
      <AcHeader/>
      <Content style={{ padding: '0 50px'}}>
        <div style={{ background:'#fff', padding: 24, minHeight:280}}>Content</div>
      </Content>
      <Footer style={{textAlign: "center"}}>
          ssad group @2019 Created by front-end
      </Footer>
    </Layout>
  );
}
export default App;