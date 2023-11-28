import React from 'react';
import { Alert, Space } from 'antd';
import { AltWrapper } from './AlertStyleComponent';

const Alt = ({text, onClose}) => (
  <AltWrapper>
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
  </AltWrapper>
);
export default Alt;