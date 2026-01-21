# 📋 Relatório Técnico - Futi de Quinta

## Documentação Completa do Código

**Aplicativo:** Futi de Quinta  
**Desenvolvedor:** Carlos Cornejo  
**Ano:** 2026  
**Tecnologias:** HTML5, CSS3, JavaScript (Vanilla)

---

## 📑 Índice

1. [Visão Geral](#visão-geral)
2. [Estrutura HTML](#estrutura-html)
3. [Estilização CSS](#estilização-css)
4. [Lógica JavaScript](#lógica-javascript)
5. [Fluxo de Dados](#fluxo-de-dados)
6. [Armazenamento Local](#armazenamento-local)
7. [Algoritmo de Sorteio](#algoritmo-de-sorteio)

---

## 🎯 Visão Geral

O **Futi de Quinta** é uma aplicação web para sortear times de futebol de forma equilibrada, considerando o nível de habilidade de cada jogador (representado por estrelas de 1 a 5).

### Funcionalidades Principais:
- ✅ Cadastro de até 25 jogadores com nome e nível (1-5 estrelas)
- ✅ Sorteio automático de times balanceados
- ✅ Histórico de sorteios anteriores
- ✅ Persistência de dados no navegador
- ✅ Interface responsiva para desktop, tablet e mobile

---

## 📄 ESTRUTURA HTML

### 1. Cabeçalho (`<head>`)

```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <meta name="theme-color" content="#0a0a0a">
  <meta name="description" content="Aplicativo para sortear times de futebol de forma equilibrada">
  <title>Futi de Quinta</title>
  <link rel="icon" type="image/png" href="favicon.png">
  <link rel="manifest" href="manifest.json">
  <link rel="apple-touch-icon" href="favicon.png">
  <link rel="stylesheet" href="style.css">
</head>
```

**Explicação:**
- **charset="UTF-8"**: Suporte a caracteres especiais (acentos, etc.)
- **viewport**: Configuração responsiva para dispositivos móveis
- **theme-color**: Cor da barra de status em dispositivos móveis
- **manifest.json**: Configuração PWA (Progressive Web App)
- **apple-touch-icon**: Ícone para iOS

### 2. Estrutura do Corpo (`<body>`)

#### 2.1 Header (Cabeçalho)
```html
<header class="app-header">
  <div class="header-actions">
    <button id="clear-all" type="button" class="ghost">Limpar tudo</button>
  </div>
</header>
```

**Função:** Cabeçalho fixo com botão para limpar todos os dados.

#### 2.2 Main (Conteúdo Principal)

**Seção 1: Cadastro de Jogadores**
```html
<section class="card">
  <header class="card-header">
    <div>
      <h2>Jogadores</h2>
      <p>Preencha até 25 jogadores e suas estrelas (1-5).</p>
    </div>
    <button id="draw" type="button" class="primary">Sortear times</button>
  </header>
  
  <div class="table-header">
    <span>#</span>
    <span>Nome</span>
    <span>Estrelas</span>
  </div>
  <div id="players" class="players-grid"></div>
</section>
```

**Função:** 
- Container para cadastro de jogadores
- Grid dinâmico gerado via JavaScript
- Botão principal para iniciar o sorteio

**Seção 2: Times Sorteados**
```html
<section class="card">
  <header class="card-header">
    <div>
      <h2>Times sorteados</h2>
      <p>Distribuição balanceada por estrelas.</p>
    </div>
  </header>
  <div id="results" class="teams"></div>
</section>
```

**Função:** Exibe os times sorteados dinamicamente.

**Seção 3: Histórico**
```html
<section class="card">
  <header class="card-header">
    <div>
      <h2>Histórico de registros</h2>
      <p>Histórico dos times sorteados anteriormente.</p>
    </div>
    <button id="clear-history" type="button" class="ghost small">Apagar histórico</button>
  </header>
  <div id="history-list" class="history-list"></div>
</section>
```

**Função:** Lista histórico de sorteios anteriores.

#### 2.3 Template de Linha de Jogador
```html
<template id="player-row">
  <div class="row">
    <span class="idx"></span>
    <input type="text" class="name" placeholder="Nome do jogador">
    <div class="stars star-input" data-value="">
      <button type="button" class="star" data-star="1">★</button>
      <button type="button" class="star" data-star="2">★</button>
      <button type="button" class="star" data-star="3">★</button>
      <button type="button" class="star" data-star="4">★</button>
      <button type="button" class="star" data-star="5">★</button>
    </div>
  </div>
</template>
```

**Função:** Template HTML usado para criar dinamicamente as linhas de jogadores.

**Características:**
- `<template>`: Não é renderizado até ser clonado via JavaScript
- `data-value`: Armazena o valor selecionado das estrelas
- `data-star`: Identifica qual estrela foi clicada

#### 2.4 Footer (Rodapé)
```html
<footer class="app-footer">
  <p>Criado por <strong><a href="https://www.linkedin.com/in/carlosferreiracornejo/" target="_blank" rel="noopener noreferrer">Carlos Cornejo</a></strong> - 2026</p>
</footer>
```

**Função:** Informações de autoria com link para LinkedIn.

---

## 🎨 ESTILIZAÇÃO CSS

### 1. Reset e Configurações Globais

```css
* {
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
}
```

**Explicação:**
- `box-sizing: border-box`: Padding e border incluídos no cálculo de largura/altura
- `-webkit-tap-highlight-color`: Remove highlight azul ao tocar em mobile

### 2. Body e Background

```css
body {
  margin: 0;
  font-family: "Inter", system-ui, -apple-system, sans-serif;
  background-color: #0f172a;
  background-image: url("bg-estadio.png");
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  color: #e2e8f0;
  min-height: 100vh;
  position: relative;
}
```

**Explicação:**
- **Background fixo**: Imagem de fundo permanece fixa ao rolar
- **Overlay escuro**: `body::before` adiciona camada escura sobre a imagem
- **z-index**: Controla camadas de elementos

### 3. Header

```css
.app-header {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 40px 28px;
  min-height: 180px;
  background-color: #0a0a0a;
  background-image: url("header-futi-de-quinta.png");
  background-size: cover;
  background-position: center;
  position: sticky;
  top: 0;
  z-index: 2;
}
```

**Características:**
- **position: sticky**: Header fixo ao rolar
- **Overlay**: `::before` adiciona camada escura sobre imagem
- **z-index: 2**: Fica acima do conteúdo

### 4. Cards

```css
.card {
  background: #0b1222;
  border: 1px solid #1f2a44;
  border-radius: 14px;
  padding: 18px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
}
```

**Design:** Cards escuros com bordas sutis e sombra para profundidade.

### 5. Grid de Jogadores

```css
.row {
  display: grid;
  grid-template-columns: 50px 1fr 170px;
  gap: 10px;
  align-items: center;
}
```

**Layout:**
- **Coluna 1 (50px)**: Número do jogador
- **Coluna 2 (1fr)**: Nome (ocupa espaço restante)
- **Coluna 3 (170px)**: Estrelas (largura fixa)

### 6. Sistema de Estrelas

```css
.star-input .star {
  background: transparent;
  border: 1px solid #1f2a44;
  width: 32px;
  height: 32px;
  cursor: pointer;
  transition: all 0.15s ease;
}

.star-input .star.selected {
  background: linear-gradient(90deg, #facc15, #eab308);
  color: #0b1222;
  box-shadow: 0 0 10px rgba(250, 204, 21, 0.4);
}
```

**Funcionamento:**
- Estrelas vazias por padrão
- Ao clicar, preenche até a estrela selecionada
- Classe `.selected` aplica estilo amarelo com gradiente

### 7. Responsividade

**Media Queries:**

1. **Tablets (≤1024px)**: Ajustes de padding e espaçamento
2. **Mobile (≤768px)**: 
   - Grid de 3 colunas → 2 colunas
   - Botões em largura total
   - Fontes reduzidas
3. **Mobile pequeno (≤480px)**:
   - Grid ainda mais compacto
   - Estrelas menores (24px)
   - Espaçamentos mínimos

---

## ⚙️ LÓGICA JAVASCRIPT

### 1. Constantes e Variáveis Globais

```javascript
const MAX_PLAYERS = 25;
const TEAM_SIZE = 5;
const TEAM_COUNT = 5;
const HISTORY_KEY = "futiQuintaHistory";
const PLAYERS_KEY = "futiQuintaPlayers";
const HISTORY_LIMIT = 10;
```

**Explicação:**
- **MAX_PLAYERS**: Limite máximo de jogadores
- **TEAM_SIZE**: Jogadores por time (5)
- **TEAM_COUNT**: Máximo de times (5)
- **HISTORY_KEY/PLAYERS_KEY**: Chaves para localStorage
- **HISTORY_LIMIT**: Limite de registros no histórico

### 2. Seleção de Elementos DOM

```javascript
const playersContainer = document.getElementById("players");
const drawButton = document.getElementById("draw");
const resultsContainer = document.getElementById("results");
```

**Função:** Referências aos elementos principais do HTML.

### 3. Funções de Estrelas

#### 3.1 `setStarValue(container, value)`
```javascript
function setStarValue(container, value) {
  container.dataset.value = value ? String(value) : "";
  container.querySelectorAll(".star").forEach((starBtn) => {
    const starValue = Number(starBtn.dataset.star);
    if (value && starValue <= value) {
      starBtn.classList.add("selected");
    } else {
      starBtn.classList.remove("selected");
    }
  });
}
```

**Funcionamento:**
1. Armazena valor em `data-value`
2. Percorre todas as estrelas
3. Adiciona classe `selected` até a estrela clicada
4. Remove `selected` das estrelas acima

#### 3.2 `attachStarHandlers(container)`
```javascript
function attachStarHandlers(container) {
  container.addEventListener("click", (event) => {
    const target = event.target;
    if (target.classList.contains("star")) {
      const value = Number(target.dataset.star);
      setStarValue(container, value);
    }
  });
}
```

**Funcionamento:** Adiciona listener de clique para cada grupo de estrelas.

### 4. Gerenciamento de Jogadores

#### 4.1 `createPlayerRows()`
```javascript
function createPlayerRows() {
  const tpl = document.getElementById("player-row");
  playersContainer.innerHTML = "";
  for (let i = 1; i <= MAX_PLAYERS; i++) {
    const row = tpl.content.cloneNode(true);
    row.querySelector(".idx").textContent = i.toString().padStart(2, "0");
    attachStarHandlers(row.querySelector(".star-input"));
    playersContainer.appendChild(row);
  }
  attachAutoSaveListeners();
}
```

**Passo a passo:**
1. Obtém template HTML
2. Limpa container
3. Loop de 1 a 25
4. Clona template
5. Preenche número do jogador (01, 02, ...)
6. Adiciona handlers de estrelas
7. Insere no DOM
8. Adiciona listeners de salvamento

#### 4.2 `readPlayers()`
```javascript
function readPlayers() {
  const rows = Array.from(playersContainer.querySelectorAll(".row"));
  return rows
    .map((row) => {
      const name = row.querySelector(".name").value.trim();
      const starsContainer = row.querySelector(".star-input");
      const stars = starsContainer.dataset.value ? Number(starsContainer.dataset.value) : null;
      return { name, stars };
    })
    .filter((p) => p.name.length > 0 && p.stars !== null && !Number.isNaN(p.stars));
}
```

**Funcionamento:**
1. Seleciona todas as linhas
2. Mapeia cada linha para objeto `{name, stars}`
3. Filtra apenas jogadores válidos (com nome E estrelas)

### 5. Validação

```javascript
function validatePlayers(list) {
  const errors = [];
  if (list.length === 0) {
    errors.push("Informe pelo menos 1 jogador.");
  }
  if (list.length > MAX_PLAYERS) {
    errors.push(`Use no máximo ${MAX_PLAYERS} jogadores.`);
  }
  // ... mais validações
  return errors;
}
```

**Validações:**
- ✅ Mínimo 1 jogador
- ✅ Máximo 25 jogadores
- ✅ Todos com nome preenchido
- ✅ Todos com estrelas entre 1-5

### 6. Algoritmo de Sorteio

#### 6.1 `shuffle(array)` - Embaralhamento
```javascript
function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
```

**Algoritmo:** Fisher-Yates Shuffle (embaralhamento justo)

#### 6.2 `balanceTeams(players)` - Balanceamento

**Passo 1: Calcular número de times**
```javascript
const fullTeams = Math.floor(players.length / TEAM_SIZE);
const remainder = players.length % TEAM_SIZE;
const neededTeams = Math.max(1, Math.min(TEAM_COUNT, fullTeams + (remainder > 0 ? 1 : 0)));
```

**Exemplo:** 13 jogadores
- `fullTeams = Math.floor(13/5) = 2`
- `remainder = 13 % 5 = 3`
- `neededTeams = 2 + 1 = 3 times`

**Passo 2: Criar times com capacidades**
```javascript
const capacities = Array.from({ length: neededTeams }, (_, idx) => {
  if (idx < fullTeams) return TEAM_SIZE;  // Times completos
  if (idx === fullTeams && remainder > 0) return remainder;  // Time incompleto
  return TEAM_SIZE;
});
```

**Resultado:** `[5, 5, 3]` (2 times completos + 1 com 3 jogadores)

**Passo 3: Ordenar jogadores por nível**
```javascript
const sorted = shuffle(players).sort((a, b) => b.stars - a.stars);
```

**Estratégia:** Embaralha primeiro, depois ordena por estrelas (maior → menor)

**Passo 4: Distribuir jogadores**
```javascript
for (const player of sorted) {
  const availableTeams = teams.filter((team) => team.players.length < team.cap);
  const target = availableTeams.reduce((best, team) => {
    if (!best) return team;
    if (team.stars !== best.stars) return team.stars < best.stars ? team : best;
    if (team.players.length !== best.players.length) {
      return team.players.length < best.players.length ? team : best;
    }
    return team.idx < best.idx ? team : best;
  }, null);
  
  target.players.push(player);
  target.stars += player.stars;
}
```

**Lógica de seleção:**
1. Filtra times com espaço disponível
2. Escolhe time com **menor soma de estrelas**
3. Em caso de empate, escolhe com **menos jogadores**
4. Em caso de empate, escolhe **primeiro time** (Time 1)

**Objetivo:** Manter times balanceados em nível total.

### 7. Renderização

#### 7.1 `renderTeams(teams)`
```javascript
function renderTeams(teams) {
  resultsContainer.innerHTML = "";
  teams.forEach((team) => {
    const card = document.createElement("div");
    card.className = "team-card";
    
    const header = document.createElement("header");
    header.innerHTML = `<span>${team.name}</span><span class="badge">${team.stars}⭐</span>`;
    
    const list = document.createElement("ul");
    team.players.forEach((p) => {
      const li = document.createElement("li");
      li.innerHTML = `<span>${p.name}</span><span class="badge">${p.stars}⭐</span>`;
      list.appendChild(li);
    });
    
    card.appendChild(header);
    card.appendChild(list);
    resultsContainer.appendChild(card);
  });
}
```

**Funcionamento:** Cria elementos DOM dinamicamente para cada time.

### 8. Armazenamento Local (localStorage)

#### 8.1 Salvar Jogadores
```javascript
function savePlayers() {
  const playersData = Array.from(playersContainer.querySelectorAll(".row")).map((row) => {
    const name = row.querySelector(".name").value.trim();
    const starsContainer = row.querySelector(".star-input");
    const stars = starsContainer.dataset.value ? Number(starsContainer.dataset.value) : null;
    return { name, stars };
  });
  localStorage.setItem(PLAYERS_KEY, JSON.stringify(playersData));
}
```

**Trigger:** Chamado automaticamente ao digitar nome ou clicar estrelas.

#### 8.2 Carregar Jogadores
```javascript
function loadPlayers() {
  const raw = localStorage.getItem(PLAYERS_KEY);
  const playersData = JSON.parse(raw);
  rows.forEach((row, idx) => {
    const playerData = playersData[idx];
    if (playerData) {
      row.querySelector(".name").value = playerData.name || "";
      setStarValue(row.querySelector(".star-input"), playerData.stars || null);
    }
  });
}
```

**Funcionamento:** Restaura dados salvos ao carregar página.

#### 8.3 Histórico de Sorteios
```javascript
function saveHistoryEntry(teams) {
  const history = loadHistory();
  const entry = { 
    id: crypto.randomUUID(), 
    date: new Date().toISOString(), 
    teams 
  };
  const next = [entry, ...history].slice(0, HISTORY_LIMIT);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
  return next;
}
```

**Características:**
- ID único para cada registro
- Data/hora do sorteio
- Limite de 10 registros (mais recentes primeiro)

### 9. Handlers de Eventos

#### 9.1 `handleDraw()` - Sorteio
```javascript
function handleDraw() {
  clearErrors();
  const players = readPlayers();
  const errors = validatePlayers(players);
  if (errors.length) {
    showErrors(errors);
    return;
  }
  const teams = balanceTeams(players);
  renderTeams(teams);
  const history = saveHistoryEntry(teams);
  renderHistoryList(history);
}
```

**Fluxo:**
1. Limpa erros anteriores
2. Lê jogadores do formulário
3. Valida dados
4. Se válido: sorteia, renderiza, salva histórico

#### 9.2 `handleClearAll()` - Limpar tudo
```javascript
function handleClearAll() {
  createPlayerRows();
  resultsContainer.innerHTML = "";
  clearErrors();
  localStorage.removeItem(PLAYERS_KEY);
}
```

**Ação:** Limpa formulário, resultados e dados salvos.

#### 9.3 `handleClearHistory()` - Limpar histórico
```javascript
function handleClearHistory() {
  localStorage.removeItem(HISTORY_KEY);
  renderHistoryList([]);
}
```

**Ação:** Remove histórico do localStorage e atualiza UI.

### 10. Inicialização

```javascript
function init() {
  if (!playersContainer || !drawButton || !resultsContainer) {
    console.error("Elementos necessários não encontrados!");
    return;
  }
  
  createPlayerRows();
  loadPlayers();
  const history = loadHistory();
  renderHistoryList(history);

  drawButton.addEventListener("click", handleDraw);
  clearAllBtn.addEventListener("click", handleClearAll);
  clearHistoryBtn.addEventListener("click", handleClearHistory);
}

document.addEventListener("DOMContentLoaded", init);
```

**Fluxo de inicialização:**
1. Verifica elementos DOM
2. Cria linhas de jogadores
3. Carrega dados salvos
4. Carrega histórico
5. Adiciona event listeners

---

## 🔄 FLUXO DE DADOS

### Fluxo Completo do Sorteio

```
1. Usuário preenche jogadores
   ↓
2. savePlayers() salva automaticamente no localStorage
   ↓
3. Usuário clica "Sortear times"
   ↓
4. handleDraw() é chamado
   ↓
5. readPlayers() lê dados do formulário
   ↓
6. validatePlayers() valida dados
   ↓
7. balanceTeams() executa algoritmo de balanceamento
   ↓
8. renderTeams() exibe times na tela
   ↓
9. saveHistoryEntry() salva no histórico
   ↓
10. renderHistoryList() atualiza histórico na tela
```

### Fluxo de Persistência

```
Ao digitar nome ou clicar estrela:
  ↓
attachAutoSaveListeners() detecta mudança
  ↓
savePlayers() salva no localStorage
  ↓
Ao recarregar página:
  ↓
loadPlayers() restaura dados
  ↓
Formulário preenchido automaticamente
```

---

## 💾 ARMAZENAMENTO LOCAL

### Estrutura de Dados

**Jogadores (`PLAYERS_KEY`):**
```json
[
  { "name": "João", "stars": 5 },
  { "name": "Maria", "stars": 3 },
  ...
]
```

**Histórico (`HISTORY_KEY`):**
```json
[
  {
    "id": "uuid-único",
    "date": "2026-01-15T10:30:00.000Z",
    "teams": [
      {
        "name": "Time 1",
        "players": [...],
        "stars": 15
      },
      ...
    ]
  },
  ...
]
```

**Limite:** 10 registros mais recentes

---

## 🎲 ALGORITMO DE SORTEIO - Detalhado

### Exemplo Prático: 13 Jogadores

**Jogadores:**
- 5 estrelas: A, B, C
- 4 estrelas: D, E, F, G
- 3 estrelas: H, I, J
- 2 estrelas: K, L
- 1 estrela: M

**Passo 1: Calcular times**
- `fullTeams = 2` (times completos)
- `remainder = 3` (sobra)
- `neededTeams = 3`

**Passo 2: Capacidades**
- Time 1: 5 jogadores
- Time 2: 5 jogadores
- Time 3: 3 jogadores

**Passo 3: Embaralhar e ordenar**
- Ordem: A(5), B(5), C(5), D(4), E(4), F(4), G(4), H(3), I(3), J(3), K(2), L(2), M(1)

**Passo 4: Distribuir**

| Jogador | Estrelas | Time Escolhido | Motivo |
|---------|----------|----------------|--------|
| A | 5 | Time 1 (0⭐) | Menor soma |
| B | 5 | Time 2 (0⭐) | Menor soma (empate) |
| C | 5 | Time 3 (0⭐) | Menor soma (empate) |
| D | 4 | Time 1 (5⭐) | Menor soma |
| E | 4 | Time 2 (5⭐) | Menor soma (empate) |
| F | 4 | Time 3 (5⭐) | Menor soma (empate) |
| G | 4 | Time 1 (9⭐) | Menor soma |
| H | 3 | Time 2 (9⭐) | Menor soma (empate) |
| I | 3 | Time 3 (9⭐) | Menor soma (empate) |
| J | 3 | Time 1 (13⭐) | Menor soma |
| K | 2 | Time 2 (12⭐) | Menor soma |
| L | 2 | Time 3 (12⭐) | Menor soma (empate) |
| M | 1 | Time 2 (14⭐) | Menor soma |

**Resultado Final:**
- **Time 1**: A(5), D(4), G(4), J(3) = 16⭐
- **Time 2**: B(5), E(4), H(3), K(2), M(1) = 15⭐
- **Time 3**: C(5), F(4), I(3), L(2) = 14⭐

**Balanceamento:** Diferença máxima de 2 estrelas entre times.

---

## 📱 RESPONSIVIDADE

### Breakpoints

1. **Desktop (>1024px)**: Layout completo
2. **Tablet (768px-1024px)**: Ajustes de espaçamento
3. **Mobile (≤768px)**: 
   - Grid de 3 → 2 colunas
   - Botões em largura total
   - Header compacto
4. **Mobile pequeno (≤480px)**:
   - Grid ainda mais compacto
   - Estrelas menores
   - Fontes reduzidas

### Técnicas Utilizadas

- **Flexbox**: Para layouts flexíveis
- **Grid**: Para tabelas e cards
- **Media Queries**: Para diferentes tamanhos
- **Viewport Units**: Para tamanhos relativos
- **Touch-friendly**: Áreas de toque maiores em mobile

---

## 🔒 SEGURANÇA E BOAS PRÁTICAS

### Implementadas

✅ **Validação de dados**: Entrada sempre validada  
✅ **Sanitização**: `trim()` remove espaços  
✅ **Try-catch**: Tratamento de erros no localStorage  
✅ **Verificação de tipos**: `Array.isArray()`, `Number.isNaN()`  
✅ **rel="noopener noreferrer"**: Segurança em links externos  
✅ **Verificação de DOM**: Checagem antes de manipular elementos  

### Considerações

- **localStorage**: Dados locais, não sincronizados
- **Sem backend**: Aplicação totalmente client-side
- **Sem autenticação**: Dados acessíveis no navegador

---

## 🚀 PERFORMANCE

### Otimizações

1. **Event Delegation**: Listeners no container, não em cada elemento
2. **Template HTML**: Clonagem eficiente de elementos
3. **localStorage**: Persistência rápida e local
4. **CSS Transitions**: Animações suaves sem JavaScript
5. **Lazy Loading**: Histórico carregado sob demanda

### Possíveis Melhorias

- Virtual scrolling para muitos jogadores
- Debounce no salvamento automático
- Service Worker para cache offline
- Compressão de dados no localStorage

---

## 📊 ESTRUTURA DE ARQUIVOS

```
projeto-futebol/
├── index.html          # Estrutura HTML
├── style.css           # Estilos e responsividade
├── app.js              # Lógica JavaScript
├── favicon.png         # Ícone do aplicativo
├── manifest.json       # Configuração PWA
├── bg-estadio.png      # Imagem de fundo
├── header-futi-de-quinta.png  # Imagem do header
├── package.json        # Dependências (Capacitor)
├── capacitor.config.json  # Configuração Capacitor
└── README-MOBILE.md    # Documentação mobile
```

---

## 🎓 CONCEITOS TÉCNICOS UTILIZADOS

### HTML
- Semantic HTML5 (`<header>`, `<main>`, `<section>`, `<footer>`)
- Template elements (`<template>`)
- Data attributes (`data-value`, `data-star`)
- Meta tags para PWA

### CSS
- CSS Grid Layout
- Flexbox
- CSS Variables (poderia ser usado)
- Media Queries
- Pseudo-elementos (`::before`)
- Gradientes
- Transitions e Transforms
- z-index para camadas

### JavaScript
- DOM Manipulation
- Event Listeners
- Template Cloning
- Array Methods (map, filter, reduce, forEach)
- localStorage API
- JSON (serialização)
- Algoritmos (Fisher-Yates, Balanceamento)
- Error Handling (try-catch)
- Arrow Functions
- Template Literals
- Destructuring

---

## 📝 CONCLUSÃO

O **Futi de Quinta** é uma aplicação web completa e funcional que demonstra:

✅ **Estrutura HTML semântica e acessível**  
✅ **CSS moderno com design responsivo**  
✅ **JavaScript eficiente com algoritmos complexos**  
✅ **Persistência de dados local**  
✅ **Interface intuitiva e moderna**  
✅ **Código organizado e manutenível**  

**Tecnologias:** HTML5, CSS3, JavaScript (Vanilla)  
**Compatibilidade:** Navegadores modernos (Chrome, Firefox, Safari, Edge)  
**Dispositivos:** Desktop, Tablet, Mobile  

---

**Desenvolvido por:** Carlos Cornejo  
**Ano:** 2026  
**Licença:** MIT
