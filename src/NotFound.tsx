import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  return (
    <>
      <h1 style={{ marginLeft: '280px' }}>
        The Page you are looking is not available !
      </h1>
      <button
        style={{ marginLeft: '280px', marginTop: '50px' }}
        className='btn btn primary'
        onClick={() => navigate('/')}
      >
        Go back
      </button>
    </>
  );
};

export default NotFound;