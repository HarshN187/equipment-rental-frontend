import FormAction from "../../../components/Form/FormAction";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema, type UserData } from "../../../types/user.types";
import { addUserFields } from "../../../constants/formFields";
import { Input } from "../../../components/Form/Input";
import { useAddCustomer } from "../hooks/useAddCustomer";
import type { JSX } from "react";

const fields = addUserFields;

function AddUserForm(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserData>({
    resolver: zodResolver(userSchema),
  });

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
