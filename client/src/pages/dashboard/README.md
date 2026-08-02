# Dashboard Settings API Contract

## 1. Схема данных (Ожидаемый ответ от Backend)

Фронтенд ожидает получить весь стейт настроек профиля одним запросом. Данные нужны для отрисовки профиля, настроек, безопасности и уведомлений.

**GET `/api/settings/me`**

```json
{
  "profile": {
    "avatar_url": "https://...",
    "full_name": "Alex Sterling",
    "subscription_badge": "MVP Version",
    "job_title": "Productivity Specialist",
    "location": "London, UK"
  },
  "preferences": {
    "timezone": "GMT+00:00 (London)",
    "theme": "light"
  },
  "security": {
    "password_updated_at": "2026-06-01T12:00:00Z",
    "mfa_enabled": true
  },
  "notifications": {
    "email_enabled": true,
    "push_enabled": false
  }
}
```

## 2. Обновление данных (Мутация)

Поскольку в UI есть кнопка **"Save Preferences"**, фронтенд собирает все измененные настройки в локальном стейте и отправляет их одним пакетным запросом.

**PATCH `/api/settings/me`**

```json
{
  "preferences": {
    "timezone": "GMT+00:00 (London)",
    "theme": "dark"
  },
  "notifications": {
    "email_enabled": true,
    "push_enabled": true
  }
}
```

*(Обновление профиля, пароля и 2FA обычно происходит через отдельные выделенные флоу/модалки и напрямую через методы Auth-провайдера).*
