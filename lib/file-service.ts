import { Document, Packer, Paragraph, TextRun } from 'docx';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { ResumeData } from './ai-service';

// Function to extract text from a PDF file
export async function extractTextFromPDF(file: File): Promise<string> {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/parse/pdf', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to extract text from PDF');
    }

    const data = await response.json();
    return data.text;
  } catch (error) {
    console.error('Error extracting text from PDF:', error);
    throw new Error('Failed to extract text from PDF');
  }
}

// Function to extract text from a DOCX file
export async function extractTextFromDOCX(file: File): Promise<string> {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/parse/docx', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to extract text from DOCX');
    }

    const data = await response.json();
    return data.text;
  } catch (error) {
    console.error('Error extracting text from DOCX:', error);
    throw new Error('Failed to extract text from DOCX');
  }
}

// Function to extract text from a markdown file
export async function extractTextFromMarkdown(file: File): Promise<string> {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/parse/text', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to extract text from Markdown');
    }

    const data = await response.json();
    return data.text;
  } catch (error) {
    console.error('Error extracting text from Markdown:', error);
    throw new Error('Failed to extract text from Markdown');
  }
}

// Main function to parse resume from uploaded file
export async function parseResumeFromFile(file: File): Promise<string> {
  const fileName = file.name.toLowerCase();
  
  if (fileName.endsWith('.pdf')) {
    return extractTextFromPDF(file);
  } else if (fileName.endsWith('.docx') || fileName.endsWith('.doc')) {
    return extractTextFromDOCX(file);
  } else if (fileName.endsWith('.md') || fileName.endsWith('.mdx') || fileName.endsWith('.txt')) {
    return extractTextFromMarkdown(file);
  } else {
    throw new Error('Unsupported file format. Please upload a PDF, DOCX, or Markdown file.');
  }
}

// Function to convert extracted text to ResumeData structure
export function convertTextToResumeData(text: string): Partial<ResumeData> {
  // This is a simplified implementation
  // In a real implementation, you'd use NLP or more sophisticated parsing
  // to identify sections and structure the data correctly
  
  // For now, we'll create a basic structure with the text in the summary
  const resumeData: Partial<ResumeData> = {
    personal: {
      name: 'Extracted Name',
      email: 'example@example.com',
      phone: '123-456-7890',
      location: 'City, Country',
      title: 'Professional Title',
      summary: text.slice(0, 500), // Use the first 500 characters for the summary
    },
    experience: [],
    education: [],
    skills: [],
    projects: []
  };
  
  return resumeData;
}

// Function to generate a PDF from resume data
export function exportResumeToPDF(resumeData: ResumeData): void {
  const doc = new jsPDF();
  
  // Add title
  doc.setFontSize(24);
  doc.text(resumeData.personal.name, 20, 20);
  
  // Add personal info
  doc.setFontSize(12);
  doc.text(`${resumeData.personal.title}`, 20, 30);
  doc.text(`Email: ${resumeData.personal.email}`, 20, 38);
  doc.text(`Phone: ${resumeData.personal.phone}`, 20, 46);
  doc.text(`Location: ${resumeData.personal.location}`, 20, 54);
  
  // Add summary
  doc.setFontSize(16);
  doc.text('Summary', 20, 70);
  doc.setFontSize(12);
  const summaryLines = doc.splitTextToSize(resumeData.personal.summary, 170);
  doc.text(summaryLines, 20, 78);
  
  // Add experience
  let yPosition = 78 + (summaryLines.length * 7);
  doc.setFontSize(16);
  doc.text('Experience', 20, yPosition);
  doc.setFontSize(12);
  
  resumeData.experience.forEach((exp) => {
    yPosition += 10;
    doc.text(`${exp.position} at ${exp.company}`, 20, yPosition);
    yPosition += 7;
    doc.text(`${exp.startDate} - ${exp.endDate} | ${exp.location}`, 20, yPosition);
    yPosition += 7;
    const descLines = doc.splitTextToSize(exp.description, 170);
    doc.text(descLines, 20, yPosition);
    yPosition += (descLines.length * 7) + 5;
  });
  
  // Add education
  doc.setFontSize(16);
  doc.text('Education', 20, yPosition);
  doc.setFontSize(12);
  
  resumeData.education.forEach((edu) => {
    yPosition += 10;
    doc.text(`${edu.degree} in ${edu.field}`, 20, yPosition);
    yPosition += 7;
    doc.text(`${edu.institution} | ${edu.startDate} - ${edu.endDate}`, 20, yPosition);
    yPosition += 7;
    if (edu.description) {
      const descLines = doc.splitTextToSize(edu.description, 170);
      doc.text(descLines, 20, yPosition);
      yPosition += (descLines.length * 7) + 5;
    }
  });
  
  // Add skills
  doc.setFontSize(16);
  doc.text('Skills', 20, yPosition);
  doc.setFontSize(12);
  yPosition += 10;
  
  if (Array.isArray(resumeData.skills)) {
    if (typeof resumeData.skills[0] === 'string') {
      const skills = resumeData.skills as string[];
      const skillsText = skills.join(', ');
      const skillsLines = doc.splitTextToSize(skillsText, 170);
      doc.text(skillsLines, 20, yPosition);
    } else {
      const skills = resumeData.skills as Array<{name: string; level: string}>;
      const skillsText = skills.map(skill => `${skill.name} (${skill.level})`).join(', ');
      const skillsLines = doc.splitTextToSize(skillsText, 170);
      doc.text(skillsLines, 20, yPosition);
    }
  }
  
  // Save the PDF
  doc.save('resume.pdf');
}

// Function to generate a DOCX document from resume data
export async function exportResumeToDocx(resumeData: ResumeData): Promise<void> {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: resumeData.personal.name,
                bold: true,
                size: 28,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: resumeData.personal.title,
                size: 24,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `Email: ${resumeData.personal.email} | Phone: ${resumeData.personal.phone} | Location: ${resumeData.personal.location}`,
                size: 20,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: 'Summary',
                bold: true,
                size: 24,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: resumeData.personal.summary,
                size: 20,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: 'Experience',
                bold: true,
                size: 24,
              }),
            ],
          }),
          ...resumeData.experience.flatMap((exp) => [
            new Paragraph({
              children: [
                new TextRun({
                  text: `${exp.position} at ${exp.company}`,
                  bold: true,
                  size: 20,
                }),
              ],
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `${exp.startDate} - ${exp.endDate} | ${exp.location}`,
                  size: 20,
                }),
              ],
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: exp.description,
                  size: 20,
                }),
              ],
            }),
          ]),
          new Paragraph({
            children: [
              new TextRun({
                text: 'Education',
                bold: true,
                size: 24,
              }),
            ],
          }),
          ...resumeData.education.flatMap((edu) => [
            new Paragraph({
              children: [
                new TextRun({
                  text: `${edu.degree} in ${edu.field}`,
                  bold: true,
                  size: 20,
                }),
              ],
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `${edu.institution} | ${edu.startDate} - ${edu.endDate}`,
                  size: 20,
                }),
              ],
            }),
            ...(edu.description
              ? [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: edu.description,
                        size: 20,
                      }),
                    ],
                  }),
                ]
              : []),
          ]),
          new Paragraph({
            children: [
              new TextRun({
                text: 'Skills',
                bold: true,
                size: 24,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: Array.isArray(resumeData.skills)
                  ? typeof resumeData.skills[0] === 'string'
                    ? (resumeData.skills as string[]).join(', ')
                    : (resumeData.skills as Array<{ name: string; level: string }>)
                        .map((skill) => `${skill.name} (${skill.level})`)
                        .join(', ')
                  : '',
                size: 20,
              }),
            ],
          }),
        ],
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  });
  saveAs(blob, 'resume.docx');
}

// Function to generate markdown from resume data
export function exportResumeToMarkdown(resumeData: ResumeData): void {
  let markdown = `# ${resumeData.personal.name}\n\n`;
  markdown += `## ${resumeData.personal.title}\n\n`;
  markdown += `Email: ${resumeData.personal.email} | Phone: ${resumeData.personal.phone} | Location: ${resumeData.personal.location}\n\n`;
  
  markdown += `## Summary\n\n${resumeData.personal.summary}\n\n`;
  
  markdown += `## Experience\n\n`;
  resumeData.experience.forEach((exp) => {
    markdown += `### ${exp.position} at ${exp.company}\n\n`;
    markdown += `${exp.startDate} - ${exp.endDate} | ${exp.location}\n\n`;
    markdown += `${exp.description}\n\n`;
  });
  
  markdown += `## Education\n\n`;
  resumeData.education.forEach((edu) => {
    markdown += `### ${edu.degree} in ${edu.field}\n\n`;
    markdown += `${edu.institution} | ${edu.startDate} - ${edu.endDate}\n\n`;
    if (edu.description) {
      markdown += `${edu.description}\n\n`;
    }
  });
  
  markdown += `## Skills\n\n`;
  if (Array.isArray(resumeData.skills)) {
    if (typeof resumeData.skills[0] === 'string') {
      const skills = resumeData.skills as string[];
      markdown += skills.join(', ');
    } else {
      const skills = resumeData.skills as Array<{name: string; level: string}>;
      markdown += skills.map(skill => `${skill.name} (${skill.level})`).join(', ');
    }
  }
  
  const blob = new Blob([markdown], { type: 'text/markdown' });
  saveAs(blob, 'resume.md');
} 