import Lottie from 'lottie-react';
import loader from './loader.json';

export const Loading = () => (
  <div className='loading' data-test-id='loader'>
    <Lottie animationData={loader} loop={true} />
  </div>
);
