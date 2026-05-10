import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {

  const location = useLocation();

  const menuItem = (path, label) => ({
    background:
      location.pathname === path
        ? '#2563eb'
        : 'transparent',
    color: 'white',
    padding: '14px 18px',
    borderRadius: '12px',
    textDecoration: 'none',
    fontWeight: '600',
    marginBottom: '10px',
    display: 'block',
    transition: '0.3s'
  });

  return (

    <div
      style={{
        width: '260px',
        height: '100vh',
        background: '#111827',
        position: 'fixed',
        left: 0,
        top: 0,
        padding: '30px 20px',
        boxSizing: 'border-box',
        boxShadow: '4px 0 10px rgba(0,0,0,0.1)'
      }}
    >

      <div style={{ marginBottom: '40px' }}>

        <h1
          style={{
            color: 'white',
            margin: 0,
            fontSize: '28px'
          }}
        >
          KPI Dashboard
        </h1>

        <p
          style={{
            color: '#9ca3af',
            marginTop: '8px'
          }}
        >
          Project Management System
        </p>

      </div>

      <div>

        <Link
          to="/"
          style={menuItem('/', 'Projects')}
        >
          📁 Projects
        </Link>

        <Link
          to="/kpis"
          style={menuItem('/kpis', 'KPIs')}
        >
          📊 KPIs
        </Link>


      </div>

      <div
        style={{
          position: 'absolute',
          bottom: '20px',
          left: '20px',
          right: '20px',
          background: '#1f2937',
          padding: '15px',
          borderRadius: '15px',
          color: 'white'
        }}
      >
        <p style={{ margin: 0, fontSize: '14px' }}>
          Logged in as
        </p>

        <h4 style={{ marginTop: '5px' }}>
          Admin User
        </h4>
      </div>

    </div>
  );
}