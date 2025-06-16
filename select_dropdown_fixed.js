// Custom dropdown component with search

import React, { useRef, useState } from "react";

// @mui material components
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Fade from "@mui/material/Fade";
import FormHelperText from "@mui/material/FormHelperText";
import InputAdornment from "@mui/material/InputAdornment";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import Typography from "@mui/material/Typography";

export const SelectDropdown = ({
  label,
  placeholder,
  options = [],
  value,
  onChange,
  error,
}) => {
  const [open, setOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const anchorRef = useRef(null);

  // Ensure value is always a string
  const safeValue = value || "";

  // Filter options based on search text
  const filteredOptions = options.filter((option) => {
    const optionLabel = option.label || option.name || "";
    return optionLabel.toLowerCase().includes(searchText.toLowerCase());
  });

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
    setSearchText("");
  };

  const handleOptionSelect = (option) => {
    const optionValue = option.value || option.name || option.label || "";
    onChange({ target: { name: label, value: optionValue } });
    setOpen(false);
    setSearchText("");
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  // Get display text for selected value
  const getDisplayText = () => {
    if (!safeValue) return "";
    
    const selectedOption = options.find(option => 
      (option.value || option.name || option.label) === safeValue
    );
    
    if (selectedOption) {
      return selectedOption.label || selectedOption.name || selectedOption.value || "";
    }
    
    return safeValue;
  };

  const displayText = getDisplayText();

  return (
    <Box sx={{ width: "100%" }}>
      {label && (
        <Typography 
          sx={{ 
            fontSize: "0.75rem", 
            fontWeight: 500, 
            mb: 0.5,
            color: (theme) => theme.palette.text.secondary
          }}
        >
          {label}
        </Typography>
      )}
      
      <Box
        ref={anchorRef}
        onClick={handleToggle}
        sx={{
          borderRadius: 2,
          border: "1px solid",
          borderColor: error ? "#ff0000" : (theme) => theme.palette.grey[300],
          fontSize: "0.875rem",
          minHeight: "40px",
          p: 1.5,
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "white",
          "&:hover": {
            borderColor: (theme) => theme.palette.primary.main,
          },
          "&:focus": {
            borderColor: (theme) => theme.palette.primary.main,
            outline: "none",
          }
        }}
      >
        <Typography
          sx={{
            color: displayText ? (theme) => theme.palette.text.primary : (theme) => theme.palette.text.secondary,
            fontSize: "0.875rem",
            opacity: displayText ? 1 : 0.6,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            maxWidth: "calc(100% - 20px)"
          }}
        >
          {displayText || placeholder || "Select option"}
        </Typography>
        <Box
          component="div"
          sx={{
            width: 0,
            height: 0,
            borderLeft: "5px solid transparent",
            borderRight: "5px solid transparent",
            borderTop: open ? "5px solid transparent" : "5px solid #757575",
            borderBottom: open ? "5px solid #757575" : "5px solid transparent",
            ml: 1,
            transition: "transform 0.2s ease",
          }}
        />
      </Box>
      
      {error && (
        <FormHelperText error sx={{ ml: 1.5, mt: 0.5, fontSize: "0.75rem" }}>
          {error}
        </FormHelperText>
      )}
      
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        placement="bottom-start"
        transition
        disablePortal
        style={{
          width: anchorRef.current ? anchorRef.current.clientWidth : undefined,
          zIndex: 1300,
        }}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={200}>
            <Paper
              elevation={3}
              sx={{
                bgcolor: "white",
                border: "1px solid",
                borderColor: (theme) => theme.palette.grey[300],
                mt: 0.5,
                maxHeight: 250,
                borderRadius: 2,
                minWidth: 300,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  p: 1,
                  borderBottom: "1px solid",
                  borderColor: (theme) => theme.palette.grey[200],
                }}
              >
                <InputBase
                  autoFocus
                  placeholder="Search options..."
                  value={searchText}
                  onChange={handleSearchChange}
                  startAdornment={
                    <InputAdornment position="start">
                      <SearchIcon
                        fontSize="small"
                        sx={{
                          color: (theme) => theme.palette.text.secondary,
                        }}
                      />
                    </InputAdornment>
                  }
                  fullWidth
                  sx={{ 
                    fontSize: "0.875rem",
                    "& .MuiInputBase-input": {
                      padding: "8px 0",
                    }
                  }}
                />
              </Box>
              
              <Box
                sx={{
                  overflow: "auto",
                  maxHeight: 200,
                  "&::-webkit-scrollbar": { 
                    width: "6px" 
                  },
                  "&::-webkit-scrollbar-track": {
                    background: "#f1f1f1",
                    borderRadius: "3px",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    background: "#c1c1c1",
                    borderRadius: "3px",
                  },
                  "&::-webkit-scrollbar-thumb:hover": {
                    background: "#8e8e8e",
                  },
                }}
              >
                <ClickAwayListener onClickAway={handleClose}>
                  <Box>
                    {filteredOptions.length > 0 ? (
                      filteredOptions.map((option, index) => {
                        const optionValue = option.value || option.name || option.label || "";
                        const optionLabel = option.label || option.name || "";
                        const isSelected = safeValue === optionValue;
                        
                        return (
                          <Box
                            key={option.id || index}
                            onClick={() => handleOptionSelect(option)}
                            sx={{
                              px: 2,
                              py: 1.5,
                              cursor: "pointer",
                              borderRadius: 0,
                              backgroundColor: isSelected ? (theme) => theme.palette.primary.light : "transparent",
                              color: isSelected ? (theme) => theme.palette.primary.contrastText : (theme) => theme.palette.text.primary,
                              "&:hover": {
                                backgroundColor: isSelected 
                                  ? (theme) => theme.palette.primary.main
                                  : (theme) => theme.palette.action.hover,
                              },
                            }}
                          >
                            <Typography
                              sx={{
                                fontSize: "0.875rem",
                                fontWeight: isSelected ? 500 : 400,
                              }}
                            >
                              {optionLabel}
                            </Typography>
                          </Box>
                        );
                      })
                    ) : (
                      <Box sx={{ p: 2, textAlign: "center" }}>
                        <Typography
                          sx={{ 
                            fontSize: "0.875rem", 
                            color: (theme) => theme.palette.text.secondary,
                            fontStyle: "italic"
                          }}
                        >
                          No results found
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </ClickAwayListener>
              </Box>
            </Paper>
          </Fade>
        )}
      </Popper>
    </Box>
  );
};