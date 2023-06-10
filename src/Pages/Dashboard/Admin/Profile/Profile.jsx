import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../../Context/AuthProvider";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import style from "./Profile.module.css";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { employeeInfo } = useContext(AuthContext);
  const { _id, role, name, regId, password } = employeeInfo;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data);

    // check new password is given in the field or not
    if (password !== data.password) {
      // update password using patch method to update specific admin
      fetch(`https://quiz-five-beta.vercel.app/updateAdminPassword?id=${_id}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.acknowledged) {
            toast.success("Update password successfully");

            // get previous admin info from the local-storage
            const adminInfo = JSON.parse(localStorage.getItem("Employee-Info"));

            // update the password in the local-storage
            adminInfo["password"] = data.password;
            localStorage.setItem("Employee-Info", JSON.stringify(adminInfo));

            // navigate to profile page
            navigate("/dashboard/profile");
          }
        })
        .catch(() => {
          toast.error("Something went wrong!");
        });
    } else {
      toast.error("New password is not given.");
    }
  };
  return (
    <div>
      <div className="w-[60%] mx-auto my-10   border border-gray-200 rounded-lg shadow">
        <div className=" py-10 bg-[#44b2bf33]">
          <h1 className="text-3xl text-center font-bold font-roboto uppercase">
            Profile Info
          </h1>

          {/* profile information  */}
          <div className="px-[20px] font-roboto ">
            <h5 className="mb-1 text-xl  font-medium text-gray-900 capitalize mt-4">
              <span className="font-bold text-[#3DB3BD]"> Name:</span>
              {" " + name}
            </h5>
            <h5 className="mb-1 text-xl font-medium text-gray-900 capitalize mt-4">
              <span className="font-bold text-[#3DB3BD]"> Designation:</span>
              {" " + role}
            </h5>

            <h5 className="mb-1 text-xl font-medium text-gray-900 capitalize mt-4">
              <span className="font-bold text-[#3DB3BD]">Registration Id:</span>
              {" " + regId}
            </h5>

            <form className="my-4" onSubmit={handleSubmit(onSubmit)}>
              {/* registration id field  */}
              <div className="form-control">
                <h5 className="mb-1 text-xl font-medium text-gray-900 capitalize mt-4">
                  <span className=" font-bold text-[#3DB3BD]">Password</span>
                </h5>
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
