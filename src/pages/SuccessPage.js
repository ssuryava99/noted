import { useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AccessContext } from '../components/AccessProvider';

const SuccessPage = () => {
  const { updateAccessToken } = useContext(AccessContext);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = new URLSearchParams(location.hash.substring(1)).get('access_token');

    if (accessToken) {
      updateAccessToken(accessToken);
      // Redirect the user after setting the access token
      navigate('/select')
    }
  }, [location.hash, updateAccessToken, navigate]);

  return null; // or a loading spinner if needed
};

export default SuccessPage;