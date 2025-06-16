import React from 'react';
import { Box, Typography, IconButton, Grid } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const MonthYearPicker = ({
    selectedMonth,
    selectedYear,
    setSelectedMonth,
    setYear,
    onMonthChange,
    onYearChange
}) => {
    const year = selectedYear || new Date().getFullYear();
    const month = selectedMonth !== undefined ? selectedMonth : new Date().getMonth();

    const handlePrevYear = () => {
        const newYear = year - 1;
        setYear(newYear);
        if (onYearChange) {
            onYearChange(newYear);
        }
    };

    const handleNextYear = () => {
        const newYear = year + 1;
        setYear(newYear);
        if (onYearChange) {
            onYearChange(newYear);
        }
    };

    const handleMonthClick = (index) => {
        setSelectedMonth(index);
        if (onMonthChange) {
            onMonthChange(year, index);
        }
    };

    return (
        <Box
            sx={{
                backgroundColor: "#f8f9fa",
                p: 2,
                borderRadius: 2,
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                width: "100%",
                border: "1px solid #e0e0e0",
            }}
        >
            {/* Year Navigation Header */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                    backgroundColor: "white",
                    p: 1,
                    borderRadius: 1,
                    boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                }}
            >
                <IconButton 
                    onClick={handlePrevYear}
                    size="small"
                    sx={{
                        "&:hover": {
                            backgroundColor: (theme) => theme.palette.primary.light,
                            color: "white",
                        }
                    }}
                >
                    <ChevronLeft />
                </IconButton>
                
                <Typography 
                    variant="h6" 
                    sx={{ 
                        fontWeight: 600,
                        color: (theme) => theme.palette.primary.main
                    }}
                >
                    {year}
                </Typography>
                
                <IconButton 
                    onClick={handleNextYear}
                    size="small"
                    sx={{
                        "&:hover": {
                            backgroundColor: (theme) => theme.palette.primary.light,
                            color: "white",
                        }
                    }}
                >
                    <ChevronRight />
                </IconButton>
            </Box>

            {/* Month Grid */}
            <Grid container spacing={1}>
                {months.map((monthName, index) => (
                    <Grid item xs={3} key={monthName}>
                        <Box
                            onClick={() => handleMonthClick(index)}
                            sx={{
                                cursor: "pointer",
                                textAlign: "center",
                                p: 1,
                                borderRadius: 1,
                                backgroundColor: month === index ? "#1976d2" : "#ffffff",
                                color: month === index ? "#ffffff" : "#333333",
                                border: month === index ? "2px solid #1976d2" : "1px solid #e0e0e0",
                                fontSize: "0.85rem",
                                fontWeight: month === index ? 600 : 500,
                                transition: "all 0.2s ease-in-out",
                                "&:hover": {
                                    backgroundColor: month === index ? "#1565c0" : "#f0f0f0",
                                    transform: "translateY(-1px)",
                                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                                },
                                "&:active": {
                                    transform: "translateY(0)",
                                }
                            }}
                        >
                            {monthName}
                        </Box>
                    </Grid>
                ))}
            </Grid>
            
            {/* Selected Date Display */}
            {month !== undefined && (
                <Box
                    sx={{
                        mt: 2,
                        p: 1,
                        backgroundColor: (theme) => theme.palette.primary.light,
                        borderRadius: 1,
                        textAlign: "center",
                    }}
                >
                    <Typography
                        variant="body2"
                        sx={{
                            color: "white",
                            fontWeight: 500,
                        }}
                    >
                        Selected: {months[month]} {year}
                    </Typography>
                </Box>
            )}
        </Box>
    );
};

export default MonthYearPicker;