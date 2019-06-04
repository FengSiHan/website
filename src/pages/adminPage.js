import React from 'react'
import { Layout, message,Table,Modal,Button,Divider,Input } from 'antd';
import AcHeader from '../controls/acHeader'
import AcFooter from '../controls/acFooter'
import AcThesisDetail from '../controls/acThesisDetail'   
import AcPatentDetail from '../controls/acPatentDetail'
import AcProjectDetail from '../controls/acProjectDetail'
import { withRouter } from 'react-router-dom';

import './css/adminPage.css'
import TextArea from 'antd/lib/input/TextArea';
const { Content } = Layout;

function AcToBeExpertDetail(props) {
  const { visible, onCancel, data } = props;
  return (
    <Modal visible={visible} title={data.title} okText="关闭" onCancel={onCancel} onOk={onCancel}
      keyboard={true} closable={false} maskClosable={true} width={'800px'}>
      <div className="ap-project-detail-div">
        <div className="ap-project-detail-left-span">真实姓名</div>
        <div className="ap-project-detail-right-span">{data.realName}</div>
      </div>
      <Divider className="ap-project-divider" />
      <div className="ap-project-detail-div">
        <div className="ap-project-detail-left-span">身份证号码</div>
        <div className="ap-project-detail-right-span">{data.IDnum}</div>
      </div>
      <Divider className="ap-project-divider" />
      <div className="ap-project-detail-div">
        <div className="ap-project-detail-left-span">所在机构</div>
        <div className="ap-project-detail-right-span">{data.organization}</div>
      </div>
      <Divider className="ap-project-divider" />
      <div className="ap-project-detail-div">
        <div className="ap-project-detail-left-span">个人简介</div>
        <div className="ap-project-detail-right-span">{data.introduce}</div>
      </div>
      <Divider className="ap-project-divider" />
      <div className="ap-project-detail-div">
        <div className="ap-project-detail-left-span">职称</div>
        <div className="ap-project-detail-right-span">{data.career}</div>
      </div>
      <Divider className="ap-project-divider" />
      <div className="ap-project-detail-div">
        <div className="ap-project-detail-left-span">研究领域</div>
        <div className="ap-project-detail-right-span">{data.area}</div>
      </div>
      <Divider />
    </Modal>);
}

function AdminAction(props)
{
  if(props.data.check===false)
  {
    return (
      <span>
      <Button onClick={()=>props.passmethod(props.data)}> 通过</Button>
      <Button onClick={props.rejectmethod}> 不通过</Button>
    </span>
    )
  }
  else
  {
    return (
      <div>已审核{props.data.result===2?'通过':<p>不通过<Button onClick={()=>props.showResult(props.data.reasonForNo)}>原因</Button></p>}</div>
    )
  } 
}


class AdminPage extends React.Component {
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
    this.state.visible=false;
    this.state.modaldata={};  //给不通过弹窗的数据
    this.state.done=false;
    this.state.allData=false;

    this.state.toBeExpert={};   //申请成为专家
    this.state.toBeExpertVisible=false;
    this.state.thesis={};   //论文申请
    this.state.thesisVisible=false;
    this.state.patent={};   //专利申请
    this.state.patentVisible=false;
    this.state.project={};   //项目申请
    this.state.projectVisible=false;

    this.pass=this.pass.bind(this);
    this.reject=this.reject.bind(this);
    this.state.value='';    //不通过原因

    this.state.reasonVisible=false;
    this.state.reason="";
    //获取审核数据
    /*
      初始化其他部分
    */
  }

  componentDidMount() {
    if (this.state.done===false) this.getData();
  //  this.setState({done:true});
  }

  getData() {
    var allData=[];
    //申请成为专家
    fetch('https://acphp.madao.bid/show_expert_apply.php', {
      method: 'GET',
      dataType: 'text'
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        console.log(data.length);
        for (var i=0;i<data.length;i++)
        {
            var detail=
            {
                area:data[i].Area,
                career:data[i].career,
                description:data[i].Description,
                IDnum:data[i].IDNUM,
                introduce:data[i].Introduce,
                organization:data[i].Organization,
                realName:data[i].RealName,
                time:data[i].Time,
                times:data[i].Times,
            }
            allData.push(
                {
                    uid:data[i].UID,
                    type:0,
                    check:false,
                    result:0,
                    resonForNo:'',
                    detail:detail,
                    id:data[i].ID,
                    adid:data[i].AdID
                }
            )
        }
      })
      .catch(function (err) {
        message.info('查询失败：' + err);
      })
    //论文申请
    fetch('https://acphp.madao.bid/show_paper_apply.php', {
    method: 'GET',
    dataType: 'text'
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        console.log(data.length);
        for (var i=0;i<data.length;i++)
        {
            var detail=
            {
                abstract: data[i].Abstract, 
                etitle: data[i].TitleEN,
                author: data[i].ExpertIDs,
                year: data[i].Time,
                publication: data[i].Periodical,
                epublication: data[i].PeriodicalEN,
                source: data[i].Source,
                keyword: data[i].Keyword,
                ekeyword:data[i].Ekeyword,
            }
            allData.push(
                {
                    uid:data[i].UID,
                    type:3,
                    check:false,
                    result:0,
                    resonForNo:'',
                    detail:detail,
                    id:data[i].ID,
                    adid:data[i].AdID
                }
            )
        }
    })
    .catch(function (err) {
        message.info('查询失败：' + err);
    });
    //专利申请
    fetch('https://acphp.madao.bid/show_patent_apply.php', {
      method: 'GET',
      dataType: 'text'
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        console.log(data.length);
        for (var i=0;i<data.length;i++)
        {
            var detail=
            {
              intro:data[i].Intro,
              no:data[i].PatentID,
              org:data[i].Org,
              year:data[i].Year
            }
            allData.push(
                {
                    uid:data[i].UID,
                    type:1,
                    id:data[i].ID,
                    check:false,
                    result:0,
                    resonForNo:'',
                    detail:detail,
                    adid:data[i].AdID
                }
            )
        }
      })
      .catch(function (err) {
        message.info('查询失败：' + err);
      });
    //项目申请
    fetch('https://acphp.madao.bid/show_project_apply.php', {
    method: 'GET',
    dataType: 'text'
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        console.log(data.length);
        for (var i=0;i<data.length;i++)
        {
            var detail=
            {
              id:data[i].ProjectID,
              title:data[i].Title,
              leader: data[i].Leader, 
              year:data[i].Time, 
              org: data[i].Org, 
              keyword: data[i].Keyword,
              ekeyword: data[i].KeywordEn,
              abstract: data[i].Abstract,
           }
            allData.push(
                {
                    uid:data[i].UID,
                    type:2,
                    check:false,
                    result:0,
                    resonForNo:'',
                    detail:detail,
                    id:data[i].ID,
                    adid:data[i].AdID
                }
            )
        }
        
        console.log('this.state.done');
        this.setState({ done: true });
    })
    .catch(function (err) {
        message.info('查询失败：' + err);
    });
    console.log(allData);    
    this.setState({allData:allData});
  }

  showResult=(value)=>
  (
    this.setState({reason:value,reasonVisible:true})
  )

  showDetail(type,data)
  {
    if(type===0)  //专家
    {
      this.setState({toBeExpert:data,toBeExpertVisible:true});
    }
    else if(type===1)   //专利
    {
      this.setState({patent:data,patentVisible:true});
    }
    else if(type===2)   //项目
    {
      this.setState({project:data,projectVisible:true});
    }
    else    //论文
    {
      this.setState({thesis:data,thesisVisible:true});
    }
  }

  pass(data)
  {
    var alldata=this.state.allData;
    for (var i=0;i<alldata.length;i++)
    {
      if(data===alldata[i])
      {
        alldata[i].check=true;
        alldata[i].result=2;
        console.log('!!');
        this.submit(data);
      }
    }
    this.setState({allData:alldata});
    console.log('??');
  }

  reject()
  {
    var data=this.state.modaldata;
    var value=this.state.value;
    var alldata=this.state.allData;
    for (var i=0;i<alldata.length;i++)
    {
      if(data===alldata[i])
      {
        alldata[i].check=true;
        alldata[i].result=1;
        alldata[i].reasonForNo=value;
        console.log('!!');
        this.submit(data);
      }
    }
    this.setState({allData:alldata,visible:false});
    console.log('??');
  }
  
  submit(data)
  {
    var alldata=this.state.allData;

    for (var i=0;i<alldata.length;i++)
    {
      if(data===alldata[i])
      {
        var type=""+data.type;
        var adid=data.adid;
        var result=data.result;
        var reasonForNo=data.reasonForNo;
        var uid=data.uid;
        var id=data.id;
        var formData = new FormData();
        formData.append("Type",type );
        formData.append("AdID", adid);
        formData.append("res", result);
        formData.append("Describtion", reasonForNo);     //应为description  后端如此，奈何
        formData.append('UID',uid);
        formData.append('ID',id);
        fetch('https://acphp.madao.bid/check.php', {
                    method: 'POST',
                    body: formData,
                    dataType: 'text'
                })
                .then((response) => response.text())
                .then((data) => {
                    console.log('post success')
                    console.log(result);
                    console.log(reasonForNo);
                    console.log(id);
                })
                .catch(function (err) {
                    message.info('上传失败: ' + err);
                })
      }
    }
  }

  render() 
  {
    const listData=[];
    const typeList=['申请成为专家','申请新建专利','申请新建项目','申请新建论文'];
    // eslint-disable-next-line
    const columns =
    [
    {
        title:'申请人',
        dataIndex:'uid',
        key:'title',
    },
    {
        title:'类型',
        dataIndex:'type',
        render:(text)=>
        (
          <p>{typeList[text]}</p>
        )
    },
    {
        title:'详细信息',
        dataIndex:'',  //
        render:(text,record)=>
        (
            <Button onClick={()=>this.showDetail(record.type,record.detail)}> 详细信息</Button>
        )
    },
    {
        title:'操作',
        dataIndex:'',
        render:(text,record)=>
        (
            <AdminAction data={record} passmethod={this.pass} showResult={this.showResult} rejectmethod={(e)=>this.setState({visible:true,modaldata:record})}/>
        )
    },
    ];
    for (let i=0;i<13;i++)
    {
        listData.push(
            {
                id:i,
                applicant:'applicant'+i,
                type:i%3,
                detail:'sadfaf'+i,
                check:i%2===0?false:true,
                reasonForNo:'NoNoNo'
            }
        )
    }
    return (
    <Layout className="ap-layout">
        <AcHeader loginInfo={this.state.loginInfo} homePage={false}/>
        <Content className="ap-content">
        <Table
            columns={columns} dataSource={this.state.allData}
          />
        <Modal mask={false} keyboard={true} visible={this.state.visible} footer={null} onCancel={()=>this.setState({visible: false})}>
              <div >
                 <div >原因:</div>
                 <div>
                   <TextArea autosize={{minRows: 4, maxRows: 8 }} onChange={(e)=>this.setState({value:e.target.value})}/>
                   <Button  onClick={this.reject}>提交</Button>
                 </div>
              </div>
          </Modal>
          <AcToBeExpertDetail visible={this.state.toBeExpertVisible} onCancel={()=>this.setState({toBeExpertVisible: false})} data={this.state.toBeExpert}/>
          <AcThesisDetail  visible={this.state.thesisVisible} onCancel={()=>this.setState({thesisVisible: false})} data={this.state.thesis} />
           <AcPatentDetail  visible={this.state.patentVisible} onCancel={()=>this.setState({patentVisible: false})} data={this.state.patent} />
          <AcProjectDetail  visible={this.state.projectVisible} onCancel={()=>this.setState({projectVisible: false})} data={this.state.project} />
          <Modal mask={false} keyboard={true} visible={this.state.reasonVisible} footer={null} onCancel={()=>this.setState({reasonVisible: false})}>
              <div >
               <div >原因:</div>
                <div>
                  {this.state.reason}
                </div>
              </div>
          </Modal>
        </Content>
        <AcFooter className='ap-footer'/>
    </Layout>
    );

    }
}
export default withRouter(AdminPage);
