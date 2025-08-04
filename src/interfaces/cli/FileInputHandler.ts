import path from 'path';
import { existsSync } from 'fs';

interface CLIArgs {
  filePath: string;
  segment?: string;
  company?: string;
  export?: string;
}

export class FileInputHandler {
  static getArgs(): CLIArgs {
    
    const args = process.argv.slice(2);

    const fileArgIndex = args.indexOf('--file');
    const segmentArgIndex = args.indexOf('--segment') !== -1 ? args.indexOf('--segment') : args.indexOf('-s');
    const companyArgIndex = args.indexOf('--company');
    const exportArgIndex = args.indexOf('--export');

  
    let filePath = path.resolve(__dirname, '../../data/cnabExample.rem');

    if (fileArgIndex !== -1 && args[fileArgIndex + 1]) {

      filePath = path.resolve(args[fileArgIndex + 1]);
    }
   
    if (!existsSync(filePath)) {
      throw new Error(`Arquivo não encontrado: ${filePath}`);
    }

    const segment = segmentArgIndex !== -1 ? args[segmentArgIndex + 1]?.toUpperCase() : undefined;
    const company = companyArgIndex !== -1 ? args[companyArgIndex + 1] : undefined;
    const exportFileName = exportArgIndex !== -1 ? args[exportArgIndex + 1] : undefined;

    return { filePath, segment, company, export: exportFileName };

  }

  static getDisplayPath(filePath: string): string {
    // Torna o caminho relativo ao diretório atual onde o script foi iniciado (geralmente o root do projeto)
    return path.relative(process.cwd(), filePath);
  }
}

