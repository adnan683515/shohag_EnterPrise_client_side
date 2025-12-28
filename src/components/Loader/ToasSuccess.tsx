import toast from "react-hot-toast";

interface TToast{
    title : string
}


const ToasSuccess = ({title}:TToast) => {


    
    return toast.success(title);
};

export default ToasSuccess;