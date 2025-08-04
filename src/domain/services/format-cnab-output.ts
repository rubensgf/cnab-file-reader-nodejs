import { CNABLine } from '../entities/cnab-line';
import { CNABLineParser } from './cnab-line-parser';
import { exportToJson } from '../../utils/export-to-json';

export type FormattedCompanyData = {
  segment: string;
  company: string;
  address: string;
  city: string;
  zipCode: string;
  position: number;
};

export type FormattedSegmentData = {
  segment: string;
  company: string;
  position: number;
};

export async function formatCNABOutput(
  lines: CNABLine[],
  filterByCompany: boolean,
  filterBySegment: boolean,
  exportPath?: string
): Promise<(FormattedCompanyData | FormattedSegmentData)[]> {
  let formatted: (FormattedCompanyData | FormattedSegmentData)[];

  if (filterByCompany) {
    formatted = lines.map(line => CNABLineParser.extractCompanyData(line));

  } else if (filterBySegment) {
    formatted = lines.map(line => CNABLineParser.extractSegmentData(line));

  } else {
    
    formatted = lines.map(line => ({
      segment: line.line.charAt(13),
      company: line.line.substring(33, 73).trim(),
      position: line.position,
    }));
  }

  if (exportPath) {
    await exportToJson(formatted, exportPath);
    console.log(`✅ Arquivo exportado para: ${exportPath}`);
  }

  return formatted;
}
