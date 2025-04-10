import React, { ChangeEvent } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { COLORS } from 'constant';

type Props = {
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const SearchBar: React.FC<Props> = ({ placeholder, onChange }) => {
    return (
        <TextField
            variant='outlined'
            fullWidth
            placeholder={placeholder}
            sx={{ maxWidth: '460px' }}
            InputProps={{
                startAdornment: (
                    <InputAdornment position='start'>
                        <SearchIcon color='primary' />
                    </InputAdornment>
                ),
                style: { backgroundColor: COLORS.gray.thinner, borderRadius: 4 },
            }}
            onChange={onChange}
        />
    );
};

export default SearchBar;
