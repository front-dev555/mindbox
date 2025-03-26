import React from 'react';
import { ToggleButton, ToggleButtonGroup, Box, Button, Typography } from '@mui/material';
import { TodoFilter as FilterType } from '../types/todo';

interface TodoFilterProps {
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  itemsLeft: number;
  onClearCompleted: () => void;
}

export const TodoFilter: React.FC<TodoFilterProps> = ({
  filter,
  onFilterChange,
  itemsLeft,
  onClearCompleted
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mt: 2,
        gap: 2
      }}
    >
      <Typography>{itemsLeft} items left</Typography>
      <ToggleButtonGroup
        value={filter}
        exclusive
        onChange={(_, value) => value && onFilterChange(value)}
        size="small"
      >
        <ToggleButton value="all">
          All
        </ToggleButton>
        <ToggleButton value="active">
          Active
        </ToggleButton>
        <ToggleButton value="completed">
          Completed
        </ToggleButton>
      </ToggleButtonGroup>
      <Button
        onClick={onClearCompleted}
        size="small"
      >
        Clear completed
      </Button>
    </Box>
  );
};
