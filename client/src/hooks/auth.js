import { useCookies } from 'react-cookie';

const useCheckAuth = () => {
    const [cookies] = useCookies(['token']);
    if (cookies.token === 'undefined' || !cookies.token) {
        return false;
    } else {
        return true;
    }
};

export default useCheckAuth;