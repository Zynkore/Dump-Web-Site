const PASTA_ARQUIVOS = "Files";
const EXTENSOES_PERMITIDAS = [".zip", ".cpp", ".cs"];
const TEXTOS = {
  "pt-BR": {
    idioma: "Idioma",
    titulo: "Dumps",
    games: "Games",
    subGames: "best dumps · fast download",
    sub: "Arquivos organizados por jogo e versão. Busque o jogo e toque em Baixar.",
    busca: "Buscar jogo ou versão",
    baixar: "Baixar",
    dump: "dump", dumps: "dumps",
    listaTitulo: "Lista de dumps", verLista: "Ver lista de dumps", ocultarLista: "Ocultar lista", maisNovos: "Mais novos primeiro", maisAntigos: "Mais antigos primeiro", jogo: "Jogo", dataTabela: "Data", jogoKicker: "Card do jogo", abrirJogo: "Abrir jogo", voltar: "Voltar", baixarTodos: "Baixar todos", baixarVersao: "Baixar versão", bits: "Bits",
    versao: "versão", versoes: "versões",
    data: "Data", maisRecente: "Mais recente", primeiro: "Primeiro",
    vazio: "Nenhum dump encontrado. Tente outro nome de jogo ou versão.",
    erro: "Não foi possível carregar o Module.json. Abra o site pelo endereço publicado (Netlify), não direto do arquivo no celular.",
    aviso: "By Claude & Manus, exceto os dumps.",
    discord: "Quer algum dump ou algum está desatualizado? Fale comigo no Discord:"
  },
  "pt-PT": {
    idioma: "Idioma",
    titulo: "Dumps",
    games: "Games",
    subGames: "best dumps · fast download",
    sub: "Ficheiros organizados por jogo e versão. Procure o jogo e toque em Transferir.",
    busca: "Procurar jogo ou versão",
    baixar: "Transferir",
    dump: "dump", dumps: "dumps",
    listaTitulo: "Lista de dumps", verLista: "Ver lista de dumps", ocultarLista: "Ocultar lista", maisNovos: "Mais novos primeiro", maisAntigos: "Mais antigos primeiro", jogo: "Jogo", dataTabela: "Data", jogoKicker: "Card do jogo", abrirJogo: "Abrir jogo", voltar: "Voltar", baixarTodos: "Baixar todos", baixarVersao: "Baixar versão", bits: "Bits",
    versao: "versão", versoes: "versões",
    data: "Data", maisRecente: "Mais recente", primeiro: "Primeiro",
    vazio: "Nenhum dump encontrado. Experimente outro nome de jogo ou versão.",
    erro: "Não foi possível carregar o Module.json. Abra o site pelo endereço publicado (Netlify) e não diretamente do ficheiro no telemóvel.",
    aviso: "By Claude & Manus, exceto os dumps.",
    discord: "Quer algum dump ou algum está desatualizado? Fale comigo no Discord:"
  },
  "en-US": {
    idioma: "Language",
    titulo: "Dumps",
    games: "Games",
    subGames: "best dumps · fast download",
    sub: "Files organized by game and version. Search for a game and tap Download.",
    busca: "Search game or version",
    baixar: "Download",
    dump: "dump", dumps: "dumps",
    listaTitulo: "Dump list", verLista: "Show dump list", ocultarLista: "Hide dump list", maisNovos: "Newest first", maisAntigos: "Oldest first", jogo: "Game", dataTabela: "Date", jogoKicker: "Game card", abrirJogo: "Open game", voltar: "Back", baixarTodos: "Download all", baixarVersao: "Download version", bits: "Bits",
    versao: "version", versoes: "versions",
    data: "Date", maisRecente: "Latest", primeiro: "First",
    vazio: "No dumps found. Try another game name or version.",
    erro: "Couldn't load Module.json. Open the site from its published address (Netlify), not straight from the file on your phone.",
    aviso: "By Claude & Manus, except for the dumps.",
    discord: "Want a dump, or is one out of date? Message me on Discord:"
  },
  "en-GB": {
    idioma: "Language",
    titulo: "Dumps",
    games: "Games",
    subGames: "best dumps · fast download",
    sub: "Files organised by game and version. Search for a game and tap Download.",
    busca: "Search game or version",
    baixar: "Download",
    dump: "dump", dumps: "dumps",
    listaTitulo: "Dump list", verLista: "Show dump list", ocultarLista: "Hide dump list", maisNovos: "Newest first", maisAntigos: "Oldest first", jogo: "Game", dataTabela: "Date", jogoKicker: "Game card", abrirJogo: "Open game", voltar: "Back", baixarTodos: "Download all", baixarVersao: "Download version", bits: "Bits",
    versao: "version", versoes: "versions",
    data: "Date", maisRecente: "Latest", primeiro: "First",
    vazio: "No dumps found. Try another game name or version.",
    erro: "Couldn't load Module.json. Open the site from its published address (Netlify), not straight from the file on your mobile.",
    aviso: "By Claude & Manus, except for the dumps.",
    discord: "Want a dump, or is one out of date? Message me on Discord:"
  }
};

const ALIAS = {
  "pt-AO": "pt-PT", "pt-MZ": "pt-PT",
  "en-AU": "en-GB", "en-IN": "en-GB", "en-CA": "en-US"
};

const NOMES = {
  "pt-BR": "Português (Brasil)",
  "pt-PT": "Português (Portugal)",
  "pt-AO": "Português (Angola)",
  "pt-MZ": "Português (Moçambique)",
  "en-US": "English (United States)",
  "en-GB": "English (United Kingdom)",
  "en-AU": "English (Australia)",
  "en-CA": "English (Canada)",
  "en-IN": "English (India)"
};

function escolherIdiomaInicial() {
  try {
    const salvo = localStorage.getItem("idioma");
    if (salvo && NOMES[salvo]) return salvo;
  } catch (e) {}
  const preferidos = (navigator.languages && navigator.languages.length) ? navigator.languages : [navigator.language || ""];
  for (const l of preferidos) {
    const exato = Object.keys(NOMES).find(k => k.toLowerCase() === l.toLowerCase());
    if (exato) return exato;
    const base = l.slice(0, 2).toLowerCase();
    if (base === "pt") return "pt-BR";
    if (base === "en") return "en-US";
  }
  return "en-US";
}

let IDIOMA = escolherIdiomaInicial();
function t(chave) {
  return TEXTOS[ALIAS[IDIOMA] || IDIOMA][chave];
}

const lista = document.getElementById("lista");
const vazio = document.getElementById("vazio");
const erro = document.getElementById("erro");
const campo = document.getElementById("q");
const contagem = document.getElementById("n");
const seletor = document.getElementById("idioma-botao");
const menuIdiomas = document.getElementById("idioma-menu");
const seletorContainer = document.querySelector(".idioma-picker");
const ordemControles = document.getElementById("ordem-controles");
const ordemNovo = document.getElementById("ordem-novo");
const ordemAntigo = document.getElementById("ordem-antigo");
const principalView = document.getElementById("principal-view");
const jogoView = document.getElementById("jogo-view");
const jogoTitulo = document.getElementById("jogo-titulo");
const jogoResumo = document.getElementById("jogo-resumo");
const jogoDumps = document.getElementById("jogo-dumps");
const voltarBotao = document.getElementById("voltar-botao");
const baixarTodosBotao = document.getElementById("baixar-todos");
const detalheNovo = document.getElementById("detalhe-novo");
const detalheAntigo = document.getElementById("detalhe-antigo");
let ORDEM = "novo";
let JOGO_DA_ROTA = "";

let JOGOS = [];
let CARREGOU = false;
let FALHOU = false;

function normalizarArquivo(nome) {
  const arquivo = String(nome || "").trim();
  return EXTENSOES_PERMITIDAS.some(ext => arquivo.toLowerCase().endsWith(ext)) ? arquivo : "";
}

function montarJogos(modulo) {
  const jogos = (modulo && modulo.Games) || [];
  if (Array.isArray(jogos)) {
    return jogos.map(item => {
      const jogo = String(item.gameName || item.name || "").trim();
      const display = String(item.display || jogo).trim();
      const dumps = Array.isArray(item.Dumps) ? item.Dumps : [];
      const versoes = dumps.map(dump => {
        if (typeof dump === "string") {
          const arquivo = normalizarArquivo(dump);
          return arquivo ? { nome: arquivo.replace(/\.(zip|cpp|cs)$/i, ""), arquivo, base: arquivo, bits: [], arquivos: {} } : null;
        }
        const informado = String(dump.file || "").trim();
        const arquivo = normalizarArquivo(informado);
        return {
          nome: String(dump.version || dump.name || informado).trim(),
          data: String(dump.date || "").trim(),
          arquivo: arquivo || "",
          base: arquivo || informado,
          maisRecente: dump.IsLatestDump === true,
          primeiro: dump.IsFirstDump === true,
          bits: (Array.isArray(dump.Bits) ? dump.Bits : Array.isArray(dump.bits) ? dump.bits : []).map(Number).filter(Number.isFinite),
          arquivos: dump.files && typeof dump.files === "object" ? dump.files : {}
        };
      }).filter(item => item && item.base);
      return { jogo, display, versoes };
    }).filter(item => item.jogo && item.versoes.length);
  }
  return Object.entries(jogos).map(([jogo, versoes]) => ({
    jogo,
    display: jogo,
    versoes: (Array.isArray(versoes) ? versoes : []).map(valor => {
      const texto = String(valor);
      const arquivo = normalizarArquivo(texto);
      return { nome: texto.replace(/\.(zip|cpp|cs)$/i, ""), arquivo, base: arquivo || texto, bits: [], arquivos: {} };
    })
  }));
}

function caminhoDoArquivo(jogo, arquivo) {
  const caminho = arquivo.split("/").map(encodeURIComponent).join("/");
  return PASTA_ARQUIVOS + "/" + encodeURIComponent(jogo) + "/" + caminho;
}

async function descobrirArquivo(jogo, versao) {
  if (versao.arquivo) return versao;
  for (const extensao of EXTENSOES_PERMITIDAS) {
    const candidato = versao.base + extensao;
    try {
      const resposta = await fetch(caminhoDoArquivo(jogo, candidato), { method: "HEAD", cache: "no-cache" });
      if (resposta.ok) return { ...versao, arquivo: candidato };
    } catch (e) {}
  }
  return null;
}

async function descobrirArquivos(jogos) {
  const resultado = [];
  for (const jogo of jogos) {
    const versoes = (await Promise.all(jogo.versoes.map(v => descobrirArquivo(jogo.jogo, v)))).filter(Boolean);
    if (versoes.length) resultado.push({ ...jogo, versoes });
  }
  return resultado;
}

function valorDaData(data) {
  const partes = String(data || "").split("/").map(Number);
  if (partes.length !== 3 || partes.some(Number.isNaN)) return 0;
  const [dia, mes, ano] = partes;
  return new Date(ano, mes - 1, dia).getTime();
}

function compararMaisRecente(a, b) {
  const porData = valorDaData(b.data) - valorDaData(a.data);
  if (porData) return porData;
  if (a.maisRecente !== b.maisRecente) return a.maisRecente ? -1 : 1;
  return b.nome.localeCompare(a.nome, undefined, { numeric: true, sensitivity: "base" });
}

function criarLinha(jogo, versao) {
  const li = document.createElement("li");
  li.className = "linha";
  const info = document.createElement("div");
  info.className = "info";
  const ver = document.createElement("span");
  ver.className = "versao";
  ver.textContent = versao.nome;
  info.append(ver);
  if (versao.data) {
    const data = document.createElement("span");
    data.className = "data";
    data.textContent = versao.data;
    info.append(data);
  }
  if (versao.maisRecente || versao.primeiro) {
    const selos = document.createElement("span");
    selos.className = "selos";
    if (versao.maisRecente) {
      const selo = document.createElement("span");
      selo.className = "selo latest";
      selo.textContent = t("maisRecente");
      selos.append(selo);
    }
    if (versao.primeiro) {
      const selo = document.createElement("span");
      selo.className = "selo first";
      selo.textContent = t("primeiro");
      selos.append(selo);
    }
    info.append(selos);
  }
  const baixar = document.createElement("a");
  baixar.className = "btn";
  baixar.textContent = t("baixar");
  baixar.href = caminhoDoArquivo(jogo, versao.arquivo);
  baixar.setAttribute("download", versao.arquivo.split("/").pop());
  li.append(info, baixar);
  return li;
}

function criarBloco(nomeExibido, jogo, versoes) {
  const sec = document.createElement("section");
  sec.className = "bloco";
  sec.id = jogo;
  const h = document.createElement("h2");
  const link = document.createElement("a");
  link.className = "jogo-link";
  link.href = `#${encodeURIComponent(jogo)}/Dump-list/Id=${ORDEM === "antigo" ? "b-a" : "a-b"}`;
  link.textContent = nomeExibido;
  h.append(link);
  const n = document.createElement("span");
  n.className = "n";
  n.textContent = versoes.length + " " + (versoes.length === 1 ? t("versao") : t("versoes"));
  h.append(n);
  const ul = document.createElement("ul");
  ul.className = "linhas";
  for (const v of versoes) ul.append(criarLinha(jogo, v));
  sec.append(h, ul);
  return sec;
}

function lerRota() {
  const partes = decodeURIComponent(location.hash.slice(1)).split("/");
  JOGO_DA_ROTA = partes[0] && partes[0].toLowerCase() !== "dump-list" ? partes[0] : "";
  ORDEM = partes.some(parte => parte.toLowerCase() === "id=b-a") ? "antigo" : "novo";
}

function atualizarRota(ordem = ORDEM) {
  const jogo = JOGO_DA_ROTA ? encodeURIComponent(JOGO_DA_ROTA) : "";
  const id = ordem === "antigo" ? "b-a" : "a-b";
  const rota = jogo ? `#${jogo}/Dump-list/Id=${id}` : `#Dump-list/Id=${id}`;
  if (location.hash !== rota) history.pushState(null, "", rota);
  lerRota();
  mostrar();
}

function criarListaPorJogo(registros) {
  const grupos = new Map();
  for (const registro of registros) {
    if (!grupos.has(registro.jogo)) grupos.set(registro.jogo, { display: registro.display, dumps: [] });
    grupos.get(registro.jogo).dumps.push(registro.dump);
  }
  return [...grupos.entries()].map(([jogo, grupo]) => {
    const card = document.createElement("article");
    card.className = "jogo-card";
    const cabecalho = document.createElement("div");
    cabecalho.className = "jogo-card-cabecalho";
    const titulo = document.createElement("h2");
    const link = document.createElement("a");
    link.href = `#${encodeURIComponent(jogo)}/Dump-list/Id=${ORDEM === "antigo" ? "b-a" : "a-b"}`;
    link.textContent = grupo.display;
    titulo.append(link);
    const resumo = document.createElement("p");
    resumo.textContent = `${grupo.dumps.length} ${grupo.dumps.length === 1 ? t("versao") : t("versoes")}`;
    cabecalho.append(titulo, resumo);
    const ultima = document.createElement("span");
    ultima.className = "jogo-card-ultima";
    const maisRecente = [...grupo.dumps].sort(compararMaisRecente)[0];
    ultima.textContent = maisRecente ? `${maisRecente.nome}${maisRecente.data ? " · " + maisRecente.data : ""}` : "";
    const abrir = document.createElement("a");
    abrir.className = "btn jogo-card-botao";
    abrir.href = link.href;
    abrir.textContent = t("abrirJogo");
    card.append(cabecalho, ultima, abrir);
    return card;
  });
}

function candidatosDoBit(dump, bit) {
  if (!bit) return [dump.arquivo];
  const informado = dump.arquivo || dump.base;
  const extensao = (informado.match(/\.(zip|cpp|cs)$/i) || ["", ".zip"])[0];
  const base = informado.replace(/\.(zip|cpp|cs)$/i, "");
  const mapeado = dump.arquivos[String(bit)] || dump.arquivos[bit];
  return mapeado ? [mapeado] : [`${base}-${bit}${extensao}`, `${base}_${bit}${extensao}`, `${base}.${bit}${extensao}`];
}

async function baixarArquivo(jogo, dump, bit = null) {
  const candidatos = candidatosDoBit(dump, bit);
  let arquivo = candidatos[0];
  for (const candidato of candidatos) {
    try {
      const resposta = await fetch(caminhoDoArquivo(jogo, candidato), { method: "HEAD", cache: "no-cache" });
      if (resposta.ok) { arquivo = candidato; break; }
    } catch (e) {}
  }
  const link = document.createElement("a");
  link.href = caminhoDoArquivo(jogo, arquivo);
  link.download = arquivo.split("/").pop();
  link.click();
}

function criarDumpDetalhe(jogo, dump) {
  const card = document.createElement("article");
  card.className = "dump-card";
  const cabecalho = document.createElement("div");
  cabecalho.className = "dump-card-cabecalho";
  const titulo = document.createElement("h2");
  titulo.textContent = dump.nome;
  cabecalho.append(titulo);
  if (dump.data) {
    const data = document.createElement("time");
    data.textContent = dump.data;
    cabecalho.append(data);
  }
  const meta = document.createElement("div");
  meta.className = "dump-meta";
  if (dump.maisRecente) meta.append(Object.assign(document.createElement("span"), { className: "selo latest", textContent: t("maisRecente") }));
  if (dump.primeiro) meta.append(Object.assign(document.createElement("span"), { className: "selo first", textContent: t("primeiro") }));
  const conteudo = document.createElement("div");
  conteudo.className = "dump-card-acoes";
  if (dump.bits.length) {
    const legenda = document.createElement("span");
    legenda.className = "bits-legenda";
    legenda.textContent = t("bits") + ":";
    conteudo.append(legenda);
    for (const bit of dump.bits) {
      const botao = document.createElement("button");
      botao.className = "bit-botao";
      botao.type = "button";
      botao.textContent = String(bit);
      botao.addEventListener("click", () => baixarArquivo(jogo, dump, bit));
      conteudo.append(botao);
    }
  }
  const baixar = document.createElement("button");
  baixar.className = "btn";
  baixar.type = "button";
  baixar.textContent = t("baixarVersao");
  baixar.addEventListener("click", () => baixarArquivo(jogo, dump));
  conteudo.append(baixar);
  card.append(cabecalho, meta, conteudo);
  return card;
}

function mostrarDetalhe() {
  const jogo = JOGOS.find(item => item.jogo === JOGO_DA_ROTA);
  if (!jogo) { principalView.hidden = false; jogoView.hidden = true; return; }
  principalView.hidden = true;
  jogoView.hidden = false;
  const dumps = [...jogo.versoes].sort(ORDEM === "novo" ? compararMaisRecente : (a, b) => compararMaisRecente(b, a));
  jogoTitulo.textContent = jogo.display;
  jogoResumo.textContent = `${dumps.length} ${dumps.length === 1 ? t("versao") : t("versoes")}`;
  baixarTodosBotao.textContent = t("baixarTodos");
  voltarBotao.textContent = "‹ " + t("voltar");
  detalheNovo.textContent = t("maisNovos");
  detalheAntigo.textContent = t("maisAntigos");
  detalheNovo.classList.toggle("ativo", ORDEM === "novo");
  detalheAntigo.classList.toggle("ativo", ORDEM === "antigo");
  jogoDumps.replaceChildren(...dumps.map(dump => criarDumpDetalhe(jogo.jogo, dump)));
  baixarTodosBotao.onclick = async () => {
    const arquivos = dumps.flatMap(dump => dump.bits.length ? dump.bits.map(bit => [dump, bit]) : [[dump, null]]);
    for (const [dump, bit] of arquivos) {
      await baixarArquivo(jogo.jogo, dump, bit);
      await new Promise(resolve => setTimeout(resolve, 180));
    }
  };
}

function mostrar() {
  if (JOGO_DA_ROTA) { mostrarDetalhe(); return; }
  principalView.hidden = false;
  jogoView.hidden = true;
  const q = campo.value.trim().toLowerCase();
  const registros = [];
  for (const g of JOGOS) {
    if (JOGO_DA_ROTA && g.jogo !== JOGO_DA_ROTA) continue;
    for (const dump of g.versoes) {
      const texto = (g.jogo + " " + g.display + " " + dump.nome + " " + dump.data).toLowerCase();
      if (texto.includes(q)) registros.push({ jogo: g.jogo, display: g.display, dump });
    }
  }
  registros.sort((a, b) => ORDEM === "novo"
    ? compararMaisRecente(a.dump, b.dump)
    : compararMaisRecente(b.dump, a.dump));

  lista.replaceChildren(...(registros.length ? criarListaPorJogo(registros) : []));
  lista.hidden = false;
  ordemControles.hidden = false;
  ordemNovo.classList.toggle("ativo", ORDEM === "novo");
  ordemAntigo.classList.toggle("ativo", ORDEM === "antigo");
  vazio.hidden = !CARREGOU || registros.length > 0;
  erro.hidden = !FALHOU;
  contagem.textContent = CARREGOU ? registros.length + " " + (registros.length === 1 ? t("dump") : t("dumps")) : "";
}

function aplicarIdioma() {
  document.documentElement.lang = IDIOMA;
  document.title = t("titulo");
  document.querySelectorAll("[data-i18n]").forEach(el => { el.textContent = t(el.dataset.i18n); });
  document.getElementById("rotulo-idioma").textContent = t("idioma");
  campo.placeholder = t("busca");
  campo.setAttribute("aria-label", t("busca"));
  seletor.textContent = `${IDIOMA} · ${NOMES[IDIOMA]}`;
  menuIdiomas.querySelectorAll(".idioma-opcao").forEach(opcao => {
    const ativo = opcao.dataset.codigo === IDIOMA;
    opcao.classList.toggle("ativo", ativo);
    opcao.setAttribute("aria-selected", String(ativo));
  });
  mostrar();
}

function fecharMenuIdiomas() {
  menuIdiomas.hidden = true;
  seletor.setAttribute("aria-expanded", "false");
}

function abrirMenuIdiomas() {
  menuIdiomas.hidden = false;
  seletor.setAttribute("aria-expanded", "true");
}

for (const [codigo, nome] of Object.entries(NOMES)) {
  const opcao = document.createElement("button");
  opcao.type = "button";
  opcao.className = "idioma-opcao";
  opcao.dataset.codigo = codigo;
  opcao.setAttribute("role", "option");
  opcao.innerHTML = `<span class="idioma-codigo">${codigo}</span><span>${nome}</span>`;
  opcao.addEventListener("click", () => {
    IDIOMA = codigo;
    try { localStorage.setItem("idioma", IDIOMA); } catch (e) {}
    fecharMenuIdiomas();
    aplicarIdioma();
  });
  menuIdiomas.append(opcao);
}

seletor.addEventListener("click", () => {
  if (menuIdiomas.hidden) abrirMenuIdiomas();
  else fecharMenuIdiomas();
});

ordemNovo.addEventListener("click", () => atualizarRota("novo"));
ordemAntigo.addEventListener("click", () => atualizarRota("antigo"));
window.addEventListener("hashchange", () => { lerRota(); mostrar(); });
voltarBotao.addEventListener("click", () => { history.pushState(null, "", location.pathname + location.search); lerRota(); mostrar(); });
detalheNovo.addEventListener("click", () => atualizarRota("novo"));
detalheAntigo.addEventListener("click", () => atualizarRota("antigo"));

const menuBotao = document.getElementById("menu-botao");
menuBotao.addEventListener("click", () => {
  const aberto = menuBotao.getAttribute("aria-expanded") === "true";
  menuBotao.setAttribute("aria-expanded", String(!aberto));
  menuBotao.classList.toggle("aberto", !aberto);
  if (!aberto) campo.focus();
});
seletor.addEventListener("keydown", event => {
  if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    abrirMenuIdiomas();
    menuIdiomas.querySelector(`[data-codigo="${IDIOMA}"]`)?.focus();
  }
  if (event.key === "Escape") fecharMenuIdiomas();
});
document.addEventListener("click", event => {
  if (!seletorContainer.contains(event.target)) fecharMenuIdiomas();
});
campo.addEventListener("input", mostrar);
lerRota();
aplicarIdioma();

fetch("Module.json", { cache: "no-cache" })
  .then(r => { if (!r.ok) throw new Error(r.status); return r.json(); })
  .then(async m => { JOGOS = await descobrirArquivos(montarJogos(m)); CARREGOU = true; mostrar(); })
  .catch(() => { FALHOU = true; mostrar(); });
