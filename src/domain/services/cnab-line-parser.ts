import { CNABLine } from '../entities/cnab-line';

export class CNABLineParser {
  static extractCompanyData(cnab: CNABLine) {
    return {
      segment: cnab.line.charAt(13),
      company: cnab.line.substring(33, 73).trim(),
      address: cnab.line.substring(74, 108).trim(),
      city: cnab.line.substring(108, 128).trim(),
      zipCode: cnab.line.substring(130, 136).trim(),
      position: cnab.position,
    };
  }

  static extractSegmentData(cnab: CNABLine) {
    return {
      segment: cnab.line.charAt(13),
      company: cnab.line.substring(33, 73).trim(),
      position: cnab.position,
    };
  }
}
