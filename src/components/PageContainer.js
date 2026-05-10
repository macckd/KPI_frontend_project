import React from 'react';

export default function PageContainer({ children }) {

  return (
    <div
      style={{
        marginLeft: '260px',
        padding: '30px',
        minHeight: '100vh',
        background: '#f3f4f6',
        boxSizing: 'border-box'
      }}
    >
      {children}
    </div>
  );
}