import { useState } from "react";
import PDFToText from "../components/PDFToText";
import Slideshow from "../components/Slideshow";

export default function Testing() {
    const [pdfText, setPdfText] = useState("");
    const [instructions, setInstructions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleTextExtracted = async (textExtracted) => {
        setPdfText(textExtracted);
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/generate_recipe", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ text: textExtracted }),
            });

            if (!res.ok) {
                throw new Error("Failed to send text to server");
            }

            const data = await res.json();
            setInstructions(data.instructions);
        } catch (err) {
            setError(err.message);
        }

        setLoading(false);
    };

    return (
        <div>
            <h1>Upload PDF Recipe</h1>
            <PDFToText onTextExtracted={handleTextExtracted}/>
            <h3>Extracted Text:</h3>
            <pre>{pdfText}</pre>

            {loading && <p>Processing recipe...</p>}

            {error && <p style={{ color: "red" }}>{error}</p>}

            {instructions.length > 0 && <Slideshow steps={instructions} />}

            <hr />        
        </div>
    );
} 