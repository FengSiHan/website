import React from 'react'
import {List, Avatar, Layout,Button, message,Table} from 'antd'
import AcHeader from '../controls/acHeader'
import AcFooter from '../controls/acFooter'
import './css/searchResult.css'

class ResultShow extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state={type:this.props.type};
  }
  render()
  {
    const listData=[];
    if (this.state.type===2)
    {
      const columns =
      [
        {
          title:'题名',
          dataIndex:'title'
        },
        {
          title:'作者',
          dataIndex:'author'
        },
        {
          title:'来源',
          dataIndex:'source'
        },
        {
          title:'发布时间',
          dataIndex:'time'
        },
        {
          title:'引用',
          dataIndex:'citation'
        },
        {
          title:'下载',
          dataIndex:'download'
        },
        {
          title:'所属领域',
          dataIndex:'field'
        }
      ];
      for (let i=0;i<25;i++)
      {
          listData.push(
              {
                  id:i,
                  title:'kjqsbsadddddddddddddddddddddddddddd'+i,
                  author:'laiyuan',
                  source:"kkkkk",
                  time:"???",
                  citation:i*11,
                  download:i*5,
                  field:'sfsdafasdf'
              }
          )
      }
      return(
        <Table
          columns={columns} dataSource={listData}
        />
      );
    }
    else 
    {
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
      return(
        <List
            grid=
            {
              {
                gutter: 200,
                column:2
              }
            }
            loading
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
      );
    }
  }
}


const { Content } = Layout;
class SearchResult extends React.Component {
  constructor(props)
  { 
    super(props);

    var paras = this.props.location.state;
    try {
      this.state = {logined: paras.logined,type:paras.type,value:paras.value};
    } catch (error) {
        this.state = {logined: false,type:2,value:""};//
    }

    
    
    /*
      初始化其他部分
    */
  }

  render() {
      
      message.info(this.state.value);
      /*
        获取数据传入listdata，名称如下两个for循环
      */
      

    //let resultlist;
    
    return (
      <Layout className="sr-layout">
        <AcHeader logined={this.state.logined} homePage={false} type={this.state.type} />
        <Content className="sr-content">
          <ResultShow type={this.state.type}/>
        </Content>
        <AcFooter />
      </Layout>
    );
  }
}

export default SearchResult;
