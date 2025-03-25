declare module 'pdf-parse/lib/pdf-parse.js' {
  interface PDFData {
    text: string;
    numpages: number;
    numrender: number;
    info: Record<string, any>;
    metadata: Record<string, any>;
    version: string;
  }

  interface PDFOptions {
    version?: string;
    max?: number;
    pagerender?: (pageData: any) => string;
  }

  function pdfParse(dataBuffer: Buffer, options?: PDFOptions): Promise<PDFData>;
  
  export = pdfParse;
} 