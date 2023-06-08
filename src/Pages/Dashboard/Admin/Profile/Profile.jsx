import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../../Context/AuthProvider";
import style from "./Profile.module.css";

const Profile = () => {
  const { employeeInfo } = useContext(AuthContext);
  const { role, name, regId, password } = employeeInfo;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { password } = data;
  };
  return (
    <div>
      <div className="w-[60%] mx-auto my-10  bg-white border border-gray-200 rounded-lg shadow">
        <div className=" py-10">
          <h1 className="text-3xl text-center font-bold font-roboto">
            Profile Info
          </h1>

          {/* profile information  */}
          <div className="px-[20px] font-roboto">
            <h5 className="mb-1 text-xl  font-medium text-gray-900 capitalize mt-4">
              <span className="font-bold"> Name:</span>
              {" " + name}
            </h5>
            <h5 className="mb-1 text-xl font-medium text-gray-900 capitalize mt-4">
              <span className="font-bold"> Designation:</span>
              {" " + role}
            </h5>

            <h5 className="mb-1 text-xl font-medium text-gray-900 capitalize mt-4">
              <span className="font-bold">Registration Id:</span>
              {" " + regId}
            </h5>

            <form className="my-4" onSubmit={handleSubmit(onSubmit)}>
              {/* registration id field  */}
              <div className="form-control">
                <label className="label">
                  <span className=" font-bold">Password</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter password"
                  defaultValue={password}
                  className="input input-bordered"
                  {...register("password", { required: true })}
                  aria-invalid={errors.password ? "true" : "false"}
                />

                {errors.password?.type === "required" && (
                  <p role="alert" className="my-1 text-red-600">
                    Password is required
                  </p>
                )}

                <input
                  type="submit"
                  value="Update Password"
                  className={`inline-block w-fit mx-auto my-6 px-[10px] py-[15px] rounded-full ${style.submitBtn}`}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
