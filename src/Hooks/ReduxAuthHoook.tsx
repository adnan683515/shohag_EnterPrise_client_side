
import { useSelector } from 'react-redux';
import type { RootState } from '../redux/store';

const ReduxAuthHoook = () => {

    const userInfo = useSelector((state: RootState) => state.auth.user)

    return userInfo;
};

export default ReduxAuthHoook;