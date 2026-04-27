'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const directusUrl = 'https://d5den1rn3bvis8kem9f0.4b4k4pg5.apigw.yandexcloud.net';

// Домен, который дописывается к логину при входе
// Аккаунты в Directus создаются в формате login@upstudio.ru
const LOGIN_DOMAIN = '@upstudio.ru';

export default function LoginPage() {
  const router = useRouter();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      // Преобразуем логин в email: "client001" → "client001@upstudio.ru"
      const email = login.trim().includes('@') ? login.trim() : login.trim() + LOGIN_DOMAIN;
      const res = await fetch(`${directusUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.errors?.[0]?.message || 'Ошибка входа');
      localStorage.setItem('auth_token', data.data.access_token);
      localStorage.setItem('refresh_token', data.data.refresh_token);
      router.push('/');
    } catch (err) {
      setError('Неверный логин или пароль');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      justifyContent: 'center', background: '#fafafa', fontFamily: 'system-ui, sans-serif'
    }}>
      <div style={{
        background: 'white', borderRadius: 16, padding: 32,
        width: '100%', maxWidth: 380, boxShadow: '0 4px 24px rgba(0,0,0,0.08)'
      }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: '#7b52af', marginBottom: 8, textAlign: 'center' }}>
          Калькулятор шаров
        </h1>
        <p style={{ fontSize: 13, color: '#777', textAlign: 'center', marginBottom: 24 }}>
          Войдите в свой аккаунт
        </p>
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 12, fontWeight: 500, color: '#777', display: 'block', marginBottom: 4 }}>
              Логин
            </label>
            <input
              type="text" value={login} onChange={e => setLogin(e.target.value)}
              required placeholder="client001"
              autoCapitalize="none" autoCorrect="off" spellCheck={false}
              style={{
                width: '100%', padding: '10px 12px', border: '1.5px solid #e0e0e0',
                borderRadius: 8, fontSize: 14, boxSizing: 'border-box'
              }}
            />
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ fontSize: 12, fontWeight: 500, color: '#777', display: 'block', marginBottom: 4 }}>
              Пароль
            </label>
            <input
              type="password" value={password} onChange={e => setPassword(e.target.value)}
              required placeholder="••••••••"
              style={{
                width: '100%', padding: '10px 12px', border: '1.5px solid #e0e0e0',
                borderRadius: 8, fontSize: 14, boxSizing: 'border-box'
              }}
            />
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={agreed}
                onChange={e => setAgreed(e.target.checked)}
                style={{ marginTop: 2, accentColor: '#9b72cf', flexShrink: 0, width: 16, height: 16 }}
              />
              <span style={{ fontSize: 13, color: '#555', lineHeight: 1.5 }}>
                Я даю согласие на обработку персональных данных в соответствии с{' '}
                <Link href="/privacy" target="_blank" style={{ color: '#7b52af' }}>
                  Политикой конфиденциальности
                </Link>
              </span>
            </label>
          </div>
          {error && (
            <div style={{
              background: '#fdeaea', color: '#e74c3c', borderRadius: 8,
              padding: '10px 14px', fontSize: 13, marginBottom: 16
            }}>
              {error}
            </div>
          )}
          <button
            type="submit" disabled={loading || !agreed}
            style={{
              width: '100%', padding: '12px', background: '#9b72cf',
              color: 'white', border: 'none', borderRadius: 8, fontSize: 15,
              fontWeight: 600, cursor: (loading || !agreed) ? 'not-allowed' : 'pointer',
              opacity: (loading || !agreed) ? 0.5 : 1,
              transition: 'opacity 0.2s'
            }}
          >
            {loading ? 'Вход...' : 'Войти'}
          </button>
        </form>
      </div>
    </div>
  );
}
