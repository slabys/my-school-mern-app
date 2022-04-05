import React  from 'react';
import { Box, Button } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';

export const SideMenuItem: React.FunctionComponent<{
  text: string,
  onContentChange: (value: string) => void;
}> = ({ text, onContentChange }) => {
  return (
    <Box display='flex' justifyContent='flex-start' alignItems='center' flexGrow={2} my={1}>
      <Button onClick={() => {
        onContentChange(text)
      }}>
        <MenuIcon sx={{ marginRight: 1 }} />
        {text}
      </Button>
    </Box>
  );
};
