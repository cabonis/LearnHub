import { useState} from 'react';
import { Box, IconButton } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';

const ClearableTextBox = ({ label, onValueChange }) => {

  const [text, setText] = useState('');

  const handleInputChange = (value) => {
    setText(value);
    onValueChange && onValueChange(value);
  };

  return (
    <TextField
          label={label}
          id="filter-box"
          sx={{ m: 1, width: '27ch' }}
          color="secondary"
          value={text}
          onChange={(e) => handleInputChange(e.target.value)}
          slotProps={{
            input: {
              endAdornment: 
                <InputAdornment position="end">
                  <IconButton onClick={() => handleInputChange('')}>
                    <ClearOutlinedIcon />
                  </IconButton>
                </InputAdornment>,
            },
          }}
        />
  );
}

export default ClearableTextBox;