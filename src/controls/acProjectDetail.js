import React from 'react'
import { Modal, Divider } from 'antd';
import '../pages/css/project.css'

function AcProjectDetail(props) {
  const { visible, onCancel, data } = props;
  return (
    <Modal visible={visible} title={data.title} okText="关闭" onCancel={onCancel} onOk={onCancel}
      keyboard={true} closable={false} maskClosable={true} width={'800px'}>
      <div className="project-detail-div">
        <div className="project-detail-left-span">领导</div>
        <div className="project-detail-right-span">{data.leader}</div>
      </div>
      <Divider className="project-divider" />
      <div className="project-detail-div">
        <div className="project-detail-left-span">年份</div>
        <div className="project-detail-right-span">{data.year}</div>
      </div>
      <Divider className="project-divider" />
      <div className="project-detail-div">
        <div className="project-detail-left-span">负责单位</div>
        <div className="project-detail-right-span">{data.org}</div>
      </div>
      <Divider className="project-divider" />
      <div className="project-detail-div">
        <div className="project-detail-left-span">关键字</div>
        <div className="project-detail-right-span">{data.keyword}</div>
      </div>
      <Divider className="project-divider" />
      <div className="project-detail-div">
        <div className="project-detail-left-span">英语关键字</div>
        <div className="project-detail-right-span">{data.ekeyword}</div>
      </div>
      <Divider className="project-divider" />
      <div className="project-detail-div">
        <div className="project-detail-left-span">摘要</div>
        <div className="project-detail-right-span">{data.abstract}</div>
      </div>
      <Divider />
    </Modal>);
}

export default AcProjectDetail;