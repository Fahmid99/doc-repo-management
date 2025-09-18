// inbox/components/InboxPane/ModernFilters.tsx
"use client";
import React from 'react';
import {
  Box,
  Chip,
  Typography,
  Button,
  Menu,
  MenuItem,
  Badge,
  Divider,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import { 
  FilterList, 
  KeyboardArrowDown, 
  Check, 
  Close,
  Person,
  Flag,
  Assignment
} from '@mui/icons-material';

interface FilterOption {
  value: string;
  label: string;
  count?: number;
  icon?: React.ReactNode;
}

interface FilterConfig {
  key: string;
  label: string;
  icon?: React.ReactNode;
  options: FilterOption[];
  type?: 'single' | 'multi'; // single select or multi-select
}

interface FilterState {
  [key: string]: string | string[];
}

interface ModernFiltersProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  filterConfigs: FilterConfig[];
  totalCount?: number;
  filteredCount?: number;
}

const InboxFilters = ({ 
  filters, 
  onFilterChange, 
  filterConfigs, 
  totalCount = 0, 
  filteredCount = 0 
}: ModernFiltersProps) => {
  const [anchorEl, setAnchorEl] = React.useState<{ [key: string]: HTMLElement | null }>({});

  const handleMenuOpen = (filterKey: string, event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl({ ...anchorEl, [filterKey]: event.currentTarget });
  };

  const handleMenuClose = (filterKey: string) => {
    setAnchorEl({ ...anchorEl, [filterKey]: null });
  };

  const handleFilterSelect = (filterKey: string, value: string, isMulti: boolean = false) => {
    if (isMulti) {
      const currentValues = (filters[filterKey] as string[]) || [];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
      
      onFilterChange({
        ...filters,
        [filterKey]: newValues
      });
    } else {
      onFilterChange({
        ...filters,
        [filterKey]: value
      });
      handleMenuClose(filterKey);
    }
  };

  const clearFilter = (filterKey: string) => {
    const config = filterConfigs.find(c => c.key === filterKey);
    onFilterChange({
      ...filters,
      [filterKey]: config?.type === 'multi' ? [] : 'all'
    });
  };

  const clearAllFilters = () => {
    const clearedFilters = filterConfigs.reduce((acc, config) => {
      acc[config.key] = config.type === 'multi' ? [] : 'all';
      return acc;
    }, {} as FilterState);
    onFilterChange(clearedFilters);
  };

  const getFilterDisplayText = (config: FilterConfig) => {
    const value = filters[config.key];
    
    if (config.type === 'multi') {
      const selectedValues = value as string[] || [];
      if (selectedValues.length === 0) return config.label;
      if (selectedValues.length === 1) {
        const option = config.options.find(o => o.value === selectedValues[0]);
        return option?.label || selectedValues[0];
      }
      return `${selectedValues.length} selected`;
    } else {
      if (!value || value === 'all') return config.label;
      const option = config.options.find(o => o.value === value);
      return option?.label || value;
    }
  };

  const isFilterActive = (config: FilterConfig) => {
    const value = filters[config.key];
    if (config.type === 'multi') {
      return (value as string[] || []).length > 0;
    }
    return value && value !== 'all';
  };

  const getActiveFilterCount = () => {
    return filterConfigs.filter(config => isFilterActive(config)).length;
  };

  return (
    <Box sx={{ 
      p: 2, 
      borderBottom: '1px solid #e0e0e0', 
      backgroundColor: 'white',
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }}>
      {/* Filter Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <FilterList sx={{ fontSize: '1.1rem', color: 'text.secondary' }} />
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            Filters
          </Typography>
          {filteredCount !== totalCount && (
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              {filteredCount} of {totalCount} items
            </Typography>
          )}
        </Box>
        
        {getActiveFilterCount() > 0 && (
          <Button 
            size="small" 
            onClick={clearAllFilters}
            startIcon={<Close sx={{ fontSize: '1rem' }} />}
            sx={{ 
              minWidth: 'auto',
              color: 'text.secondary',
              '&:hover': { backgroundColor: 'grey.100' }
            }}
          >
            Clear all
          </Button>
        )}
      </Box>

      {/* Filter Buttons */}
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        {filterConfigs.map((config) => (
          <React.Fragment key={config.key}>
            <Badge
              badgeContent={
                config.type === 'multi' 
                  ? (filters[config.key] as string[] || []).length || undefined
                  : undefined
              }
              color="primary"
              sx={{
                '& .MuiBadge-badge': {
                  fontSize: '0.65rem',
                  height: '16px',
                  minWidth: '16px'
                }
              }}
            >
              <Button
                variant={isFilterActive(config) ? "contained" : "outlined"}
                size="small"
                onClick={(e) => handleMenuOpen(config.key, e)}
                endIcon={<KeyboardArrowDown sx={{ fontSize: '1rem' }} />}
                startIcon={config.icon}
                sx={{
                  textTransform: 'none',
                  fontWeight: 500,
                  borderRadius: '20px',
                  px: 2,
                  '&.MuiButton-contained': {
                    backgroundColor: 'primary.main',
                    '&:hover': { backgroundColor: 'primary.dark' }
                  },
                  '&.MuiButton-outlined': {
                    borderColor: 'grey.300',
                    color: 'text.primary',
                    '&:hover': { 
                      borderColor: 'primary.main',
                      backgroundColor: 'primary.50'
                    }
                  }
                }}
              >
                {getFilterDisplayText(config)}
              </Button>
            </Badge>

            <Menu
              anchorEl={anchorEl[config.key]}
              open={Boolean(anchorEl[config.key])}
              onClose={() => handleMenuClose(config.key)}
              PaperProps={{
                sx: { 
                  minWidth: 200,
                  maxHeight: 300,
                  mt: 1,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  border: '1px solid #e0e0e0'
                }
              }}
            >
              {config.type !== 'multi' && (
                <MenuItem
                  onClick={() => handleFilterSelect(config.key, 'all')}
                  selected={!filters[config.key] || filters[config.key] === 'all'}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                    <Typography sx={{ flex: 1 }}>All {config.label}</Typography>
                    {(!filters[config.key] || filters[config.key] === 'all') && (
                      <Check sx={{ fontSize: '1rem', color: 'primary.main' }} />
                    )}
                  </Box>
                </MenuItem>
              )}
              
              {config.type !== 'multi' && <Divider />}
              
              {config.options.map((option) => {
                const isSelected = config.type === 'multi'
                  ? (filters[config.key] as string[] || []).includes(option.value)
                  : filters[config.key] === option.value;
                
                return (
                  <MenuItem
                    key={option.value}
                    onClick={() => handleFilterSelect(config.key, option.value, config.type === 'multi')}
                    selected={isSelected}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                      {option.icon && (
                        <Box sx={{ mr: 1, color: 'text.secondary' }}>
                          {option.icon}
                        </Box>
                      )}
                      <Typography sx={{ flex: 1 }}>
                        {option.label}
                      </Typography>
                      {option.count !== undefined && (
                        <Typography variant="caption" sx={{ color: 'text.secondary', mr: 1 }}>
                          {option.count}
                        </Typography>
                      )}
                      {isSelected && (
                        <Check sx={{ fontSize: '1rem', color: 'primary.main' }} />
                      )}
                    </Box>
                  </MenuItem>
                );
              })}
              
              {config.type === 'multi' && (filters[config.key] as string[] || []).length > 0 && (
                <>
                  <Divider />
                  <MenuItem onClick={() => clearFilter(config.key)}>
                    <Close sx={{ fontSize: '1rem', mr: 1, color: 'text.secondary' }} />
                    <Typography color="text.secondary">Clear selection</Typography>
                  </MenuItem>
                </>
              )}
            </Menu>
          </React.Fragment>
        ))}
      </Box>
    </Box>
  );
};

export default InboxFilters;