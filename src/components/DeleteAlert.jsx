import { LoaderCircle } from "lucide-react";
import React, { useState } from "react"; // Added useState import

const DeleteAlert = ({ content, onDelete }) => {
    const [loading, setLoading] = useState(false); // Fixed useState usage
    const handleDelete = async () => {
        setLoading(true);
        try {
            await onDelete();
        } finally {
            setLoading(false);
        }
    }
    return (
        <div>
            <p className="text-sm">{content}</p>
            <div className="flex justify-end mt-6">
                <button 
                    onClick={handleDelete}
                    disabled={loading}
                    type="button"
                    className="add-btn add-btn-fill">
                    {loading ? (
                        <>
                            <LoaderCircle className="h-4 w-4 animate-spin"/> {/* Fixed: animated-spin -> animate-spin */}
                            Deleting...
                        </>
                    ) : (
                        <>
                            Delete
                        </>
                    )}
                </button>
            </div>
        </div>
    )
}

export default DeleteAlert;