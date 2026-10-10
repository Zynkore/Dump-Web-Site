import { readdir, writeFile } from "node:fs/promises";
import { join, relative, sep } from "node:path";

const root = "Files";
const allowed = new Set([".zip", ".cpp"]);
async function listarArquivos(dir) {
  const entradas = await readdir(dir, { withFileTypes: true });
  const arquivos = [];
  for (const entrada of entradas) {
    const caminho = join(dir, entrada.name);
    if (entrada.isDirectory()) arquivos.push(...await listarArquivos(caminho));
    else if (allowed.has(caminho.slice(caminho.lastIndexOf(".")).toLowerCase())) arquivos.push(caminho);
  }
  return arquivos;
}

const encontrados = await listarArquivos(root);
const porJogo = new Map();
for (const caminho of encontrados) {
  const partes = relative(root, caminho).split(sep);
  if (partes.length < 2) continue;
  const jogo = partes.shift();
  const arquivo = partes.join("/");
  const lista = porJogo.get(jogo) || [];
  const nome = arquivo.replace(/\.(zip|cpp)$/i, "");
  lista.push({ name: nome, file: arquivo });
  porJogo.set(jogo, lista);
}

const manifest = {
  Games: [...porJogo.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([gameName, Dumps]) => ({
    gameName,
    display: gameName,
    Dumps: Dumps.sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }))
  }))
};

await writeFile("Module.json", `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`Module.json gerado com ${encontrados.length} arquivo(s).`);
