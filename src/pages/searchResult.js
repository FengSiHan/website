import React from 'react'
import {List, Avatar, Layout,Button, message} from 'antd'
import AcHeader from '../controls/acHeader'
import AcFooter from '../controls/acFooter'
import './css/searchResult.css'

const { Content } = Layout;
class SearchResult extends React.Component {
  constructor(props)
  { 
    super(props);

    var paras = this.props.location.state;
    var result = !(!paras) && paras.hasOwnProperty("logined");
    var logined = false;
    if (result === true)
    {
        logined = paras.logined;
    }
    this.state = {logined: logined};
    
    /*
      初始化其他部分
    */
  }

  render() {
      const listData=[];
      for (let i=0;i<25;i++)
      {
          listData.push(
              {
                  id:i,
                  name:'kjqsb'+i,
                  org:'kjqsbsbsblaiyuan',
                  papernum:i*5,
                  citation:i*11,
                  field:'sfsdafasdf'
              }
          )
      }
    return (
      <Layout className="sr-layout">
        <AcHeader logined={this.state.logined} homePage={false}/>
        <Content className="sr-content">
        <List
            grid=
            {
              {
                gutter: 200,
                column:2
              }
            }
            itemLayout="vertical"
            size="large"
            pagination={{pageSize:6}}
            dataSource={listData}
            renderItem=
            {
                item =>
                (
                  <List.Item
                    key={item.id}
                  >
                  <List.Item.Meta
                    avatar={<Avatar icon="user" size={64}/>}
                    title={<p style={{textAlign:"left"}}>{item.name}</p>/*<link to={'/detail'+item.id}>{item.name}</link>*/}
                    description={
                      <div style={{textAlign:"left" }}>
                        <div style={{float:"left"}}>
                          <p >{item.org}</p>    
                          <p style={{whiteSpace:"pre-wrap"}}>发表文章：{item.papernum}     被引次数：{item.citation}</p>      
                          <p>研究领域：{item.field}</p>                     
                        </div>
                        <div style={{float:"right"}}>
                          <Button  type="default" onClick={() =>message.info("button")}>详细信息</Button> 
                        </div>
                         </div>
                  }
                  />
                </List.Item>
                )
            }
          />
        </Content>
        <AcFooter />
      </Layout>
    );
  }
}

export default SearchResult;
