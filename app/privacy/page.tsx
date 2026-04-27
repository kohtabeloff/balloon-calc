export default function PrivacyPage() {
  return (
    <div style={{
      minHeight: '100vh', background: '#fafafa',
      fontFamily: 'system-ui, sans-serif', padding: '40px 16px'
    }}>
      <div style={{
        maxWidth: 680, margin: '0 auto', background: 'white',
        borderRadius: 16, padding: '40px 48px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)'
      }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: '#7b52af', marginBottom: 8 }}>
          Политика конфиденциальности
        </h1>
        <p style={{ fontSize: 13, color: '#999', marginBottom: 32 }}>
          Последнее обновление: 27 апреля 2026 г.
        </p>

        <Section title="1. Оператор персональных данных">
          <p>ИП Лебедева Евгения Сергеевна (далее — «Оператор»).</p>
          <p>Контактный email: <a href="mailto:bysi44@yandex.ru" style={{ color: '#7b52af' }}>bysi44@yandex.ru</a></p>
        </Section>

        <Section title="2. Какие данные мы собираем">
          <p>При использовании сервиса «Калькулятор шаров» мы обрабатываем следующие данные:</p>
          <ul>
            <li>Логин (имя учётной записи)</li>
            <li>Пароль (хранится в зашифрованном виде)</li>
            <li>Заметка к аккаунту (необязательное поле, вводится администратором)</li>
          </ul>
          <p>Мы не собираем имена, адреса, номера телефонов или платёжные данные.</p>
        </Section>

        <Section title="3. Цели обработки данных">
          <p>Данные используются исключительно для:</p>
          <ul>
            <li>Идентификации пользователя при входе в сервис</li>
            <li>Обеспечения доступа к функциям калькулятора шаров</li>
          </ul>
          <p>Данные не передаются третьим лицам и не используются в рекламных целях.</p>
        </Section>

        <Section title="4. Где хранятся данные">
          <p>
            Все данные хранятся на серверах Яндекс Облако, расположенных на территории Российской Федерации,
            в соответствии с требованиями Федерального закона № 152-ФЗ «О персональных данных».
          </p>
        </Section>

        <Section title="5. Срок хранения данных">
          <p>
            Данные хранятся до момента удаления учётной записи. После удаления аккаунта
            все связанные персональные данные уничтожаются.
          </p>
        </Section>

        <Section title="6. Ваши права">
          <p>В соответствии с законодательством РФ вы вправе:</p>
          <ul>
            <li>Запросить информацию о своих данных</li>
            <li>Потребовать исправления неточных данных</li>
            <li>Потребовать удаления своих данных</li>
            <li>Отозвать согласие на обработку персональных данных</li>
          </ul>
          <p>
            Для реализации своих прав обратитесь по адресу:{' '}
            <a href="mailto:bysi44@yandex.ru" style={{ color: '#7b52af' }}>bysi44@yandex.ru</a>.
            Мы обязуемся ответить в течение 30 дней.
          </p>
        </Section>

        <Section title="7. Согласие">
          <p>
            Используя сервис и отмечая соответствующий флажок при входе, вы подтверждаете,
            что ознакомились с настоящей Политикой и даёте согласие на обработку своих
            персональных данных на указанных условиях.
          </p>
        </Section>

        <div style={{ marginTop: 40, paddingTop: 24, borderTop: '1px solid #f0f0f0' }}>
          <a href="/login" style={{ color: '#7b52af', fontSize: 14, textDecoration: 'none' }}>
            ← Вернуться ко входу
          </a>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <h2 style={{ fontSize: 15, fontWeight: 600, color: '#333', marginBottom: 10 }}>{title}</h2>
      <div style={{ fontSize: 14, color: '#555', lineHeight: 1.7 }}>{children}</div>
    </div>
  );
}
