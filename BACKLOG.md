# Evara — Backlog

## 🔑 Activar Providers OAuth
- [ ] **Google OAuth** — Crear Client ID en [Google Cloud Console](https://console.cloud.google.com)
  - Authorized origin: `https://evara-eight.vercel.app`
  - Agregar `GOOGLE_CLIENT_ID` a Vercel env vars
- [ ] **Instagram OAuth** — Crear App en [Meta Developers](https://developers.facebook.com)
  - Redirect URI: `https://evara-eight.vercel.app/api/auth/instagram`
  - Agregar `INSTAGRAM_APP_ID` e `INSTAGRAM_APP_SECRET` a Vercel env vars

## 💳 Integrar Pagos Reales
- [ ] Conectar Stripe (Apple Pay + TDC)
- [ ] Conectar PayPal SDK
- [ ] Webhooks de confirmación de pago
- [ ] Tabla subscriptions en Neon

## 📱 Plataforma Web
- [x] Landing page con propuesta de valor
- [x] Registro 5 pasos con wizard
- [x] Login funcional con JWT
- [ ] Home dashboard autenticado
- [ ] Sección de entrenamientos
- [ ] Coach IA (chat)
- [ ] Progreso visual
- [ ] Perfil de usuario
- [ ] Comunidad / Feed social

## 🎨 Diseño & Contenido
- [ ] Generar imágenes reales de ejercicios
- [ ] Videos de ejercicios
- [ ] Contenido de blog / SEO
- [ ] Dominio personalizado (evara.fit o similar)

## 🔧 Técnico
- [ ] Rate limiting en APIs
- [ ] Password reset flow
- [ ] Email transaccional (confirmación, bienvenida)
- [ ] Analytics (Mixpanel o similar)
- [ ] PWA (Progressive Web App) para mobile
