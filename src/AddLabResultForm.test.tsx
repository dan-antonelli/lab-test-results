import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddLabResultForm from './AddLabResultForm';

describe('AddLabResultForm', () => {
  const mockOnAdd = jest.fn();

  beforeEach(() => {
    render(<AddLabResultForm onAdd={mockOnAdd} />);
    mockOnAdd.mockClear();
  });

  test('renders correctly', () => {
    expect(screen.getByPlaceholderText('Barcode')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Patient ID')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Patient Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Date of birth')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Collection date')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Collection time')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Test Code')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Result')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Unit')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Reference Range Low')
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Reference Range High')
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Note')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Non-specific Refs')
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add' })).toBeInTheDocument();
  });
});
