const MAX_PLAYERS = 25;
const TEAM_SIZE = 5;
const TEAM_COUNT = 5;
const HISTORY_KEY = "futiQuintaHistory";
const PLAYERS_KEY = "futiQuintaPlayers";
const HISTORY_LIMIT = 10;

const playersContainer = document.getElementById("players");
const drawButton = document.getElementById("draw");
const resultsContainer = document.getElementById("results");
const clearAllBtn = document.getElementById("clear-all");
const clearHistoryBtn = document.getElementById("clear-history");
const historyList = document.getElementById("history-list");

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

function attachStarHandlers(container) {
  container.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    if (target.classList.contains("star")) {
      const value = Number(target.dataset.star);
      setStarValue(container, value);
    }
  });
}

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

function attachAutoSaveListeners() {
  const rows = playersContainer.querySelectorAll(".row");
  rows.forEach((row) => {
    const nameInput = row.querySelector(".name");
    const starsContainer = row.querySelector(".star-input");
    
    nameInput.addEventListener("input", savePlayers);
    nameInput.addEventListener("blur", savePlayers);
    
    starsContainer.addEventListener("click", () => {
      setTimeout(savePlayers, 0);
    });
  });
}

function savePlayers() {
  const players = readPlayers();
  const playersData = Array.from(playersContainer.querySelectorAll(".row")).map((row) => {
    const name = row.querySelector(".name").value.trim();
    const starsContainer = row.querySelector(".star-input");
    const stars = starsContainer.dataset.value ? Number(starsContainer.dataset.value) : null;
    return { name, stars };
  });
  localStorage.setItem(PLAYERS_KEY, JSON.stringify(playersData));
}

function loadPlayers() {
  try {
    const raw = localStorage.getItem(PLAYERS_KEY);
    if (!raw) return;
    const playersData = JSON.parse(raw);
    if (!Array.isArray(playersData)) return;
    
    const rows = playersContainer.querySelectorAll(".row");
    rows.forEach((row, idx) => {
      const playerData = playersData[idx];
      if (playerData) {
        row.querySelector(".name").value = playerData.name || "";
        setStarValue(row.querySelector(".star-input"), playerData.stars || null);
      }
    });
  } catch (e) {
    console.warn("Erro ao carregar jogadores salvos.", e);
  }
}

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

function validatePlayers(list) {
  const errors = [];
  if (list.length === 0) {
    errors.push("Informe pelo menos 1 jogador.");
  }
  if (list.length > MAX_PLAYERS) {
    errors.push(`Use no máximo ${MAX_PLAYERS} jogadores.`);
  }
  const missingStars = list.filter((p) => (p.name.length > 0 && (p.stars === null || Number.isNaN(p.stars))));
  if (missingStars.length > 0) {
    errors.push("Todos os jogadores precisam ter estrelas entre 1 e 5.");
  }
  const invalidStars = list.filter((p) => p.stars < 1 || p.stars > 5);
  if (invalidStars.length > 0) {
    errors.push("Use apenas valores de 1 a 5 estrelas.");
  }
  const missingNames = list.filter((p) => p.name.length === 0 && p.stars !== null);
  if (missingNames.length > 0) {
    errors.push("Todos os nomes precisam ser preenchidos.");
  }
  return errors;
}

function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function balanceTeams(players) {
  const fullTeams = Math.floor(players.length / TEAM_SIZE);
  const remainder = players.length % TEAM_SIZE;
  const neededTeams = Math.max(
    1,
    Math.min(TEAM_COUNT, fullTeams + (remainder > 0 ? 1 : 0))
  );

  const capacities = Array.from({ length: neededTeams }, (_, idx) => {
    if (idx < fullTeams) return TEAM_SIZE;
    if (idx === fullTeams && remainder > 0) return remainder;
    return TEAM_SIZE;
  });

  const teams = capacities.map((cap, idx) => ({
    idx,
    name: `Time ${idx + 1}`,
    players: [],
    stars: 0,
    cap,
  }));
  const sorted = shuffle(players).sort((a, b) => b.stars - a.stars);

  for (const player of sorted) {
    const availableTeams = teams.filter((team) => team.players.length < team.cap);
    if (availableTeams.length === 0) break;
    
    const target = availableTeams.reduce((best, team) => {
      if (!best) return team;
      if (team.stars !== best.stars) return team.stars < best.stars ? team : best;
      if (team.players.length !== best.players.length) {
        return team.players.length < best.players.length ? team : best;
      }
      return team.idx < best.idx ? team : best;
    }, null);
    
    if (target) {
      target.players.push(player);
      target.stars += player.stars;
    }
  }

  return teams
    .filter((team) => team.players.length > 0)
    .map((team) => ({
      name: team.name,
      players: team.players,
      stars: team.stars,
    }));
}

function renderTeams(teams) {
  if (!resultsContainer) {
    console.error("Container de resultados não encontrado!");
    return;
  }
  resultsContainer.innerHTML = "";
  
  if (!teams || teams.length === 0) {
    resultsContainer.innerHTML = "<p class=\"hint\">Nenhum time foi criado.</p>";
    return;
  }
  
  teams.forEach((team) => {
    if (!team || !team.players || team.players.length === 0) {
      return;
    }
    
    const card = document.createElement("div");
    card.className = "team-card";

    const header = document.createElement("header");
    header.innerHTML = `<span>${team.name}</span><span class="badge">${team.stars}⭐</span>`;
    card.appendChild(header);

    const list = document.createElement("ul");
    team.players.forEach((p) => {
      const li = document.createElement("li");
      li.innerHTML = `<span>${p.name}</span><span class="badge">${p.stars}⭐</span>`;
      list.appendChild(li);
    });
    card.appendChild(list);
    resultsContainer.appendChild(card);
  });
}

function showErrors(msgs) {
  let el = document.querySelector(".error");
  if (!el) {
    el = document.createElement("p");
    el.className = "error";
    drawButton.insertAdjacentElement("afterend", el);
  }
  el.textContent = msgs.join(" ");
}

function clearErrors() {
  const el = document.querySelector(".error");
  if (el) el.remove();
}

function loadHistory() {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.warn("Histórico corrompido, limpando.", e);
    localStorage.removeItem(HISTORY_KEY);
    return [];
  }
}

function saveHistoryEntry(teams) {
  const history = loadHistory();
  const entry = { id: crypto.randomUUID(), date: new Date().toISOString(), teams };
  const next = [entry, ...history].slice(0, HISTORY_LIMIT);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
  return next;
}

function renderHistoryList(history) {
  historyList.innerHTML = "";
  if (!history.length) {
    historyList.innerHTML = "<p class=\"hint\">Nenhum registro salvo ainda.</p>";
    return;
  }
  history.forEach((item) => {
    // Pular itens antigos que não têm a estrutura de times
    if (!item.teams || !Array.isArray(item.teams) || item.teams.length === 0) {
      return;
    }
    
    const block = document.createElement("div");
    block.className = "history-entry";
    const date = new Date(item.date).toLocaleString("pt-BR");
    const totalPlayers = item.teams.reduce((sum, team) => {
      return sum + (team.players && Array.isArray(team.players) ? team.players.length : 0);
    }, 0);
    block.innerHTML = `<header><span>${date}</span><span class="badge">${item.teams.length} times • ${totalPlayers} jogadores</span></header>`;

    const teamsContainer = document.createElement("div");
    teamsContainer.className = "history-teams";
    item.teams.forEach((team) => {
      if (!team || !team.players || !Array.isArray(team.players) || team.players.length === 0) {
        return;
      }
      
      const teamCard = document.createElement("div");
      teamCard.className = "history-team-card";
      teamCard.innerHTML = `<div class="history-team-header"><span>${team.name || "Time"}</span><span class="badge">${team.stars || 0}⭐</span></div>`;
      
      const ul = document.createElement("ul");
      team.players.forEach((p) => {
        if (!p) return;
        const li = document.createElement("li");
        li.innerHTML = `<span>${p.name || ""}</span><span class="badge">${p.stars || 0}⭐</span>`;
        ul.appendChild(li);
      });
      teamCard.appendChild(ul);
      teamsContainer.appendChild(teamCard);
    });
    block.appendChild(teamsContainer);
    historyList.appendChild(block);
  });
}

function handleDraw() {
  clearErrors();
  const players = readPlayers();
  console.log("Jogadores lidos:", players);
  const errors = validatePlayers(players);
  if (errors.length) {
    console.log("Erros de validação:", errors);
    showErrors(errors);
    return;
  }
  const teams = balanceTeams(players);
  console.log("Times criados:", teams);
  if (!teams || teams.length === 0) {
    showErrors(["Erro ao criar os times. Verifique os dados dos jogadores."]);
    return;
  }
  renderTeams(teams);
  const history = saveHistoryEntry(teams);
  renderHistoryList(history);
}

function handleClearAll() {
  createPlayerRows();
  resultsContainer.innerHTML = "";
  clearErrors();
  localStorage.removeItem(PLAYERS_KEY);
}

function handleClearHistory() {
  localStorage.removeItem(HISTORY_KEY);
  renderHistoryList([]);
}

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
