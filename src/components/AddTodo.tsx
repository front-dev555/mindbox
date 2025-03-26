import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

interface AddTodoProps {
  onAdd: (text: string) => void;
}

export const AddTodo: React.FC<AddTodoProps> = ({ onAdd }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text.trim());
      setText('');
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        gap: 2,
        mb: 2
      }}
    >
      <TextField
        fullWidth
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What needs to be done?"
        variant="outlined"
        size="small"
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={!text.trim()}
      >
        Add
      </Button>
    </Box>
  );
};
