import React from 'react';
import { Alert, Space } from 'antd';

const Alt = ({text, onClose}) => (
    <Space
    direction="vertical"
    style={{
      width: '320px',
      position: 'absolute',
      left: '50%',
      top: '120px',
      marginLeft: '-160px',
      border: '1.5px solid #05cd51',
      borderRadius: '10px',
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