# Guia: Transformar Futi de Quinta em App Mobile

## 📱 Opção 1: Capacitor (Recomendado)

### Pré-requisitos
- Node.js instalado (https://nodejs.org/)
- Android Studio (para Android)
- Xcode (para iOS - apenas no Mac)

### Passo 1: Instalar dependências

```bash
npm install
```

### Passo 2: Inicializar Capacitor

```bash
npx cap init
```

Quando perguntado:
- **App name**: Futi de Quinta
- **App ID**: com.futidequinta.app
- **Web dir**: . (ponto)

### Passo 3: Adicionar plataformas

```bash
# Para Android
npx cap add android

# Para iOS (apenas no Mac)
npx cap add ios
```

### Passo 4: Sincronizar arquivos

```bash
npx cap sync
```

### Passo 5: Abrir no Android Studio / Xcode

```bash
# Android
npx cap open android

# iOS (apenas no Mac)
npx cap open ios
```

### Passo 6: Configurar o App

#### Android:
1. No Android Studio, vá em `app/src/main/res/values/strings.xml`
2. Configure o nome do app e outras strings
3. Adicione ícones em `app/src/main/res/mipmap-*`
4. Configure permissões se necessário

#### iOS:
1. No Xcode, configure o Bundle Identifier
2. Adicione ícones no Assets.xcassets
3. Configure permissões se necessário

### Passo 7: Build e Teste

#### Android:
```bash
# No Android Studio: Build > Build Bundle(s) / APK(s)
# Ou via linha de comando:
cd android
./gradlew assembleDebug
```

#### iOS:
```bash
# No Xcode: Product > Archive
```

---

## 📦 Opção 2: PWA (Progressive Web App)

### Vantagens:
- ✅ Não precisa publicar nas stores
- ✅ Instalação direta pelo navegador
- ✅ Mais rápido de implementar

### Passo 1: Criar manifest.json

Já está criado! (ver arquivo `manifest.json`)

### Passo 2: Adicionar Service Worker

Crie um arquivo `sw.js` para cache offline.

### Passo 3: Testar

1. Abra o site em um navegador mobile
2. Vá em "Adicionar à tela inicial"
3. O app será instalado como PWA

---

## 🚀 Publicação nas Stores

### Google Play Store (Android)

1. **Criar conta de desenvolvedor**
   - Acesse: https://play.google.com/console
   - Taxa única: $25 USD

2. **Preparar assets:**
   - Ícone: 512x512px PNG
   - Screenshots: mínimo 2, máximo 8
   - Descrição do app
   - Política de privacidade (URL)

3. **Gerar AAB (Android App Bundle):**
   ```bash
   cd android
   ./gradlew bundleRelease
   ```
   Arquivo estará em: `android/app/build/outputs/bundle/release/app-release.aab`

4. **Upload no Play Console:**
   - Crie novo app
   - Faça upload do AAB
   - Preencha informações
   - Envie para revisão

### Apple App Store (iOS)

1. **Criar conta de desenvolvedor**
   - Acesse: https://developer.apple.com
   - Taxa anual: $99 USD

2. **Preparar assets:**
   - Ícone: 1024x1024px PNG
   - Screenshots para diferentes tamanhos de tela
   - Descrição do app
   - Política de privacidade (URL)

3. **Build no Xcode:**
   - Product > Archive
   - Distribute App
   - Escolha App Store Connect

4. **Upload no App Store Connect:**
   - Crie novo app
   - Configure informações
   - Envie para revisão

---

## 📝 Checklist antes de publicar

### Android:
- [ ] Ícone do app configurado
- [ ] Nome e descrição do app
- [ ] Screenshots (mínimo 2)
- [ ] Política de privacidade
- [ ] Versão do app configurada
- [ ] Assinatura digital configurada
- [ ] Testado em diferentes dispositivos

### iOS:
- [ ] Ícone do app (1024x1024)
- [ ] Screenshots para iPhone e iPad
- [ ] Descrição e keywords
- [ ] Política de privacidade
- [ ] Versão do app
- [ ] Certificados e perfis configurados
- [ ] Testado em diferentes dispositivos

---

## 🔧 Comandos úteis

```bash
# Sincronizar mudanças no código
npx cap sync

# Abrir projeto Android
npx cap open android

# Abrir projeto iOS
npx cap open ios

# Verificar plugins instalados
npx cap ls
```

---

## 📚 Recursos

- [Documentação Capacitor](https://capacitorjs.com/docs)
- [Google Play Console](https://play.google.com/console)
- [App Store Connect](https://appstoreconnect.apple.com)
- [PWA Builder](https://www.pwabuilder.com/)

---

## ⚠️ Importante

1. **Política de Privacidade**: É obrigatória para publicar nas stores
2. **Testes**: Teste em diferentes dispositivos antes de publicar
3. **Versões**: Configure versionamento adequado (ex: 1.0.0)
4. **Ícones**: Use ferramentas como [App Icon Generator](https://www.appicon.co/) para gerar todos os tamanhos necessários

---

## 🎯 Próximos passos recomendados

1. Adicionar splash screen personalizado
2. Configurar notificações push (opcional)
3. Adicionar analytics (opcional)
4. Implementar atualizações automáticas
5. Adicionar suporte offline completo
