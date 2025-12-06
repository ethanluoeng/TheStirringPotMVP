import { useState } from "react";
import PDFUploader from "../components/PDFUploader";

export default function UploadRecipe() {
  const [pdfText, setPdfText] = useState("");

  return (
    <div>
      <h1>Upload PDF Recipe</h1>
      <PDFUploader onTextExtracted={setPdfText} />

      <hr />

      <h3>Extracted Text:</h3>
      <pre>{pdfText}</pre>
    </div>
  );
}