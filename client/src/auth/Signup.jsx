import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const Signup = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [form, setForm] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const signupHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/user/signup", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (response.status == 400) {
        setErrorMessage(data.message);
      }
      if (response.status == 200) {
        localStorage.setItem("token", data.token);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-2/5 h-fit border border-gray-500 rounded-lg">
      <form
        onSubmit={signupHandler}
        className=" p-4 w-full h-full flex flex-col gap-4 justify-center items-center"
      >
        <div className=" w-full flex flex-col gap-1">
          <p>Name</p>
          <input
            value={form.userName}
            onChange={(e) =>
              setForm((prev) => {
                return {
                  ...prev,
                  userName: e.target.value,
                };
              })
            }
            type="text"
            className="border border-gray-500 w-full p-2 rounded-md"
          />
        </div>
        <div className=" w-full flex flex-col gap-1">
          <p>Email</p>
          <input
            value={form.email}
            onChange={(e) =>
              setForm((prev) => {
                return {
                  ...prev,
                  email: e.target.value,
                };
              })
            }
            type="email"
            className="border border-gray-500 w-full p-2 rounded-md"
          />
        </div>
        <div className=" w-full flex flex-col gap-1">
          <p>Password</p>
          <input
            onChange={(e) =>
              setForm((prev) => {
                return {
                  ...prev,
                  password: e.target.value,
                };
              })
            }
            value={form.password}
            type="password"
            className="border border-gray-500 w-full p-2 rounded-md"
          />
        </div>
        <div className="w-full flex flex-col gap-1">
          <p>confirm password</p>
          <input
            onChange={(e) =>
              setForm((prev) => {
                return {
                  ...prev,
                  confirmPassword: e.target.value,
                };
              })
            }
            value={form.confirmPassword}
            type="password"
            className="border border-gray-500 w-full p-2 rounded-md"
          />
        </div>
        <p className="text-red-500 w-full">{errorMessage}</p>
        <button
          type="submit"
          className=" bg-green-500 p-2 text-white font-bold rounded-md w-full hover:bg-green-600"
        >
          SIGNUP
        </button>
      </form>
      <div className="w-full h-fit p-4 flex justify-center ">
        <p>Existing user?</p>
        <Link to={"/"} className=" text-green-500 px-1">
          Login here
        </Link>
      </div>
    </div>
  );
};

export default Signup;
