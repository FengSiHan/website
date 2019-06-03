import React from 'react'
// eslint-disable-next-line
import {List, Avatar, Layout,Button, message,Table,Icon,Modal,Divider} from 'antd'
import { withRouter } from 'react-router-dom';
import AcHeader from '../controls/acHeader'
import AcFooter from '../controls/acFooter'
import AcThesisDetail from '../controls/acThesisDetail'   
import './css/searchResult.css'

class ResultShow extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state={
      visible:false,
      data:{},
      thesisVisible:false,
      thesisData:{}
    }
    this.thesisShow=this.thesisShow.bind(this);
    this.state.test=false;
  }
  componentDidMount()
  {
    this.setState({test:true});
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
  render()
  {
    const listData=[];
    console.log('in result render');
    console.log(this.props.data);
    // eslint-disable-next-line
    if (this.props.type==2)
    {
      const columns =
      [
        {
          title:'题名',
          dataIndex:'Title',
          render:(text,record) =>
          (
            <span>
              {// eslint-disable-next-line
            <a><p style={{textAlign:'left'}}  onClick={() => this.thesisShow(record.PaperId)}>{text}</p></a>
          }
            </span>
          )
        },
        {
          title:'作者',
          dataIndex:'RealName',
        },
        {
          title:'来源',
          dataIndex:'Source'
        },
        {
          title:'发布时间',
          dataIndex:'Year'
        },
        {
          title:'所属领域',
          dataIndex:'Area'
        },
        {
          title:'引用',
          dataIndex:'Quoted_Num'
        },
        {
          title:'下载',
          dataIndex:'Download_Num',
        },
        {
          title:'',
          render:(text,record) =>
          (
            <span>
              {// eslint-disable-next-line
            <a><Icon type="download"  onClick={() => {this.setState({data:record,visible:true})}}/></a>
          }
            </span>
          )
        }
      ];
      // for (let i=0;i<25;i++)
      // {
      //     listData.push(
      //         {
      //             id:i,
      //             title:this.props.value+i,
      //             author:'laiyuan'+i,
      //             source:"kkkkk"+i,
      //             time:"20252522"+i,
      //             citation:i*11,
      //             download:i*5,
      //             points:i+3,
      //             field:'sfsdafasdf'+i
      //         }
      //     )
      // }
      const dataShow=this.props.data;

      for (let i=0;i<listData.length;i++)
      {
        listData.pop();
      }
      console.log('middle?');
      console.log(listData);
      console.log(dataShow.length);
      console.log(dataShow);
      console.log(dataShow[0]);
      console.log('middle!');
      for (let i=0;i<dataShow.length;i++)
      {
        var dataItem=dataShow[i];
        listData.push(
          {
            Title: dataItem.Title,
            RealName: dataItem.RealName,
            Source: dataItem.Source,
            Year: dataItem.Year,
            Area:dataItem.Area,
            Quoted_Num:dataItem.Quoted_Num,
            Download_Num: dataItem.Download_Num,
            PaperID: dataItem.PaperID,
          }
          );
          console.log(listData);
      }
      console.log(listData);
      console.log('alomst render');
      console.log(dataShow);
      return(
        <span>
          <Table
            columns={columns} dataSource={dataShow}
          />
          <Modal mask={false} keyboard={true} visible={this.state.visible} footer={null} onCancel={()=>this.setState({visible: false})}>
              <div className="project-detail-div">
              <div className="project-detail-left-span">题名:</div>
              <div className="project-detail-right-span">{this.state.data.title}</div>
              </div>
              <Divider className="project-divider"/>
              <div className="project-detail-div">
                <div className="project-detail-left-span">所需积分:</div>
                <div className="project-detail-right-span">{this.state.data.points}</div>
              </div>
              <Divider className="project-divider"/>
              <div className="project-detail-div">
                <Button onClick={()=>message.info('确认下载')}>确认下载</Button>
              </div>
          </Modal>

          <AcThesisDetail  visible={this.state.thesisVisible} onCancel={()=>this.setState({thesisVisible: false})} data={this.state.thesisData} />
              
        </span>
      );
    }
    else 
    {
      for (let i=0;i<25;i++)
      {
          listData.push(
              {
                  id:i,
                  name:this.props.value+i,
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
              //loading
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
                      // eslint-disable-next-line
                      title={<a><p style={{textAlign:"left"}} onClick={() =>this.props.toExpert(item.id)}>{item.name}</p></a>}
                      description={
                        <div style={{textAlign:"left" }}>
                          <div style={{float:"left"}}>
                            <p >{item.org}</p>    
                            <p style={{whiteSpace:"pre-wrap"}}>发表文章：{item.papernum}     被引次数：{item.citation}</p>      
                            <p>研究领域：{item.field}</p>                     
                          </div>
                          <div style={{float:"right"}}>
                            <Button  type="default" onClick={() =>this.props.toExpert(item.id)}>详细信息</Button> 
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
    try {
      this.state = this.props.location.state;
    } catch (error) {
      this.state = {loginInfo: {isExpert: false, logined: false, un:''}};
    }
    if (this.state === undefined )
    {
        this.state = {loginInfo: {isExpert: false, logined: false, un:''}};
    }
    this.state.id=0;
    /*
      初始化其他部分
    */
    this.toExpert=this.toExpert.bind(this);
    this.getData=this.getData.bind(this);
    this.componentDidMount=this.componentDidMount.bind(this);
    this.state.data=[];
  }
  componentDidMount()
  {
    this.getData();
    this.setState({type:this.state.type});
 }
  getData()
  {
    if (this.state.type==2)
    {
      var type=this.state.type+1;
      var value=this.state.value;
      var formData = new FormData();
      const listData=[];
      formData.append("flag", type);
      formData.append("name", value);
      var objData = {};
      formData.forEach((value, key) => objData[key] = value);
      //console.log(JSON.stringify(objData));
      
      fetch('http://94.191.58.148/search.php',{
          method: 'POST',
          body: formData,
          dataType: 'text'
      })
      .then((response)=>response.json())
      .then((data)=>{
        //console.log(data);
          if (data.data.length >=1)
          {
              for (var i=0;i<data.data.length;i++)
              {
                let dataItem=data.data[i];
                listData.push(
                  {
                    Title: dataItem.Title,
                    RealName: dataItem.RealName,
                    Source: dataItem.Source,
                    Year: dataItem.Year,
                    Area:dataItem.Area,
                    Quoted_Num:dataItem.Quoted_Num,
                    Download_Num: dataItem.Download_Num,
                    PaperID: dataItem.PaperID,
                  }
                )
                
              }
          }
          else
          {

          }
          })
      .catch(function(err){
          message.info('查询失败：'+err);
      })
      this.setState({data:listData});
      console.log(listData);
      console.log('first time');
      console.log(this.state.data);
    }
    else
    {

    }
    
  }
  
  toExpert(id)
  {
    var newstate = this.state;
    newstate.id = id;
    this.props.history.push({pathname:'/expertDetail', state:newstate});
  }
  onacSearch= (val,ty) =>
      {
        this.setState(
          {
            value:val,
            type:ty
          }
       )
      }
  render() {
      
      //message.info(this.state.value);
      /*
        获取数据传入listdata，名称如下两个for循环
      */
      

    //let resultlist;
    
    return (
      <Layout className="sr-layout">
        <AcHeader loginInfo={this.state.loginInfo} homePage={false} type={this.state.type} onacSearch={this.onacSearch}/>
        <Content className="sr-content">
          <ResultShow type={this.state.type} value={this.state.value} toExpert={this.toExpert} data={this.state.data}/>
        </Content>
        <AcFooter />
      </Layout>
    );
  }
}

export default withRouter(SearchResult);
