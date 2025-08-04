// src/utils/export-to-json.ts
import fs from 'fs/promises';

type ExportData = {
  position: number;
  segment?: string,
  company?: string;
  address?: string;
  city?:string;
  zipCode?: string
  
};

export async function exportToJson(data: ExportData[], filePath: string) {

  const json = JSON.stringify(data, null, 2);

  await fs.writeFile(filePath, json, 'utf-8');
}
