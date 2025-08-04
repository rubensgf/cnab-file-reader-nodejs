import fs from 'fs';
import readline from 'readline';

export type CNABLine = {
  line: string;
  position: number;
  
};

export async function readCNABFileFiltered(
  filePathArgs: string,
  segmentArgs?: string,
  companyArgs?: string
): Promise<CNABLine[]> {
  const result: CNABLine[] = [];

  const fileStream = fs.createReadStream(filePathArgs);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let lineNumber = 0;

  for await (const line of rl) {
    lineNumber++;

    if (line.trim().length === 0) continue;

    const segment = line.charAt(13);
    const company = line.substring(33, 73).trim();
   
    const segmentMatches = segmentArgs
      ? segment.toUpperCase() === segmentArgs.toUpperCase()
      : true;

    const companyMatches = companyArgs
      ? company.toLowerCase().includes(companyArgs.toLowerCase())
      : true;

    if (segmentMatches && companyMatches) {
      result.push({
        line,
        position: lineNumber,
      });
    }
  }

  return result;
}
