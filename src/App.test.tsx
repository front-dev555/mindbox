import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('Todo App', () => {
  test('adding a new todo', async () => {
    render(<App />);

    const input = screen.getByPlaceholderText('What needs to be done?');
    const button = screen.getByText('Add');

    await userEvent.type(input, 'New task');
    fireEvent.click(button);

    expect(screen.getByText('New task')).toBeInTheDocument();
  });

  test('marking todo as completed', async () => {
    render(<App />);

    const input = screen.getByPlaceholderText('What needs to be done?');
    const button = screen.getByText('Add');

    await userEvent.type(input, 'Test task');
    fireEvent.click(button);

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    const todoText = screen.getByText('Test task');
    expect(todoText).toHaveStyle({ textDecoration: 'line-through' });
  });

  test('filtering todos', async () => {
    render(<App />);

    const input = screen.getByPlaceholderText('What needs to be done?');
    const button = screen.getByText('Add');

    await userEvent.type(input, 'Task 1');
    fireEvent.click(button);
    await userEvent.type(input, 'Task 2');
    fireEvent.click(button);

    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[0]);

    fireEvent.click(screen.getByText('Active'));
    expect(screen.queryByText('Task 1')).not.toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Completed'));
    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.queryByText('Task 2')).not.toBeInTheDocument();
  });

  test('clearing completed todos', async () => {
    render(<App />);

    const input = screen.getByPlaceholderText('What needs to be done?');
    const addButton = screen.getByText('Add');

    await userEvent.type(input, 'Task to clear');
    fireEvent.click(addButton);

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    const clearButton = screen.getByText('Clear completed');
    fireEvent.click(clearButton);

    const todoText = screen.getByText('Task to clear');
    expect(todoText).not.toHaveStyle({ textDecoration: 'line-through' });
  });
});
