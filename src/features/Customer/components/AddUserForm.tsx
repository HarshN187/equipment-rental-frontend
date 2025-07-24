import FormAction from "../../../components/Form/FormAction";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema, type UserData } from "../../../types/user.types";
import { addUserFields } from "../../../constants/formFields";
import { Input } from "../../../components/Form/Input";
import { customerApi } from "../../../api";
import { useNavigate } from "react-router-dom";
import { useAddCustomer } from "../hooks/useAddCustomer";

const fields = addUserFields;

function AddUserForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<UserData>({
    resolver: zodResolver(userSchema),
  });
  const navigate = useNavigate();

  const addMutation = useAddCustomer();

  const onSubmit = async (data: UserData) => {
    addMutation.mutate(data);
  };

  return (
    <div>
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

          <FormAction text="Add User" />
        </div>
      </form>
    </div>
  );
}

export default AddUserForm;
