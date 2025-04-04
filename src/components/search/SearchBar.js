import React, { useState } from 'react';
import { 
  Paper, 
  InputBase, 
  IconButton, 
  Box, 
  Chip,
  useMediaQuery,
  useTheme,
  Popper,
  List,
  ListItem,
  ListItemText,
  ClickAwayListener
} from '@mui/material';
import { 
  Search as SearchIcon, 
  Close as ClearIcon, 
  TuneRounded as FilterIcon 
} from '@mui/icons-material';

const popularSearches = [
  'Basmati Rice', 'Sugar', 'Tur Dal', 'Wheat', 'Peanuts', 'Milk', 'Bread', 'Eggs'
];

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    if (event.target.value.length > 0) {
      setSuggestionsOpen(true);
    } else {
      setSuggestionsOpen(false);
    }
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchTerm.trim()) {
      onSearch && onSearch(searchTerm);
      setSuggestionsOpen(false);
    }
  };

  const handleChipClick = (term) => {
    setSearchTerm(term);
    onSearch && onSearch(term);
  };

  const handleClear = () => {
    setSearchTerm('');
    setSuggestionsOpen(false);
  };

  // Filter suggestions based on input
  const filteredSuggestions = popularSearches.filter(item => 
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputClick = (event) => {
    setAnchorEl(event.currentTarget);
    if (searchTerm.length > 0) {
      setSuggestionsOpen(true);
    }
  };

  const handleItemClick = (term) => {
    setSearchTerm(term);
    onSearch && onSearch(term);
    setSuggestionsOpen(false);
  };

  const handleClickAway = () => {
    setSuggestionsOpen(false);
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 900, mx: 'auto', mb: 4 }}>
      <ClickAwayListener onClickAway={handleClickAway}>
        <Box>
          <Paper
            component="form"
            elevation={3}
            sx={{
              p: '2px 4px',
              display: 'flex',
              alignItems: 'center',
              borderRadius: 4,
              mb: 2
            }}
            onSubmit={handleSearchSubmit}
          >
            <IconButton sx={{ p: '10px' }} aria-label="search">
              <SearchIcon />
            </IconButton>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search for groceries (e.g., milk, bread, eggs)"
              value={searchTerm}
              onChange={handleSearchChange}
              onClick={handleInputClick}
              inputProps={{ 'aria-label': 'search groceries' }}
            />
            {searchTerm && (
              <IconButton sx={{ p: '10px' }} aria-label="clear" onClick={handleClear}>
                <ClearIcon />
              </IconButton>
            )}
            <IconButton 
              sx={{ p: '10px' }} 
              aria-label="filter"
              color="primary"
            >
              <FilterIcon />
            </IconButton>
          </Paper>

          <Popper 
            open={suggestionsOpen && filteredSuggestions.length > 0} 
            anchorEl={anchorEl}
            placement="bottom-start"
            style={{ width: anchorEl ? anchorEl.clientWidth : undefined, zIndex: 1300 }}
          >
            <Paper elevation={3}>
              <List>
                {filteredSuggestions.map((suggestion, index) => (
                  <ListItem 
                    button 
                    key={index} 
                    onClick={() => handleItemClick(suggestion)}
                    dense
                  >
                    <ListItemText primary={suggestion} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Popper>
        </Box>
      </ClickAwayListener>

      {!isMobile && (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          <Box sx={{ mr: 1 }}>
            <strong>Popular:</strong>
          </Box>
          {popularSearches.slice(0, 6).map((term, index) => (
            <Chip 
              key={index}
              label={term}
              size="small"
              onClick={() => handleChipClick(term)}
              variant="outlined"
              sx={{ 
                cursor: 'pointer',
                '&:hover': {
                  bgcolor: 'rgba(46, 125, 50, 0.1)',
                }
              }}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default SearchBar; 