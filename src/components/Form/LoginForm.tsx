import FormAction from "./FormAction";
import FormExtra from "./FormExtra";
import { useForm } from "react-hook-form";
import { Input } from "./Input";
import { loginFields } from "../../constants/formFields";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, type LoginData } from "../../types/login.types";
import { loginApi } from "../../api";
import { useNavigate } from "react-router-dom";
import { Bounce, Flip, toast } from "react-toastify";

const fields = loginFields;

fields.map((ele, index) => (ele.id = index));

export interface LoginFormData {
  email: string;
  password: string;
}

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginData>({
    resolver: zodResolver(LoginSchema),
  });

  const navigate = useNavigate();

  const onSubmit = async (data: LoginData) => {
    // e.preventDefault();
    try {
      const res = await loginApi.post(data);
      console.log(res);

      if (res.status == 201) {
        navigate("/dashboard");

        toast("Successfully logged in !", {
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
      } else {
        alert("dhdhbnas");
      }
    } catch (error) {
      console.error(error);
      toast.error("enter valid cedentials !", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Flip,
      });
    }
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="-space-y-px">
        {fields.map((ele) => (
          <Input
            key={ele.id}
            labelText={ele.labelText}
            labelFor={ele.labelFor}
            name={ele.name}
            type={ele.type}
            placeholder={ele.placeholder}
            register={register}
            error={errors[ele.name]}
          />
        ))}
      </div>
      <FormExtra />
      <FormAction text="Login" />
    </form>
  );
}
