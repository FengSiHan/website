import React from 'react'
import { Modal, Divider} from 'antd';
import '../pages/css/project.css'
function AcPatentDetail(props)
{
  const { visible, onCancel, data } = props;
  return(
    <Modal visible={visible} title={data.title} okText="关闭" onCancel={onCancel} onOk={onCancel}
            keyboard={true} mask={false} closable={false} maskClosable={true} width={'800px'}>
      <div className="project-detail-div">
        <div className="project-detail-left-span">简介</div>
        <div className="project-detail-right-span">{data.intro}</div>
      </div>
      <Divider className="project-divider"/>
      <div className="project-detail-div">
        <div className="project-detail-left-span">专利号</div>
        <div className="project-detail-right-span">{data.no}</div>
      </div>
      <Divider className="project-divider"/>
      <div className="project-detail-div">
        <div className="project-detail-left-span">所属单位</div>
        <div className="project-detail-right-span">{data.org}</div>
      </div>
      <Divider className="project-divider"/>
      <div className="project-detail-div">
        <div className="project-detail-left-span">年份</div>
        <div className="project-detail-right-span">{data.year}</div>
      </div>
      <Divider className="project-divider"/>
    </Modal>);
}
export default AcPatentDetail;