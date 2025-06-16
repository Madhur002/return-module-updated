// ReturnRepository.js
import React, { useState } from "react";
import ReturnTopbar from './components/ReturnTopbar';
import { departments } from "layouts/authentication/sign-up/metadata";

const ReturnRepository = () => {
    const [filters, setFilters] = useState({
        departments: "",
        frequency: "",
        status: "",
        month: "",
        year: "",
        returnText: "",
    });

    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [showFilters, setShowFilters] = useState(false);

    const handleMonthChange = (year, monthIndex) => {
        // Ensure monthIndex is valid
        if (monthIndex < 0 || monthIndex > 11) {
            console.warn("Invalid month index:", monthIndex);
            return;
        }

        const formattedMonth = `${year}-${String(monthIndex + 1).padStart(2, "0")}`;
        console.log("Month clicked:", formattedMonth);
        
        const updated = { ...filters, month: formattedMonth };
        setFilters(updated);
        handleFilterApply(updated);
    };

    const handleYearChange = (year) => {
        if (!year || isNaN(year)) {
            console.warn("Invalid year:", year);
            return;
        }

        console.log("Year changed:", year);
        const updated = { ...filters, year: year.toString() };
        setFilters(updated);
        handleFilterApply(updated);
    };

    const handleSearchChange = (e) => {
        const value = e.target.value || "";
        console.log("Search changed:", value);
        
        const updated = { ...filters, returnText: value };
        setFilters(updated);
        
        // Debounce search if needed
        clearTimeout(window.searchTimeout);
        window.searchTimeout = setTimeout(() => {
            handleFilterApply(updated);
        }, 300);
    };

    const handleFilterApply = async (updatedFilters) => {
        try {
            console.log("Filters being applied:", updatedFilters);
            
            // Validate filters before applying
            const validatedFilters = {
                departments: updatedFilters.departments || "",
                frequency: updatedFilters.frequency || "",
                status: updatedFilters.status || "",
                month: updatedFilters.month || "",
                year: updatedFilters.year || "",
                returnText: updatedFilters.returnText || "",
            };
            
            setFilters(validatedFilters);
            
            // Here you would typically make an API call
            // await fetchReturnData(validatedFilters);
            
        } catch (error) {
            console.error("Error applying filters:", error);
        }
    };

    const handleClear = () => {
        console.log("Clearing all filters");
        
        const clearedFilters = {
            departments: "",
            frequency: "",
            status: "",
            month: "",
            year: "",
            returnText: "",
        };
        
        setFilters(clearedFilters);
        
        // Reset month/year pickers to current date
        const currentDate = new Date();
        setSelectedMonth(currentDate.getMonth());
        setSelectedYear(currentDate.getFullYear());
        
        handleFilterApply(clearedFilters);
    };

    const handleDownload = () => {
        try {
            const currentYear = selectedYear || new Date().getFullYear();
            const formattedRange = `${currentYear}-${currentYear}`;
            
            console.log("Downloading for:", formattedRange);
            console.log("Current filters:", filters);
            
            // Here you would implement the actual download logic
            // For example: generateReport(filters, formattedRange);
            
        } catch (error) {
            console.error("Error downloading:", error);
        }
    };

    // Debug logging
    console.log("Current state:", {
        filters,
        selectedMonth,
        selectedYear,
        showFilters
    });

    return (
        <div style={{ padding: "20px" }}>
            <ReturnTopbar
                filters={filters}
                setFilters={setFilters}
                selectedMonth={selectedMonth}
                setSelectedMonth={setSelectedMonth}
                onMonthChange={handleMonthChange}
                selectedYear={selectedYear}
                setSelectedYear={setSelectedYear}
                onYearChange={handleYearChange}
                onSearchChange={handleSearchChange}
                handleFilterApply={handleFilterApply}
                onClear={handleClear}
                handleDownload={handleDownload}
                showFilters={showFilters}
                setShowFilters={setShowFilters}
            />
            
            {/* Debug Panel - Remove in production */}
            {process.env.NODE_ENV === 'development' && (
                <div style={{ 
                    marginTop: "20px", 
                    padding: "10px", 
                    backgroundColor: "#f5f5f5", 
                    borderRadius: "4px",
                    fontSize: "12px"
                }}>
                    <strong>Debug Info:</strong>
                    <pre>{JSON.stringify({ filters, selectedMonth, selectedYear }, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default ReturnRepository;