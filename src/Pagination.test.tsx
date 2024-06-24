import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Pagination from './Pagination';

describe('Pagination Component', () => {
  test('renders Pagination component', () => {
    const setPage = jest.fn();
    const { getByText } = render(
      <Pagination page={1} totalPages={5} setPage={setPage} />
    );
    expect(getByText(/Page 1 of 5/)).toBeInTheDocument();
  });

  test('Previous button is disabled on the first page', () => {
    const setPage = jest.fn();
    const { getByText } = render(
      <Pagination page={1} totalPages={5} setPage={setPage} />
    );
    const prevButton = getByText('Prev');
    expect(prevButton).toBeDisabled();
  });

  test('Next button is disabled on the last page', () => {
    const setPage = jest.fn();
    const { getByText } = render(
      <Pagination page={5} totalPages={5} setPage={setPage} />
    );
    const nextButton = getByText('Next');
    expect(nextButton).toBeDisabled();
  });

  test('Clicking Next button increments page by 1', () => {
    const setPage = jest.fn();
    const { getByText } = render(
      <Pagination page={1} totalPages={5} setPage={setPage} />
    );
    fireEvent.click(getByText('Next'));
    expect(setPage).toHaveBeenCalledWith(expect.any(Function));

    const incrementPage = setPage.mock.calls[0][0];
    expect(incrementPage(1)).toBe(2);
  });

  test('Clicking Prev button decrements page by 1', () => {
    const setPage = jest.fn();
    const { getByText } = render(
      <Pagination page={2} totalPages={5} setPage={setPage} />
    );
    fireEvent.click(getByText('Prev'));
    expect(setPage).toHaveBeenCalledWith(expect.any(Function));

    const decrementPage = setPage.mock.calls[0][0];
    expect(decrementPage(2)).toBe(1);
  });
});
