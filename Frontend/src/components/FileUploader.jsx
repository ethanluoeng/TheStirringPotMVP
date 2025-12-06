import { useState } from "react";

export default function FileUploader({ onFilesSelected }) {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    // Optional: filter out unsupported types
    const supportedTypes = ["application/pdf", "image/jpeg", "image/jpg", "image/png"];
    const invalidFiles = selectedFiles.filter(file => !supportedTypes.includes(file.type));

    if (invalidFiles.length > 0) {
      setError(`Unsupported file type: ${invalidFiles.map(f => f.name).join(", ")}`);
      return;
    }

    setError("");
    setFiles(selectedFiles);

    // Send selected files back to parent
    onFilesSelected(selectedFiles);
  };

  return (
    <div>
      <input
        type="file"
        multiple
        accept=".pdf, .jpg, .jpeg, .png"
        onChange={handleFileChange}
      />
      {files.length > 0 && (
        <div>
          <p>Selected files:</p>
          <ul>
            {files.map((file) => (
              <li key={file.name}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}