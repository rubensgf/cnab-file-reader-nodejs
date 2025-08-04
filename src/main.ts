import { FileInputHandler } from './interfaces/cli/FileInputHandler';
import path from 'path'
import { readCNABFileFiltered } from './app/use-cases/read-cnab-filtered';
import { formatCNABOutput } from './domain/services/format-cnab-output';


async function main() {

const { filePath, segment, company , export: exportJson} = FileInputHandler.getArgs();

const lines = await readCNABFileFiltered(filePath, segment, company);

const resolvedExportPath = exportJson
? path.resolve(__dirname, './public', exportJson)
: undefined;

const output = await formatCNABOutput(lines, !!company, !!segment, resolvedExportPath);

console.log(output);

}

main().catch((err) => {
  console.error('Erro na execução:', err);
});
