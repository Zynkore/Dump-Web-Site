const PASTA_ARQUIVOS = "Files";
const EXTENSOES_PERMITIDAS = [".zip", ".cpp", ".cs"];
const TEXTOS = {
  "pt-BR": {
    idioma: "Idioma",
    titulo: "Dumps de jogos",
    sub: "Arquivos de dump organizados por jogo e versão. Busque o jogo e toque em Baixar.",
    busca: "Buscar jogo ou versão",
    baixar: "Baixar",
    dump: "dump", dumps: "dumps",
    versao: "versão", versoes: "versões",
    data: "Data", maisRecente: "Mais recente", primeiro: "Primeiro",
    vazio: "Nenhum dump encontrado. Tente outro nome de jogo ou versão.",
    erro: "Não foi possível carregar o Module.json. Abra o site pelo endereço publicado (Netlify), não direto do arquivo no celular.",
    aviso: "Este site foi criado pelo Claude (IA da Anthropic), exceto os dumps.",
    discord: "Quer algum dump ou algum está desatualizado? Fale comigo no Discord:"
  },
  "pt-PT": {
    idioma: "Idioma",
    titulo: "Dumps de jogos",
    sub: "Ficheiros de dump organizados por jogo e versão. Procure o jogo e toque em Transferir.",
    busca: "Procurar jogo ou versão",
    baixar: "Transferir",
    dump: "dump", dumps: "dumps",
    versao: "versão", versoes: "versões",
    data: "Data", maisRecente: "Mais recente", primeiro: "Primeiro",
    vazio: "Nenhum dump encontrado. Experimente outro nome de jogo ou versão.",
    erro: "Não foi possível carregar o Module.json. Abra o site pelo endereço publicado (Netlify) e não diretamente do ficheiro no telemóvel.",
    aviso: "Este site foi criado pelo Claude (IA da Anthropic), exceto os dumps.",
    discord: "Quer algum dump ou algum está desatualizado? Fale comigo no Discord:"
  },
  "en-US": {
    idioma: "Language",
    titulo: "Game dumps",
    sub: "Dump files organized by game and version. Search for a game and tap Download.",
    busca: "Search game or version",
    baixar: "Download",
    dump: "dump", dumps: "dumps",
    versao: "version", versoes: "versions",
    data: "Date", maisRecente: "Latest", primeiro: "First",
    vazio: "No dumps found. Try another game name or version.",
    erro: "Couldn't load Module.json. Open the site from its published address (Netlify), not straight from the file on your phone.",
    aviso: "This site was made by Claude (Anthropic's AI), except for the dumps.",
    discord: "Want a dump, or is one out of date? Message me on Discord:"
  },
  "en-GB": {
    idioma: "Language",
    titulo: "Game dumps",
    sub: "Dump files organised by game and version. Search for a game and tap Download.",
    busca: "Search game or version",
    baixar: "Download",
    dump: "dump", dumps: "dumps",
    versao: "version", versoes: "versions",
    data: "Date", maisRecente: "Latest", primeiro: "First",
    vazio: "No dumps found. Try another game name or version.",
    erro: "Couldn't load Module.json. Open the site from its published address (Netlify), not straight from the file on your mobile.",
    aviso: "This site was made by Claude (Anthropic's AI), except for the dumps.",
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
const seletor = document.getElementById("idioma");

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
          return arquivo ? { nome: arquivo.replace(/\.(zip|cpp|cs)$/i, ""), arquivo, base: arquivo } : null;
        }
        const informado = String(dump.file || "").trim();
        const arquivo = normalizarArquivo(informado);
        return {
          nome: String(dump.version || dump.name || informado).trim(),
          data: String(dump.date || "").trim(),
          arquivo: arquivo || "",
          base: arquivo || informado,
          maisRecente: dump.IsLatestDump === true,
          primeiro: dump.IsFirstDump === true
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
      return { nome: texto.replace(/\.(zip|cpp|cs)$/i, ""), arquivo, base: arquivo || texto };
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
  const h = document.createElement("h2");
  h.textContent = nomeExibido;
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

function mostrar() {
  const q = campo.value.trim().toLowerCase();
  const blocos = [];
  let total = 0;

  const ordenados = [...JOGOS].sort((a, b) => a.jogo.localeCompare(b.jogo, IDIOMA));
  for (const g of ordenados) {
    const versoes = g.versoes
      .filter(v => (g.display + " " + v.nome + " " + v.data).toLowerCase().includes(q))
      .sort((a, b) => b.nome.localeCompare(a.nome, undefined, { numeric: true }));
    if (!versoes.length) continue;
    total += versoes.length;
    blocos.push(criarBloco(g.display, g.jogo, versoes));
  }

  lista.replaceChildren(...blocos);
  vazio.hidden = !CARREGOU || blocos.length > 0;
  erro.hidden = !FALHOU;
  contagem.textContent = CARREGOU ? total + " " + (total === 1 ? t("dump") : t("dumps")) : "";
}

function aplicarIdioma() {
  document.documentElement.lang = IDIOMA;
  document.title = t("titulo");
  document.querySelectorAll("[data-i18n]").forEach(el => { el.textContent = t(el.dataset.i18n); });
  document.getElementById("rotulo-idioma").textContent = t("idioma");
  campo.placeholder = t("busca");
  campo.setAttribute("aria-label", t("busca"));
  seletor.value = IDIOMA;
  mostrar();
}

for (const [codigo, nome] of Object.entries(NOMES)) {
  const op = document.createElement("option");
  op.value = codigo; op.textContent = nome;
  seletor.append(op);
}
seletor.addEventListener("change", () => {
  IDIOMA = seletor.value;
  try { localStorage.setItem("idioma", IDIOMA); } catch (e) {}
  aplicarIdioma();
});
campo.addEventListener("input", mostrar);

aplicarIdioma();

fetch("Module.json", { cache: "no-cache" })
  .then(r => { if (!r.ok) throw new Error(r.status); return r.json(); })
  .then(async m => { JOGOS = await descobrirArquivos(montarJogos(m)); CARREGOU = true; mostrar(); })
  .catch(() => { FALHOU = true; mostrar(); });
