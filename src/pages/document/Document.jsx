import { useRef, useState, useEffect } from "react";
import "./Document.scss";
import DocumentService from "../../services/documentService";

const { addDocument, getAllDocuments, deleteDocument, getDocumentById } =
    DocumentService;

function Document() {
    const [documents, setDocuments] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [customName, setCustomName] = useState("");
    const fileInputRef = useRef(null);

    useEffect(() => {
        fetchDocuments();
    }, []);

    const fetchDocuments = async () => {
        const docs = await getAllDocuments();
        if (docs && Array.isArray(docs.data)) {
            setDocuments(docs.data);
        } else if (Array.isArray(docs)) {
            setDocuments(docs);
        } else {
            setDocuments([]);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
        setCustomName(file ? file.name : "");
    };

    const handleUpload = async () => {
        if (selectedFile && customName) {
            await addDocument(customName, selectedFile);
            await fetchDocuments();
            setSelectedFile(null);
            setCustomName("");
            fileInputRef.current.value = "";
        }
    };

    const addDocumentClick = () => {
        fileInputRef.current.click();
    };

    const handleDeleteDocument = async (doc) => {
        let id = doc.id;
        if (!id && doc.name) {
            const found = await getDocumentById(doc.name);
            id = found?.id;
        }
        if (id) {
            await deleteDocument(id);
            await fetchDocuments();
        } else {
            alert(
                "Impossible de trouver l'identifiant du document à supprimer."
            );
        }
    };

    return (
        <div className="documentContainer">
            <button onClick={addDocumentClick}>Ajouter un document</button>
            <div className="documentList">
                <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                />
                {selectedFile && (
                    <div className="fileUploadForm">
                        <input
                            type="text"
                            value={customName}
                            onChange={(e) => setCustomName(e.target.value)}
                            placeholder="Nom du document"
                        />
                        <button onClick={handleUpload}>Envoyer</button>
                    </div>
                )}
                <ul>
                    {documents.map((doc, idx) => {
                        const mimeType = doc.mimeType || "application/pdf";
                        const fileName = doc.nom || doc.originalName || "document";
                        const extension = fileName.includes('.') ? '' : (
                            mimeType === "application/pdf" ? ".pdf" :
                            mimeType.startsWith("image/") ? `.${mimeType.split('/')[1]}` :
                            ""
                        );
                        const dataUrl = `data:${mimeType};base64,${doc.fichierPdf}`;
                        return (
                            <li key={doc.id || idx}>
                                <span className="documentName">
                                    {fileName}
                                </span>
                                <div className="documentActions">
                                    <a
                                        href={dataUrl}
                                        download={`${fileName}${extension}`}
                                    >
                                        Télécharger
                                    </a>
                                    <button
                                        onClick={() =>
                                            handleDeleteDocument(doc)
                                        }
                                    >
                                        Supprimer
                                    </button>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}

export default Document;
