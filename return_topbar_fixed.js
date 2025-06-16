import React, { useRef, useState } from "react";
import { Box, Button, TextField, Typography } from '@mui/material';
import MonthYearPicker from "./MonthYearPicker";
import { topBarSearchStyle, topBarStyle, animatedButtonStyle } from '../../../layouts/resuableComponents/styles';
import { SelectDropdown as CustomSelect } from "layouts/resuableComponents/selectDropdown";
import { Popper } from "@mui/material";
import { SearchableDropdown } from "layouts/resuableComponents/searchableDropdown";
import { departments } from "layouts/authentication/sign-up/metadata";

const ReturnTopbar = ({
    filters,
    setFilters,
    selectedMonth,
    setSelectedMonth,
    onMonthChange,
    selectedYear,
    setSelectedYear,
    onYearChange,
    onSearchChange,
    handleFilterApply,
    onClear,
    handleDownload,
    showFilters,
    setShowFilters,
}) => {
    console.log("Filters", filters);
    
    const frequencyOptions = [
        { id: 1, name: "Weekly", label: "Weekly", value: "weekly" },
        { id: 2, name: "Monthly", label: "Monthly", value: "monthly" },
        { id: 3, name: "Quarterly", label: "Quarterly", value: "quarterly" },
        { id: 4, name: "Yearly", label: "Yearly", value: "yearly" },
    ];
    
    const statusOptions = [
        { id: 5, name: "Pending", label: "Pending", value: "pending" },
        { id: 6, name: "Approved", label: "Approved", value: "approved" },
        { id: 7, name: "Rejected", label: "Rejected", value: "rejected" },
    ];

    // Convert departments to proper format
    const departmentOptions = departments.map(dept => ({
        ...dept,
        label: dept.name,
        value: dept.name.toLowerCase()
    }));

    const handleChange = (key, value) => {
        const updated = { ...filters, [key]: value };
        setFilters(updated);
        handleFilterApply(updated);
    };

    const generateYearList = () => {
        const currentYear = new Date().getFullYear();
        const years = [];
        for (let i = 0; i <= 15; i++) {
            const year = currentYear - i;
            years.push({
                value: year.toString(),
                label: year.toString()
            });
        }
        return years;
    };

    const [yearList] = useState(generateYearList());
    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);
    
    const handleToggleFilters = (event) => {
        setAnchorEl(event.currentTarget);
        setOpen((prev) => !prev);
    };

    const handleCloseFilters = () => {
        setOpen(false);
        setAnchorEl(null);
    };

    console.log("selectedYear", selectedYear);

    return (
        <Box sx={topBarStyle}>
            <TextField
                variant="outlined"
                placeholder="Search Returns.."
                value={filters.returnText || ""}
                onChange={onSearchChange}
                sx={topBarSearchStyle}
                size="small"
            />
            <Box display="flex" gap={1} alignItems="center" ml={2}>
                <Button sx={animatedButtonStyle} onClick={handleToggleFilters}>
                    Filter
                </Button>
                <Button sx={animatedButtonStyle} onClick={handleDownload}>
                    Download
                </Button>
                <Button sx={animatedButtonStyle}>
                    Edit
                </Button>
                <Button sx={animatedButtonStyle} onClick={onClear}>
                    Clear All
                </Button>
            </Box>

            <Popper 
                open={open} 
                anchorEl={anchorEl} 
                placement="bottom-start" 
                style={{ zIndex: 1300 }}
                onClickAway={handleCloseFilters}
            >
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                        gap: 2,
                        width: "100%",
                        backgroundColor: "#fff",
                        padding: "16px",
                        borderRadius: "8px",
                        marginTop: "8px",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                        minWidth: "800px",
                    }}
                >
                    <Box sx={{ width: "200px" }}>
                        <CustomSelect
                            label="Department"
                            placeholder="Select Department"
                            options={departmentOptions}
                            value={filters.departments || ""}
                            onChange={(e) => handleChange("departments", e.target.value)}
                        />
                    </Box>
                   
                    <Box sx={{ width: "200px" }}>
                        <CustomSelect
                            label="Frequency"
                            placeholder="Select Frequency"
                            options={frequencyOptions}
                            value={filters.frequency || ""}
                            onChange={(e) => handleChange("frequency", e.target.value)}
                        />
                    </Box>
                    
                    <Box sx={{ width: "200px" }}>
                        <CustomSelect
                            label="Status"
                            placeholder="Select Status"
                            options={statusOptions}
                            value={filters.status || ""}
                            onChange={(e) => handleChange("status", e.target.value)}
                        />
                    </Box>
                    
                    <Box sx={{ width: "200px" }}>
                        <MonthYearPicker
                            selectedMonth={selectedMonth}
                            selectedYear={selectedYear}
                            setSelectedMonth={setSelectedMonth}
                            setYear={setSelectedYear}
                            onMonthChange={onMonthChange}
                            onYearChange={onYearChange}
                        />
                    </Box>
                    
                    <Box sx={{ width: "200px" }}>
                        <CustomSelect
                            label="Year Filter"
                            placeholder="Select Year"
                            options={yearList}
                            value={filters.year || ""}
                            onChange={(e) => handleChange("year", e.target.value)}
                        />
                    </Box>
                </Box>
            </Popper>
        </Box>
    );
};

export default ReturnTopbar;