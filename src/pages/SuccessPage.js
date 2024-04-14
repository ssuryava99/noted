import { useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AccessContext } from '../components/AccessProvider';

const SuccessPage = () => {
  const { updateProviderToken } = useContext(AccessContext);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const providerToken = new URLSearchParams(location.hash.substring(1)).get('provider_token');

    if (providerToken) {
      updateProviderToken(providerToken);
      // Redirect the user after setting the access token
      navigate('/select')
    }
  }, [location.hash, updateProviderToken, navigate]);

  return null; // or a loading spinner if needed
};

export default SuccessPage;