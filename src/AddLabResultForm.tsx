import { useForm } from 'react-hook-form';
import ILabResult from './types/types';

const AddLabResultForm = ({
  onAdd,
}: {
  onAdd: (newResult: ILabResult) => void;
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ILabResult>();

  const onSubmit = (data: ILabResult) => {
    onAdd(data);
    reset();
  };

  return (
    <>
      <h2 className='text-xl font-bold text-blue-600 mb-4'>Add Lab Result</h2>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        <div>
          <input
            {...register('BARCODE', { required: 'Barcode is required' })}
            placeholder='Barcode'
            className='form-input mt-1 block w-full p-2 border rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50'
          />
          {errors.BARCODE && (
            <p className='text-red-500'>{errors.BARCODE.message}</p>
          )}
        </div>
        <div>
          <input
            {...register('PATIENT_ID', { required: 'Patient ID is required' })}
            placeholder='Patient ID'
            className='form-input mt-1 block w-full p-2 border rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50'
          />
          {errors.PATIENT_ID && (
            <p className='text-red-500'>{errors.PATIENT_ID.message}</p>
          )}
        </div>
        <div>
          <input
            {...register('PATIENT_NAME', {
              required: 'Patient Name is required',
            })}
            placeholder='Patient Name'
            className='form-input mt-1 block w-full p-2 border rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50'
          />
          {errors.PATIENT_NAME && (
            <p className='text-red-500'>{errors.PATIENT_NAME.message}</p>
          )}
        </div>
        <div>
          <label
            htmlFor='dateOfBirth'
            className='block text-sm font-medium text-gray-700'
          >
            Date of birth
          </label>
          <input
            {...register('DOB', { required: 'Date of Birth is required' })}
            type='date'
            placeholder='Date of birth'
            className='form-input mt-1 block w-full p-2 border rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50'
          />
          {errors.DOB && <p className='text-red-500'>{errors.DOB.message}</p>}
        </div>
        <select
          {...register('GENDER', { required: 'Gender is required' })}
          className='form-select mt-1 block w-full p-2 border rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 pr-8'
        >
          <option value=''>Select Gender</option>
          <option value='F'>Female</option>
          <option value='M'>Male</option>
        </select>
        <div>
          <label
            htmlFor='collectionDate'
            className='block text-sm font-medium text-gray-700'
          >
            Collection Date
          </label>
          <input
            {...register('COLLECTIONDATE', {
              required: 'Collection date is required',
            })}
            type='date'
            id='collectionDate'
            placeholder='Collection date'
            className='form-input mt-1 block w-full p-2 border rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50'
          />
          {errors.COLLECTIONDATE && (
            <p className='text-red-500'>{errors.COLLECTIONDATE.message}</p>
          )}
        </div>
        <div>
          <input
            {...register('COLLECTIONTIME', {
              required: 'Collection time is required',
            })}
            placeholder='Collection time'
            className='form-input mt-1 block w-full p-2 border rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50'
          />
          {errors.COLLECTIONTIME && (
            <p className='text-red-500'>{errors.COLLECTIONTIME.message}</p>
          )}
        </div>
        <div>
          <input
            {...register('TESTCODE', {
              required: 'Test code is required',
            })}
            placeholder='Test Code'
            className='form-input mt-1 block w-full p-2 border rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50'
          />
          {errors.TESTCODE && (
            <p className='text-red-500'>{errors.TESTCODE.message}</p>
          )}
        </div>
        <div>
          <input
            {...register('RESULT', {
              required: 'Result is required',
            })}
            placeholder='Result'
            className='form-input mt-1 block w-full p-2 border rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50'
          />
          {errors.RESULT && (
            <p className='text-red-500'>{errors.RESULT.message}</p>
          )}
        </div>
        <div>
          <input
            {...register('UNIT', {
              required: 'Unit is required',
            })}
            placeholder='Unit'
            className='form-input mt-1 block w-full p-2 border rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50'
          />
          {errors.UNIT && <p className='text-red-500'>{errors.UNIT.message}</p>}
        </div>
        <div>
          <input
            {...register('REFRANGELOW', {
              required: 'Reference range low is required',
            })}
            placeholder='Reference Range Low'
            className='form-input mt-1 block w-full p-2 border rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50'
          />
          {errors.REFRANGELOW && (
            <p className='text-red-500'>{errors.REFRANGELOW.message}</p>
          )}
        </div>
        <div>
          <input
            {...register('REFRANGEHIGH', {
              required: 'Reference range high is required',
            })}
            placeholder='Reference Range High'
            className='form-input mt-1 block w-full p-2 border rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50'
          />
          {errors.REFRANGEHIGH && (
            <p className='text-red-500'>{errors.REFRANGEHIGH.message}</p>
          )}
        </div>
        <div>
          <input
            {...register('NOTE')}
            placeholder='Note'
            className='form-input mt-1 block w-full p-2 border rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50'
          />
        </div>
        <div>
          <input
            {...register('NONSPECREFS')}
            placeholder='Non-specific Refs'
            className='form-input mt-1 block w-full p-2 border rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50'
          />
        </div>
        <button
          type='submit'
          className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
        >
          Add
        </button>
      </form>
    </>
  );
};

export default AddLabResultForm;
