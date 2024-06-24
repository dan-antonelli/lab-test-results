import { useState, useEffect } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import ILabResult from './types/types';
import LabResult from './LabResult';
import AddLabResultForm from './AddLabResultForm';
import Modal from './Modal';
import Pagination from './Pagination';

const HOST = 'localhost';
const PORT = '3001';
const GET_LAB_RESULTS_ENDPOINT = 'api/lab-results';
const ADD_LAB_RESULT_ENDPOINT = 'api/lab-result';

const fetchLabResults = async (page: number, limit: number) => {
  const response = await fetch(
    `http://${HOST}:${PORT}/${GET_LAB_RESULTS_ENDPOINT}?page=${page}&limit=${limit}`
  );
  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || 'An unexpected error occurred');
  }
  return response.json();
};

function App() {
  const queryClient = useQueryClient();
  const limit = 10;
  const [page, setPage] = useState(1);

  const { data, isLoading, error } = useQuery(
    ['labResults', page, limit],
    () => fetchLabResults(page, limit),
    {
      keepPreviousData: true,
    }
  );
  const { register, watch } = useForm<{ filterResults: string }>();
  const filterResults = watch('filterResults', '').toLowerCase();
  const [showAddForm, setShowAddForm] = useState(false);

  const filteredLabResults = data?.data?.filter((result: ILabResult) =>
    Object.values(result).some(
      (value) =>
        typeof value === 'string' && value.toLowerCase().includes(filterResults)
    )
  );

  useEffect(() => {
    if (data?.pagination.currentPage < data?.pagination.totalPages) {
      queryClient.prefetchQuery(['labResults', page + 1, limit], () =>
        fetchLabResults(page + 1, limit)
      );
    }
  }, [data, page, limit, queryClient]);

  const handleAddLabResult = async (newResult: ILabResult) => {
    try {
      const response = await fetch(
        `http://${HOST}:${PORT}/${ADD_LAB_RESULT_ENDPOINT}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newResult),
        }
      );
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || 'Failed to add lab result');
      }
      queryClient.invalidateQueries('labResults');
      toast.success('Lab result added successfully');
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`Error: could not add lab result`);
      }
    }
  };

  if (isLoading)
    return (
      <div className='flex h-screen justify-center items-center'>
        Loading...
      </div>
    );
  if (error instanceof Error) toast.error(`Error loading lab results`);

  return (
    <div className='max-w-4xl mx-auto p-4'>
      <h1 className='text-2xl font-bold text-blue-600 mb-4 text-center'>
        Lab Results
      </h1>
      <form>
        <input
          {...register('filterResults')}
          placeholder='Filter results'
          type='text'
          className='form-input mt-1 block w-full p-2 border rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50'
        />
      </form>
      <button
        onClick={() => setShowAddForm(true)}
        className='mt-4 mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
      >
        Add
      </button>
      {showAddForm && (
        <Modal onClose={() => setShowAddForm(false)}>
          <AddLabResultForm onAdd={handleAddLabResult} />
        </Modal>
      )}
      {filteredLabResults && filteredLabResults.length > 0 ? (
        <ul className='mt-4'>
          {filteredLabResults.map((result: ILabResult) => (
            <LabResult key={result.BARCODE} result={result} />
          ))}
        </ul>
      ) : (
        <div className='text-gray-500 mt-4'>No results found.</div>
      )}
      <Pagination
        page={page}
        totalPages={data?.pagination.totalPages}
        setPage={setPage}
      />
    </div>
  );
}

export default App;
