import FormAction from "./FormAction";
import { signupFields } from "../../constants/formFields";
import { Input } from "./Input";
import { useForm } from "react-hook-form";
import { customerApi } from "../../api";
import { SignupSchema, type SignupData } from "../../types/signup.types";
import { zodResolver } from "@hookform/resolvers/zod";

const fields = signupFields;

fields.forEach((field, index) => (field.id = index));

// interface SignUpFormData {
//   username: string;
//   email: string;
//   password: string;
//   confirmPassword: string;
// }

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SignupData>({
    resolver: zodResolver(SignupSchema),
  });

  const onSubmit = async (data: SignupData) => {
    console.log(data);
    const res = await customerApi.post(data);
    console.log(res);
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="">
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

        <FormAction text="Signup" />
      </div>
    </form>
  );
}
