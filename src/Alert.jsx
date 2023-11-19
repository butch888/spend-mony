import React from 'react';
import { Alert, Space } from 'antd';

const Alt = ({text, onClose}) => (
  <div style={{position: 'absolute',
                left: '50%',
                marginLeft: '-200px',
                border: '1.5px solid #05cd51',
                borderRadius: '10px'}}>
    <Space
    direction="vertical"
    style={{
      width: '400px',
      border: 'none'
    }}
  >
    <Alert
      message={text}
      type="warning"
      closable
      onClose={onClose}
    />
  </Space>
  </div>
);
export default Alt;