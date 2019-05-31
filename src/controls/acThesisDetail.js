import React from 'react'
import { Modal, Divider} from 'antd';
import '../pages/css/project.css'
function AcThesisDetail(props)
{
  const { visible, onCancel, data } = props;
  return(
    <Modal visible={visible} title={data.title} okText="关闭" onCancel={onCancel} onOk={onCancel}
            keyboard={true} closable={false} maskClosable={true} width={'800px'}>
      <div className="project-detail-div">
        <div className="project-detail-left-span">英语标题</div>
        <div className="project-detail-right-span">{data.etitle}</div>
      </div>
      <Divider className="project-divider"/>
      <div className="project-detail-div">
        <div className="project-detail-left-span">作者</div>
        <div className="project-detail-right-span">{data.author}</div>
      </div>
      <Divider className="project-divider"/>
      <div className="project-detail-div">
        <div className="project-detail-left-span">年份</div>
        <div className="project-detail-right-span">{data.year}</div>
      </div>
      <Divider className="project-divider"/>
      <div className="project-detail-div">
        <div className="project-detail-left-span">出版物</div>
        <div className="project-detail-right-span">{data.publication}</div>
      </div>
      <Divider className="project-divider"/>
      <div className="project-detail-div">
        <div className="project-detail-left-span">英文出版物</div>
        <div className="project-detail-right-span">{data.epublication}</div>
      </div>
      <Divider className="project-divider"/>
      <div className="project-detail-div">
        <div className="project-detail-left-span">摘要</div>
        <div className="project-detail-right-span">{data.abstract}</div>
      </div>
      <Divider className="project-divider"/>
      <div className="project-detail-div">
        <div className="project-detail-left-span">来源</div>
        <div className="project-detail-right-span">{data.source}</div>
      </div>
      <Divider/>
    </Modal>);
}
export default AcThesisDetail;