# 🚀 Instalação Rápida - App Mobile

## Passo a Passo Simplificado

### 1️⃣ Instalar Node.js
Baixe e instale: https://nodejs.org/ (versão LTS)

### 2️⃣ Instalar dependências
```bash
npm install
```

### 3️⃣ Inicializar Capacitor
```bash
npx cap init "Futi de Quinta" "com.futidequinta.app" --web-dir="."
```

### 4️⃣ Adicionar Android
```bash
npx cap add android
npx cap sync
```

### 5️⃣ Abrir no Android Studio
```bash
npx cap open android
```

### 6️⃣ No Android Studio:
1. Aguarde o Gradle sincronizar
2. Clique em "Run" (▶️) ou pressione Shift+F10
3. Escolha um emulador ou dispositivo conectado
4. O app será instalado e executado!

---

## Para iOS (apenas Mac):

```bash
npx cap add ios
npx cap sync
npx cap open ios
```

No Xcode, clique em "Run" (▶️)

---

## 📱 Testar como PWA (mais rápido)

1. Abra o `index.html` em um servidor local:
   ```bash
   # Com Python:
   python -m http.server 8000
   
   # Ou com Node.js:
   npx http-server
   ```

2. Acesse `http://localhost:8000` no celular (mesma rede WiFi)

3. No navegador mobile, toque em "Adicionar à tela inicial"

4. O app será instalado como PWA!

---

## ⚠️ Problemas Comuns

### Erro: "command not found: npx"
- Instale Node.js: https://nodejs.org/

### Erro no Android Studio
- Instale Android Studio: https://developer.android.com/studio
- Configure o Android SDK

### App não abre
- Execute: `npx cap sync` novamente
- Limpe o cache: `npx cap clean`

---

## 📞 Próximos Passos

Depois de testar localmente, veja `README-MOBILE.md` para:
- Publicar na Google Play Store
- Publicar na Apple App Store
- Configurar ícones e splash screens
