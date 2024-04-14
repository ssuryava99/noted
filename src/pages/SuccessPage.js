import { useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AccessContext } from '../components/AccessProvider';

const SuccessPage = () => {
  const { updateAccessToken, updateProviderToken } = useContext(AccessContext);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = new URLSearchParams(location.hash.substring(1)).get('access_token');
    const providerToken = new URLSearchParams(location.hash.substring(1)).get('provider_token');

    if (accessToken && providerToken) {
      updateAccessToken(accessToken);
      updateProviderToken(providerToken);
      // Redirect the user after setting the access token
      navigate('/select')
    }
  }, [location.hash, updateAccessToken, updateProviderToken, navigate]);

  return null; // or a loading spinner if needed
};

export default SuccessPage;