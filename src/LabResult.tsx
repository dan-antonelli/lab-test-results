import ILabResult from './types/types';

interface LabResultProps {
  result: ILabResult;
}

const displayValueOrNA = (value: string | number | undefined) =>
  value ? value : 'N/A';

const LabResult = ({ result }: LabResultProps) => (
  <li className='bg-white shadow overflow-hidden rounded-md px-4 py-4 mb-2'>
    <div className='mb-2'>
      <strong className='font-semibold text-gray-800'>Clinic No:</strong>{' '}
      {displayValueOrNA(result.CLINIC_NO)}
    </div>
    <div className='mb-2'>
      <strong className='font-semibold text-gray-800'>Barcode:</strong>{' '}
      {displayValueOrNA(result.BARCODE)}
    </div>
    <div className='mb-2'>
      <strong className='font-semibold text-gray-800'>Patient ID:</strong>{' '}
      {displayValueOrNA(result.PATIENT_ID)}
    </div>
    <div className='mb-2'>
      <strong className='font-semibold text-gray-800'>Patient:</strong>{' '}
      {displayValueOrNA(result.PATIENT_NAME)}
    </div>
    <div className='mb-2'>
      <strong className='font-semibold text-gray-800'>Date of birth:</strong>{' '}
      {displayValueOrNA(result.DOB)}
    </div>
    <div className='mb-2'>
      <strong className='font-semibold text-gray-800'>Gender:</strong>{' '}
      {displayValueOrNA(result.GENDER)}
    </div>
    <div className='mb-2'>
      <strong className='font-semibold text-gray-800'>Collection Date:</strong>{' '}
      {displayValueOrNA(result.COLLECTIONDATE)}{' '}
      {displayValueOrNA(result.COLLECTIONTIME)}
    </div>
    <div className='mb-2'>
      <strong className='font-semibold text-gray-800'>Test:</strong>{' '}
      {displayValueOrNA(result.TESTNAME)} ({displayValueOrNA(result.TESTCODE)})
    </div>
    <div className='mb-2'>
      <strong className='font-semibold text-gray-800'>Test result:</strong>{' '}
      {displayValueOrNA(result.RESULT)} {displayValueOrNA(result.UNIT)}
    </div>
    <div className='mb-2'>
      <strong className='font-semibold text-gray-800'>Reference Range:</strong>{' '}
      {displayValueOrNA(result.REFRANGELOW)} -{' '}
      {displayValueOrNA(result.REFRANGEHIGH)}
    </div>
    <div className='mb-2'>
      <strong className='font-semibold text-gray-800'>Note:</strong>{' '}
      {displayValueOrNA(result.NOTE)}
    </div>
    <div className='mb-2'>
      <strong className='font-semibold text-gray-800'>
        Non-Specific Refs:
      </strong>{' '}
      {displayValueOrNA(result.NONSPECREFS)}
    </div>
  </li>
);

export default LabResult;
