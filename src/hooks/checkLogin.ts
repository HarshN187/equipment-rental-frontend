import { useEffect } from "react";
import { loginApi } from "../api";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";

export function useCheckLogin() {
  const navigate = useNavigate();

  const fetchFunction = async () => {
    try {
      const response = await loginApi.isLogin();
      console.log("in checklogin", response);
      if (response.data != true) {
        toast.error("Please Login !", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
        navigate("login");
      }
    } catch (e) {
      // alert(e);
      toast.error("Please Login !", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      navigate("login");
    }
  };

  useEffect(() => {
    fetchFunction();
  }, []);
}
