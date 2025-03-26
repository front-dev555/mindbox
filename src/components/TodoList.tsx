import React from 'react';
import { List, ListItem, ListItemText, Checkbox, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import { styled } from '@mui/material/styles';
import { Todo } from '../types/todo';

const CustomCheckbox = styled(Checkbox)({
  '&.MuiCheckbox-root': {
    padding: 12,
  },
  '& .MuiSvgIcon-root': {
    borderRadius: '50%',
    width: 24,
    height: 24,
  },
  '&:not(.Mui-checked)': {
    '& .MuiSvgIcon-root': {
      border: '2px solid #e6e6e6',
      backgroundColor: 'transparent',
      color: 'transparent'
    }
  },
  '&.Mui-checked': {
    '& .MuiSvgIcon-root': {
      border: '2px solid #5dc2af',
      backgroundColor: 'transparent',
      color: '#5dc2af'
    }
  }
});

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TodoList: React.FC<TodoListProps> = ({ todos, onToggle, onDelete }) => {
  return (
    <List sx={{
      '& .MuiListItem-root': {
        borderBottom: '1px solid #ededed',
        py: 1.5
      },
      '& .MuiListItem-root:last-child': {
        borderBottom: 'none'
      }
    }}>
      {todos.map((todo) => (
        <ListItem
          key={todo.id}
          dense
          onClick={() => onToggle(todo.id)}
          sx={{
            '&:hover .delete-icon': {
              opacity: 1
            }
          }}
          secondaryAction={
            <IconButton
              edge="end"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(todo.id);
              }}
              className="delete-icon"
              sx={{
                opacity: 0,
                transition: 'opacity 0.2s',
                color: '#cc9a9a',
                '&:hover': {
                  color: '#af5b5e'
                }
              }}
            >
              <DeleteIcon />
            </IconButton>
          }
        >
          <CustomCheckbox
            edge="start"
            checked={todo.completed}
            tabIndex={-1}
            disableRipple
            checkedIcon={<CheckIcon />}
            icon={<CheckIcon />}
          />
          <ListItemText
            primary={todo.text}
            sx={{
              '& .MuiTypography-root': {
                fontSize: '1.1rem',
                textDecoration: todo.completed ? 'line-through' : 'none',
                color: todo.completed ? '#d9d9d9' : 'inherit'
              }
            }}
          />
        </ListItem>
      ))}
    </List>
  );
};
