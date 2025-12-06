import { useState } from "react";
import * as pdfjsLib from "pdfjs-dist";

// Assuming you copied the worker file to your public folder
pdfjsLib.GlobalWorkerOptions.workerSrc = window.location.origin + "/pdf.worker.min.mjs";

export default function PDFUploader({ onTextExtracted }) {
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      setError("Please upload a PDF file.");
      return;
    }

    setError("");
    setFileName(file.name);
    setLoading(true);

    try {
      // Read PDF as ArrayBuffer
      const arrayBuffer = await file.arrayBuffer();

      // Load PDF
      const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;

      let fullText = "";

      // Loop through all pages
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map(item => item.str).join(" ");
        fullText += pageText + "\n";
      }

      // Send extracted text to parent
      onTextExtracted(fullText);
    } catch (err) {
      setError("Failed to read PDF: " + err.message);
    }

    setLoading(false);
  };

  return (
    <div>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      {fileName && <p>Selected file: {fileName}</p>}
      {loading && <p>Extracting text...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
