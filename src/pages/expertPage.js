import React from 'react'
// eslint-disable-next-line
import { Layout,Avatar, message,List, Divider,Radio } from 'antd';
import AcHeader from '../controls/acHeader'
import AcFooter from '../controls/acFooter'
import { withRouter } from 'react-router-dom';
import AcThesisDetail from '../controls/acThesisDetail'   
import './css/expertPage.css'
//import { list } from 'postcss';


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
    this.state.thesisData={title: '', etitle:'',
    author: '', year:'',
    publication: '',
    epublication: ';',
    abstract: '',
    source: ''
  };
    this.thesisShow=this.thesisShow.bind(this);
    this.state.thesisVisible=false;
    this.state.othertype_protent=0;
    /*
      初始化其他部分
    */
  }


  thesisShow(id)
  {
    //通过id获取论文详细信息
    this.setState(
      {
        thesisData:{title: '如今的社会,关注点狭窄到不可思议', etitle:'Incredible Focus in Today\'s Society',
                    author: 'sss1998'+id, year:'2015年',
                    publication: '新理财（政府理财）',
                    epublication: 'GOVERNMENT FINANC;',
                    abstract: '肠道微生物通过口服进入消化道，经过胃时要处于PH值1.5-2的极酸环境，氢离子大量进入细菌，威胁其生存。为了适应这种极端环境，保持细胞内正常的PH值，肠道微生物进化出了一系列的抗酸系统。这些抗酸系统通常是通过膜反向转运蛋白，交换细胞内外质子化程度不同的底物来消耗细胞内的氢离子，从而维持细胞内正常PH值。我们已经得到了大肠杆菌抗酸系统中重要膜转运蛋白AdiC不同构象的高分辨率三维结构，通过比较分析这些结构，我们对细菌抗酸性的分子机制有了初步的了解，但还有一系列的基本问题有待回答。我们计划在已有的生化和结构分析的基础上，针对上述问题，综合多种研究手段探索肠道微生物适应强酸性极端环境的分子机制，并期望在此基础上设计特异性抑制肠道病原微生物的小分子。',
                    source: 'http://www.wanfangdata.com.cn/details/detail.do?_type=perio&id=xlc-zf201610030'
                  },
        thesisVisible:true
      }
    )
  }
  handleTypeChange= e=>{
    this.setState({othertype_protent:e.target.value})
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
        id:this.state.id,
        name:'expertname'+this.state.id,
        org:'orginazation',
        papernum:5,
        citation:11,
        field:'field',
        introduction:"balablablablalballbsdfaaaaaaaaaaad的三三大夫阿斯发达范德萨法第四法斯蒂芬地方的三剑客佛教卡萨拉丁教父考虑角色打开了佛教克里斯大夫将阿斯打开了解放的卡拉萨解放克拉斯的的开发佛教典籍科技卡三 的萨菲卡桑德拉将风口浪尖的法思考了解放卡拉角色考虑缔结克拉夫加快了角色的快乐将风口浪尖克"
    } 
    //this.setState({expertdata:edata,thesisdata:listData});
    message.info(edata.name);
    console.log(this.state.loginInfo);
    return (
      <Layout className="ep-layout">
        <AcHeader loginInfo={this.state.loginInfo} homePage={false}/>
        <Content className="ep-content">
          {/*
              页面控件放置的地方


        //  
              以下是跳转的标准写法
              <Link to={{pathname: '/？？？', state: {lastUrl: this.props.location.pathname, loginInfo: this.state.loginInfo }}}>   
                <其他控件>
              </Link>
          */}

          <div className='ep-card'> 
            <div  className='ep-info'>
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
            <div className='ep-intro' >
              <h2>个人简介：</h2>
              <p>
                {edata.introduction}
              </p>
            </div>
          </div>
          <Divider/>
          <br/>
          
          <div style={{width:'100%'}}>
            <div className='ep-thesis'>
                <h2 style={{textAlign:'left'}}>已发表论文：</h2>
                <List
                    itemLayout="vertical"
                    size="small"
                    pagination={{pageSize:5}}
                    dataSource={listData}
                    renderItem=
                    {
                        item =>
                        (
                          <List.Item
                            key={item.id}
                          >
                          <List.Item.Meta
                            // eslint-disable-next-line
                            title={<a><p style={{textAlign:"left"}} onClick={() => this.thesisShow(item.id)}>{item.title}</p></a>/*<link to={'/detail'+item.id}>{item.name}</link>*/}
                            description={
                              <div style={{textAlign:"left" }}>
                                  {item.time} - {item.author} - {item.source} - 被引量: {item.citation}  
                                 </div>
                          }
                          />
                        </List.Item>
                        )
                    }
                />
            </div>
            <div className='ep-other'>
              <div>
                  <Radio.Group defaultvalue={this.state.othertype_protent} onChange={this.handleTypeChange} buttonStyle="solid">
                  <Radio.Button value={0}>负责项目</Radio.Button>
                  <Radio.Button value={1}>相关专利</Radio.Button>
                  </Radio.Group>
              </div>
              <div>

              </div>  
            </div>
           
          </div>
        </Content>
        <AcThesisDetail  visible={this.state.thesisVisible} onCancel={()=>this.setState({thesisVisible: false})} data={this.state.thesisData} />

        <AcFooter className='e-footer'/>
      </Layout>
    );
  }
}

export default withRouter(ExpertPage);
