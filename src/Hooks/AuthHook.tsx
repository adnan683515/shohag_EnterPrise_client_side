import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';

const AuthHook = () => {


    const userInfo = useContext(AuthContext)

    return  userInfo;
};

export default AuthHook;