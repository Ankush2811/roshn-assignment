import { render, screen, fireEvent } from "@testing-library/react";
import Pagination from "../components/Pagination";

describe("Pagination component", () => {
    const mockOnPageChange = jest.fn();

    it("renders the correct number of page buttons", () => {
        render(<Pagination currentPage={1} totalPages={2} onPageChange={mockOnPageChange} />);

        const buttons = screen.getAllByRole("button");
        expect(buttons).toHaveLength(2);
    });

    it("calls onPageChange with the correct page number when a button is clicked", () => {
        render(<Pagination currentPage={1} totalPages={2} onPageChange={mockOnPageChange} />);

        // Click the second button
        const secondButton = screen.getByText("2");
        fireEvent.click(secondButton);

        // Check if the onPageChange function was called with the correct argument
        expect(mockOnPageChange).toHaveBeenCalledWith(2);
    });

    it("applies the correct styles to the buttons", () => {
        render(<Pagination currentPage={1} totalPages={3} onPageChange={mockOnPageChange} />);

        // Check if the buttons have the correct styles
        const buttons = screen.getAllByRole("button");
        buttons.forEach((button) => {
            expect(button).toHaveStyle({ backgroundColor: "#ff8c42" });
        });
    });
});
