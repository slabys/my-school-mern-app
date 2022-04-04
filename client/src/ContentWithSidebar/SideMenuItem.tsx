import React  from 'react';
import { Box, Button } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';

export const SideMenuItem: React.FunctionComponent<{
  text: string,
  onContextChange: (value: string) => void;
}> = ({ text, onContextChange }) => {
  const handleChange = React.useCallback(() => {
    onContextChange(text)
  }, [text])
  return (
    <Box display='flex' justifyContent='flex-start' alignItems='center' flexGrow={2} my={1}>
      <Button onClick={handleChange}>
        <MenuIcon sx={{ marginRight: 1 }} />
        {text}
      </Button>
    </Box>
  );
};
