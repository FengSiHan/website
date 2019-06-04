/* eslint-disable */

import React from 'react'
// eslint-disable-next-line
import { Layout,Avatar, message,List, Divider,Radio } from 'antd';
import AcHeader from '../controls/acHeader'
import AcFooter from '../controls/acFooter'
import { withRouter,Link } from 'react-router-dom';
import AcThesisDetail from '../controls/acThesisDetail'   
import AcPatentDetail from '../controls/acPatentDetail'
import AcProjectDetail from '../controls/acProjectDetail'
import './css/expertPage.css'


const { Content } = Layout;

function Cooperation(props)
{
   //0 专家 1 机构
  var newstate=props.laststate;
  var changeExpert=props.changeExpert;
  if (newstate.cooperationType===0)
  {
    return(
      <List
        itemLayout="vertical"
        size="small"
        pagination={{pageSize:5}}
        dataSource={newstate.expertData}
        renderItem=
        {
            item =>
            (
              <List.Item
                key={item.id}
              >
              <List.Item.Meta
                avatar={<Avatar icon="user" size={64}/>}
                // eslint-disable-next-line
                title={ 
                  <p style={{textAlign:"left"} } >{item.RealName}</p>     //
                }
                description={
                  <div style={{textAlign:"left" }}>
                      {item.OrganizationName}  
                    </div>
              }
              />
            </List.Item>
            )
        }
      />
    );
  }
  else{
    return(
      <List
        itemLayout="vertical"
        size="small"
        pagination={{pageSize:5}}
        dataSource={newstate.organizationData}
        renderItem=
        {
            item =>
            (
              <List.Item
                key={item.id}
              >
              <List.Item.Meta
                // eslint-disable-next-line
                title={<p style={{textAlign:"left"}} >{item.OrganizationName}</p>}
              />
            </List.Item>
            )
        }
      />
    )
  }
}


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
    console.log(this.state);
    this.thesisShow=this.thesisShow.bind(this);
    this.state.thesisVisible=false;
    this.state.patentVisible=false;
    this.state.projectVisible=false;

    this.state.eData={};    //专家信息
    this.state.allThesisData=[];  //全部论文信息
    this.state.thesisData={};   //单个论文详细信息
    this.state.protentData=[];
    this.state.protentVal=0;
    this.state.expanization=0;    //合作专家或机构
    this.state.patentData=[];
    this.state.projectData=[];    //全部项目信息
    this.state.patent={};
    this.state.project={};        //单个项目信息

    this.state.cooperationType=0;
    this.state.expertData=[];     //合作专家全部数据
    this.state.organizationData=[];   //  合作机构全部数据


    this.componentDidMount = this.componentDidMount.bind(this);
    this.state.done = false;
    /*
      初始化其他部分
    */


    //从服务器获取数据，包括专家信息，（论文、项目、专利）信息，（合作学者/机构）信息

  }

  toExpert(id)
  {
    var newstate = this.state;
    newstate.id = id;
    this.props.history.push({pathname:'/expertDetail', state:newstate});
  }
  thesisShow(id) {
    //通过id获取论文详细信息
    var formData = new FormData();
    formData.append("PaperID", id);
    var objData = {};
    formData.forEach((value, key) => objData[key] = value);
    console.log(JSON.stringify(objData));
    console.log('sdf');
    fetch('https://acphp.madao.bid/show_paper.php', {
      method: 'POST',
      body: formData,
      dataType: 'text'
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('??');
        console.log(data.data);
        if (data.data.length >= 1) {
          let dataItem=data.data[0]
          this.setState(
            {
              thesisData: {
                abstract: dataItem.Abstract, 
                etitle: dataItem.ETitle,
                author: dataItem.Author,
                year: dataItem.Year,
                publication: dataItem.Publication,
                epublication: dataItem.EPublication,
                source: dataItem.Source,
                keyword: dataItem.Keyword,
                ekeyword:dataItem.Ekeyword,
              },
              thesisVisible: true
            }
          )
          
        }
        else {
        }
      })
      .catch(function (err) {
        message.info('查询失败：' + err);
      })
  
    
  }
  componentDidMount() {
    console.log('dsfaaaaaaaaaa');
    if (this.state.done===false) this.getData(this.state.id);
    console.log(this.state.done);
  }
  handleTypeChange= e=>{
    var val=e.target.value;
    if(val===0) 
      this.setState({protentData:this.state.projectData,protentVal:val});
    else 
    this.setState({protentData:this.state.patentData,protentVal:val});
  }
  
  handleCoTypeChange= e=>{
    var val=e.target.value;
    if(val===0) 
      this.setState({cooperationType:val});
    else 
    this.setState({cooperationType:val});
  }

  protentShow(id)
  {
    if (this.state.protentVal===0)
    {
      var formData = new FormData();
      formData.append("PaperID", id);
      var objData = {};
      formData.forEach((value, key) => objData[key] = value);
      console.log(JSON.stringify(objData));
      console.log('sdf');
      fetch('https://acphp.madao.bid/show_project.php', {
        method: 'POST',
        body: formData,
        dataType: 'text'
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('??');
          console.log(data.data);
          if (data.data.length >= 1) {
            let dataItem=data.data[0]
            this.setState(
              {
                thesisData: {
                  abstract: dataItem.Abstract, 
                  etitle: dataItem.ETitle,
                  author: dataItem.Author,
                  year: dataItem.Year,
                  publication: dataItem.Publication,
                  epublication: dataItem.EPublication,
                  source: dataItem.Source,
                  keyword: dataItem.Keyword,
                  ekeyword:dataItem.Ekeyword,
                },
                thesisVisible: true
              }
            )
            
          }
          else {
          }
        })
        .catch(function (err) {
          message.info('查询失败：' + err);
        })
      this.setState({projectVisible:true,project:this.state.project})

    }
    else
    {
      this.setState({patentVisible:true,patent:this.state.patentData[id]})
    }
     
  }

  getData(id) {
    var listData = [];
    var formData = new FormData();
    formData.append("userID", id);
    var objData = {};
    formData.forEach((value, key) => objData[key] = value);
    console.log(JSON.stringify(objData));

    fetch('https://acphp.madao.bid/show_expert.php', {
      method: 'POST',
      body: formData,
      dataType: 'text'
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data!=undefined) {
          let data1=data.data1;   //专家信息
          this.setState({eData:data1[0]});
          let data2=data.data2;   //论文信息
          var tdata=[];
          for (let i=0;i<data2.length;i++)
          {
            tdata.push(
              {
                id:data2[i].PaperID,
                title:data2[i].Title,
                author:data2[i].RealName,
                source:data2[i].Source,
                time:data2[i].Year,
                citation:data2[i].Quoted_Num
              }
            )
          }
          this.setState({allThesisData:tdata});
          let data3=data.data3;     //项目信息
          var prodata=[];
          for (let i=0;i<data3.length;i++)
          {
            prodata.push(
              {
                id:data3[i].ProjectID,
                title:data3[i].Title,
              }
            )
          }
          this.setState({projectData:prodata});
          let data4=data.data4;     //个人介绍部分？专利信息

          let data5=data.data5;   //合作专家
          this.setState({expertData:data5});

          let data6=data.data6;   //合作机构
          console.log(data6);
          this.setState({organizationData:data6});
        }
        else {
          this.setState({data:[]});
        }
        this.setState({ data: listData });
        console.log('this.state.done');
        this.setState({ done: true });
      })
      .catch(function (err) {
        message.info('查询失败：' + err);
      })
  
  }

  render() {
    const listData=[];
    const patent=[];
    const project=[];
    const expert=[];
    const orginazation=[];
    var edata=[];
    for (let i=0;i<25;i++)
    {
      
        
        project.push(
          {
            id:i,
            title:'项目sfasfdasf'+i,
            leader: 'sss1998'+i, 
            year:'2015年'+i, 
            type:'重点项目',
            org: '清华大学', 
            keyword: '细菌抗酸性系统; 反向转运蛋白; 结构生物学;',
            ekeyword: 'bacterial acid resistance (AR) systems; antiporter; structural biology; ;',
            abstract: '肠道微生物通过口服进入消化道，经过胃时要处于PH值1.5-2的极酸环境，氢离子大量进入细菌，威胁其生存。为了适应这种极端环境，保持细胞内正常的PH值，肠道微生物进化出了一系列的抗酸系统。这些抗酸系统通常是通过膜反向转运蛋白，交换细胞内外质子化程度不同的底物来消耗细胞内的氢离子，从而维持细胞内正常PH值。我们已经得到了大肠杆菌抗酸系统中重要膜转运蛋白AdiC不同构象的高分辨率三维结构，通过比较分析这些结构，我们对细菌抗酸性的分子机制有了初步的了解，但还有一系列的基本问题有待回答。我们计划在已有的生化和结构分析的基础上，针对上述问题，综合多种研究手段探索肠道微生物适应强酸性极端环境的分子机制，并期望在此基础上设计特异性抑制肠道病原微生物的小分子。',
            source: '	nsfc'
          }
        );
        patent.push(
        {
          id:i,
          title: '分离的多肽及其应用', 
          year:'2015年',
          org: '清华大学', 
          no: 'CN103319574A',
          intro: '本发明涉及分离的多肽及其应用。多肽包含：多个重复氨基酸序列，重复氨基酸序列为：LTPDQVVAIASX1X2GGKQALETVQRLLPVLCQAHG，其中，X1为H或N，X2为选自I、L、M、W、C、T、P、H、S、N、E、Q、H、K和R的之一。该多肽能够特异性地识别碱基。'
        }
        );
       
    }

    

    this.state.patentData=patent;
    //this.setState({expertdata:edata,thesisdata:listData});
   // message.info(edata.name);
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
                  <p className='e-name'>{this.state.eData.RealName}</p>
                  <p>{this.state.eData.OrganizationName}</p>
                  <p style={{whiteSpace:"pre-wrap"}}>发表文章：{this.state.eData.Paper_Num}     被引次数：{this.state.eData.Quote_Num}</p>      
                  <p>研究领域：{this.state.eData.RealName}</p>   
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
                    dataSource={this.state.allThesisData}
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
              <div className='ep-protent'>
                  <Radio.Group defaultvalue={this.state.protentVal} onChange={this.handleTypeChange} buttonStyle="solid">
                  <Radio.Button value={0}>负责项目</Radio.Button>
                  <Radio.Button value={1}>相关专利</Radio.Button>
                  </Radio.Group>
                  <List
                    itemLayout="vertical"
                    size="small"
                    pagination={{pageSize:5}}
                    dataSource={this.state.protentData}
                    renderItem=
                    {
                        item =>
                        (
                          <List.Item
                            key={item.id}
                          >
                          <List.Item.Meta
                            // eslint-disable-next-line
                            title={<a><p style={{textAlign:"left"}} onClick={() => this.protentShow(item.id)}>{item.title}</p></a>}
                          />
                        </List.Item>
                        )
                    }
                />
              </div>
              <div style={{textAlign: 'left'}}>
                  <Radio.Group defaultvalue={this.state.othertype_expanization} onChange={this.handleCoTypeChange} buttonStyle="solid">
                  <Radio.Button value={0}>合作学者</Radio.Button>
                  <Radio.Button value={1}>合作机构</Radio.Button>
                  </Radio.Group>
                  <Cooperation  laststate={this.state} changeExpert={(id)=>this.setState({id:id})}/>
              </div>
            </div>
           
          </div>
        </Content>
        <AcThesisDetail  visible={this.state.thesisVisible} onCancel={()=>this.setState({thesisVisible: false})} data={this.state.thesisData} />
        <AcPatentDetail  visible={this.state.patentVisible} onCancel={()=>this.setState({patentVisible: false})} data={this.state.patent} />
        <AcProjectDetail  visible={this.state.projectVisible} onCancel={()=>this.setState({projectVisible: false})} data={this.state.project} />

        <AcFooter className='e-footer'/>
      </Layout>
    );
  }
}

export default withRouter(ExpertPage);
