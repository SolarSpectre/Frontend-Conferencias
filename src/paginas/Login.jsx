import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuthStore } from "../components/useAuthStore";

const Login = () => {
  useAuthStore();
  const navigate = useNavigate();

  const [form, setform] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      await useAuthStore.getState().login(form);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      toast(error.response?.data?.msg || "Error de autenticación");
      setform({});
    }
  };

  return (
    <>
      <div
        className="w-1/2 h-screen bg-[url('/images/login.webp')] 
            bg-no-repeat bg-cover bg-center sm:block
            "
      ></div>

      <div className="w-1/2 h-screen bg-white flex justify-center items-center">
        <div className="md:w-4/5 sm:w-full">
          <h1 className="text-3xl font-semibold mb-2 text-center uppercase  text-gray-500">
            Bienvenido
          </h1>
          <small className="text-gray-400 block my-4 text-sm">
            Bienvenido! Ingresa tus credenciales
          </small>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="mb-2 block text-sm font-semibold">Email</label>
              <input
                name="email"
                value={form.email || ""}
                onChange={handleChange}
                type="email"
                placeholder="Enter you email"
                className="block w-full rounded-md border  focus:outline-none focus:ring-1 py-1 px-2 text-gray-500"
              />
            </div>

            <div className="mb-3">
              <label className="mb-2 block text-sm font-semibold">
                Password
              </label>
              <input
                name="password"
                value={form.password || ""}
                onChange={handleChange}
                type="password"
                placeholder="********************"
                className="block w-full rounded-md border  focus:outline-none focus:ring-1 py-1 px-2 text-gray-500"
              />
            </div>

            <div className="my-4">
              <button
                to="/dashboard"
                className="py-2 w-full block text-center bg-gray-500 text-slate-300 border rounded-xl hover:scale-100 duration-300 hover:bg-gray-900 hover:text-white"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;