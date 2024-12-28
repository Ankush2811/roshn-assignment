import React from "react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => (
    <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
        {Array.from({ length: totalPages }, (_, index) => (
            <button style={{ backgroundColor: "#ff8c42" }}
                key={index}
                disabled={currentPage === index + 1}
                onClick={() => onPageChange(index + 1)}
            >
                {index + 1}
            </button>
        ))}
    </div>
);

export default Pagination;
