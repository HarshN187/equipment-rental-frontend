import { Input } from "../../../components/Form/Input";
import { addUserFields } from "../../../constants/formFields";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema, type UserData } from "../../../types/user.types";
import FormModal from "../../../components/Form/FormModal";

export function EditUserModal({ user, onClose, onSave }: any) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<UserData>({
    resolver: zodResolver(userSchema),
  });

  return (
    <>
      <FormModal>
        <h2 className="text-xl font-bold mb-4">Edit User</h2>
        <form onSubmit={handleSubmit(onSave.mutate)}>
          <div className="mb-4">
            <Input
              labelText=""
              labelFor="id"
              name="user_id"
              type="hidden"
              defaultValue={user.user_id}
              register={register}
              error={errors["user_id"]}
            />

            {addUserFields.map((ele, index) => (
              <Input
                key={index}
                labelText={ele.labelText}
                labelFor={ele.labelFor}
                name={ele.name}
                defaultValue={user[ele.name]}
                type={ele.type}
                placeholder={ele.placeholder}
                register={register}
                error={errors[ele.name]}
              />
            ))}
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Save Changes
            </button>
          </div>
        </form>
      </FormModal>
    </>
  );
}
