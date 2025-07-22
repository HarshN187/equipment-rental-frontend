import React from "react";
import FormAction from "../../../components/Form/FormAction";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema, type UserData } from "../../../types/user.types";
import { addUserFields } from "../../../constants/formFields";
import { Input } from "../../../components/Form/Input";
import { userApi } from "../../../api";
import { useNavigate } from "react-router-dom";

const fields = addUserFields;

interface AddUserFormData {
  username: string;
  email: string;
  phone: string;
}

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
  const onSubmit = async (data: UserData) => {
    // console.log(data);
    try {
      const response = await userApi.post(data);
      //   console.log(response);
      navigate("/users");
    } catch (e) {
      alert(e);
    }
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
