import React from 'react'
import { Layout,Avatar, message,List, Divider } from 'antd';
import AcHeader from '../controls/acHeader'
import AcFooter from '../controls/acFooter'
import { withRouter } from 'react-router-dom';
//import AcThesisDetail from '../controls/acThesisDetail'   
import './css/expertPage.css'
import { list } from 'postcss';


const { Content } = Layout;


class ExpertPage extends React.Component {
  constructor(props)
  { 
    super(props);

    try {
      this.state = this.props.location.state;
    } catch (error) {
      this.state = {loginInfo: {isExpert: false, logined: false, un:''}};
    }
    if (this.state === undefined )
    {
        this.state = {loginInfo: {isExpert: false, logined: false, un:''}};
    }

    this.state.expertdata={};
    this.state.thesisdata=[];
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
                  title:'title',
                  author:'laiyuan',
                  source:"kkkkk",
                  time:"???",
                  citation:i*11,
                  download:i*5,
                  points:i+3,
                  field:'sfsdafasdf'
            }
        )
    }
    var edata={
        id:5,
        name:'expertname',
        org:'orginazation',
        papernum:5,
        citation:11,
        field:'field'
    }
    //this.setState({expertdata:edata,thesisdata:listData});
    message.info(edata.name);
    return (
      <Layout className="ep-layout">
        <AcHeader loginInfo={this.state.loginInfo} homePage={false}/>
        <Content className="ep-content">
          {/*
              页面控件放置的地方


        //  <AcThesisDetai  visible={this.state.thesisVisible} onCancel={()=>this.setState({thesisvisible: false})} data={this.state.thesisData} />

              以下是跳转的标准写法
              <Link to={{pathname: '/？？？', state: {lastUrl: this.props.location.pathname, loginInfo: this.state.loginInfo }}}>   
                <其他控件>
              </Link>
          */}

          <div className='ep-card'> 
              <div className='ep-avatar-div'>
                <Avatar icon="user" size={142}/>
              </div>
              <div className='ep-detail-div'>
                  <p className='e-name'>{edata.name}</p>
                  <p>{edata.org}</p>
                  <p style={{whiteSpace:"pre-wrap"}}>发表文章：{edata.papernum}     被引次数：{edata.citation}</p>      
                  <p>研究领域：{edata.field}</p>   
              </div>
          </div>
          <Divider/>
          <br/>
          <div>
            <div>
                <List
                    itemLayout="vertical"
                    size="large"
                    pagination={{pageSize:7}}
                    dataSource={listData}
                    renderItem=
                    {
                        item =>
                        (
                          <List.Item
                            key={item.id}
                          >
                          <List.Item.Meta
                            title={<p style={{textAlign:"left"}}>{item.title}</p>/*<link to={'/detail'+item.id}>{item.name}</link>*/}
                            description={
                              <div style={{textAlign:"left" }}>
                                  <p style={{whiteSpace:"pre-wrap"}}>{item.time} - {item.author} - {item.source} - 被引量: {item.citation}</p>      
                                  <p>研究领域：{item.field}</p>       
                                 </div>
                          }
                          />
                        </List.Item>
                        )
                    }
                />
            </div>
            <div>

            </div>
          </div>
        </Content>
        <AcFooter className='e-footer'/>
      </Layout>
    );
  }
}

export default withRouter(ExpertPage);
