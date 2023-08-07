import { useNavigate } from 'react-router-dom';
import { getDecodedAccessToken } from './api/decoder';
import { useEffect } from 'react';

const PrivateRoute = () => {
    const decodedToken: any = getDecodedAccessToken();
    const id = decodedToken ? decodedToken.id : null;
    const navigate = useNavigate();
    useEffect(() => {
        if (!decodedToken) {
            navigate('/');
            return;
        }
        if (id !== "64ccd02bef3df6b550fac778") {
            navigate('/');
        }
    })
    return null;
};

export default PrivateRoute;
