import { useForm } from "react-hook-form";
import Logo from "../../assets/Logo/logo.jpg";
import "../../assets/Css/Common.css";
import Lottie from "lottie-react";
import LoginAnimation from "../../assets/LottieFiles/login.json";
import { AuthContext } from "../../Context/AuthProvider";
import { useContext } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navigate, useNavigate } from "react-router-dom";

const LogIn = () => {
  const { loading, setLoading } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data);

    const { regId: givenId, password: givenPass } = data;

    setLoading(true);

    fetch("http://localhost:5000/employees")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        data?.forEach((employeeInfo) => {
          const { regId, password } = employeeInfo;
          console.log(employeeInfo);

          if (regId === givenId && password === givenPass) {
            localStorage.setItem("Employee-Info", JSON.stringify(employeeInfo));
            navigate("/");
            toast.success("LogIn successfully");
          }
        });
      })
      .catch((err) => {
        toast.error("No match");
      });

    setLoading(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="hero min-h-screen my-10">
      <div className="hero-content w-[85%] flex-col lg:flex-row justify-between">
        {/* left side  */}
        <div className="text-center mb-10 lg:mb-0 lg:text-left">
          <Lottie animationData={LoginAnimation} loop={true} />
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-xl bg-base-100">
          <div className="card-body">
            <div>
              <img
                className="w-[150px] h-[150px] mx-auto"
                src={Logo}
                alt="logo"
              />

              <h1 className="text-center text-3xl font-bold">Welcome Back</h1>
              <p className="text-center text-sm my-2">
                Please enter your details
              </p>
            </div>

            {/* login fields  */}
            <form className="my-4" onSubmit={handleSubmit(onSubmit)}>
              {/* registration id field  */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold">Registration ID</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter registration id"
                  className="input input-bordered"
                  {...register("regId", { required: true })}
                  aria-invalid={errors.regId ? "true" : "false"}
                />

                {errors.regId?.type === "required" && (
                  <p role="alert" className="my-1 text-red-600">
                    Registration ID is required
                  </p>
                )}
              </div>

              {/* password field  */}
              <div className="form-control my-4 relative">
                <label className="label">
                  <span className="label-text font-bold">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  {...register("password", { required: true })}
                  aria-invalid={errors.password ? "true" : "false"}
                />
                {errors.regId?.type === "required" && (
                  <p role="alert" className="my-1 text-red-600">
                    password is required
                  </p>
                )}
              </div>
              <div className="form-control mt-6">
                <input
                  type="submit"
                  value="LogIn"
                  className="btn button-bg text-white"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
