const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL!;

export function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('auth_token');
}

export function logout() {
  localStorage.removeItem('auth_token');
  localStorage.removeItem('refresh_token');
  window.location.href = '/login';
}

export async function loadData(): Promise<any | null> {
  const token = getToken();
  if (!token) return null;

  const res = await fetch(`${DIRECTUS_URL}/items/calculator_data?limit=1`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (res.status === 401) { logout(); return null; }
  if (!res.ok) return null;

  const json = await res.json();
  return json.data?.[0] ?? null;
}

export async function saveData(data: any, recordId?: string): Promise<void> {
  const token = getToken();
  if (!token) return;

  if (recordId) {
    await fetch(`${DIRECTUS_URL}/items/calculator_data/${recordId}`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ data }),
    });
  } else {
    await fetch(`${DIRECTUS_URL}/items/calculator_data`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ data }),
    });
  }
}
