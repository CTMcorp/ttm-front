import { _post, _get, _delete } from "../config/axiosConfig.js";

const DocumentService = () => {
    const addDocument = (nom, file) => {
        const formData = new FormData();
        formData.append("nom", nom);
        formData.append("fichier", file);
        return _post("/ttm/me/documents/add", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    };

    const getAllDocuments = () => {
        return _get("/ttm/me/documents/all");
    };

    const deleteDocument = (id) => {
        return _delete(`/ttm/me/documents/${id}`);
    };

    const getDocumentById = (id) => {
        return _get(`/ttm/me/documents/${id}`);
    };

    return { addDocument, getAllDocuments, deleteDocument, getDocumentById };
};

export default DocumentService();
