# Leitor de Arquivos CNAB (CLI)

## Introdução

Este projeto é uma CLI para leitura e manipulação de arquivos CNAB. O CNAB é um padrão da Febraban usado para comunicação entre empresas e instituições financeiras, com dados organizados em **arquivos de layout posicional** (como CNAB 240 e CNAB 400).

Aqui, o foco é interpretar um arquivo CNAB, extrair dados úteis, realizar buscas por **segmento** ou **empresa**, e exportar os resultados em JSON.

---

## Funcionalidades Implementadas

### 1. Leitura de Arquivo CNAB

- A CLI aceita um arquivo `.rem` via `--file`.
- Se nenhum arquivo for passado, um arquivo **default** será utilizado.

### 2. Busca por Segmento

- A opção `--segment` permite filtrar o arquivo por tipo de segmento (ex: `P`, `Q`, `R`).
- Retorna os dados encontrados com nome da empresa, posição no arquivo, etc.

### 3. Busca por Nome da Empresa

- A opção `--company` permite buscar partes do nome da empresa.
- O retorno inclui o nome completo, segmento e a posição encontrada.

### 4. Exportação para JSON

- Com `--export`, você pode salvar os dados filtrados em um arquivo `.json`.
- O conteúdo inclui:
  - Nome da empresa;
  - Endereço completo;
  - Segmento;
  - Posição da linha no arquivo original.

---

## Exemplos de Uso

```bash
# Utilizando o arquivo default
npm start

# Especificando um arquivo CNAB
npm start -- --file src/data/cnabCustom.rem

# Filtrando por segmento
npm start -- --file src/data/cnabCustom.rem --segment Q

# Filtrando por empresa
npm start -- --file src/data/cnabCustom.rem --company "cai"

# Exportando resultado em JSON
npm start -- --file src/data/cnabCustom.rem --segment Q --export resultadoQ.json


#testes automatizados
npm test



```
