

import toast from "react-hot-toast";

interface TToast{
    title : string
}


const ToastError = ({title}:TToast) => {



    return toast.error(title);
};

export default ToastError;