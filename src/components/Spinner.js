import RingLoader from 'react-spinners/RingLoader';

const Spinner = () => {
  return (
    <div className="spinner-container">
      <RingLoader size={100} color={'#fff'} loading />
    </div>
  );
};

export default Spinner;
