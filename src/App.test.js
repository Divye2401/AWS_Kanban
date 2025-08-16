import { render, screen } from '@testing-library/react';
import App from './App';

test('renders kanban app header', () => {
  render(<App />);
  const headerElement = screen.getByText(/Organize Your Tasks Efficiently/i);
  expect(headerElement).toBeInTheDocument();
});

test('renders todo board', () => {
  render(<App />);
  const todoBoard = screen.getByText(/Todo/i);
  expect(todoBoard).toBeInTheDocument();
});

test('renders in progress board', () => {
  render(<App />);
  const inProgressBoard = screen.getByText(/In Progress/i);
  expect(inProgressBoard).toBeInTheDocument();
});

test('renders done board', () => {
  render(<App />);
  const doneBoard = screen.getByText(/Done/i);
  expect(doneBoard).toBeInTheDocument();
});
