// extractUtils.js
import * as pdfjsLib from 'pdfjs-dist';
import mammoth from 'mammoth';

export const extractTextFromPDF = async (file) => {
  const reader = new FileReader();
  return new Promise((resolve) => {
    reader.onload = async function () {
      const typedarray = new Uint8Array(this.result);
      const pdf = await pdfjsLib.getDocument(typedarray).promise;
      let text = '';
      for (let i = 0; i < pdf.numPages; i++) {
        const page = await pdf.getPage(i + 1);
        const content = await page.getTextContent();
        text += content.items.map(item => item.str).join(' ') + '\n\n';
      }
      resolve(text);
    };
    reader.readAsArrayBuffer(file);
  });
};

export const extractTextFromDocx = async (file) => {
  const reader = new FileReader();
  return new Promise((resolve) => {
    reader.onload = async function () {
      const result = await mammoth.extractRawText({ arrayBuffer: this.result });
      resolve(result.value);
    };
    reader.readAsArrayBuffer(file);
  });
};
