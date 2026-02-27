'use client';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      window.location.href = '/login';
    } else {
      window.location.href = '/app.html';
    }
  }, []);

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      justifyContent: 'center', background: '#fafafa',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <p style={{ color: '#777', fontSize: '15px' }}>Загрузка...</p>
    </div>
  );
}
