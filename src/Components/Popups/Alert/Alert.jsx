import React from 'react';
import { Alert, Space } from 'antd';


const Alt = ({text, onClose}) => (
 
    <Space
    direction="vertical"
    style={{
      width: '400px',
      position: 'absolute',
      left: '50%',
      marginLeft: '-200px',
      marginTop: '100px'
    }}
  >
    <Alert
      message={text}
      type="warning"
      closable
      onClose={onClose}
    />
  </Space>
 
);
export default Alt;