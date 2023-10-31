import React from "react";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Image from "next/image";
function login() {
  const { push } = useRouter();
  const [formData, setFormData] = useState({
    username: "Admin",
    password: "",
  });

  const handleInputChange = (fieldName, value) => {
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post("/api/xbox/login", formData);
      if (res.status === 200 && document.cookie.includes("token")) {
        toast.success("Giriş işlemi başarıyla yapıldı.");
        push("/xbox/products");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="w-screen h-screen">
      {/* navbar */}
      <div className="h-[100px] w-full px-2 sm:p-0 bg-gray-300 flex justify-between ">
      <div className="w-full h-full flex ">
          <div className="sm:w-2/3 h-full flex justify-center items-center ">
            <Image
              className="w-[120px] p-1"
              alt=""
              src="/remove_logo.png"
              width={200}
              height={200}
            />
          </div>
          <div className="w-1/3 h-full flex gap-x-5 items-center font-semibold ">
            <button><a href="/" className="hover:underline">Home</a></button>
          </div>
        </div>
      </div>
      <div className="w-full h-full max-h-[calc(100vh_-_100px)] flex justify-center items-center">
        <div className="sm:w-[800px] w-full sm:h-[800px] h-full sm:border-y-4  border-black">
          <div className="p-5 w-full h-auto text-center">
            <span className="text-[30px] lg:text-[40px]">Giriş</span>
          </div>
          <form className="w-full px-10 h-auto bg-slate-100">
            <div className="w-full h-auto flex flex-col gap-y-4">
              <Input
                placeholder="Username"
                value={formData.username}
                onChange={(value) => handleInputChange("username", value)}
                disabled={true}
              />
              <Input
                placeholder="Password"
                value={formData.password}
                onChange={(value) => handleInputChange("password", value)}
              />
            </div>
            <div className="w-full h-auto flex justify-center items-center mt-4">
              <button
                type="button"
                onClick={handleLogin}
                className="w-36 py-3 bg-black text-white font-semibold rounded-md hover:bg-blue-300 transition duration-300 ease-in-out hover:scale-110"
              >
                Giriş
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default login;

// ınput component
function Input(props) {
  const { placeholder, value, touched, onChange } = props;

  const handleInputChange = (e) => {
    const value = e.target.value;
    onChange(value);
  };

  return (
    <div>
      <label className="relative block cursor-text w-full">
        <input
          type="text"
          className={`placeholder-[6px] text-xs text-red-600 h-14 w-full peer border  px-4 pt-2 bg-slate-100`}
          required
          value={value}
          onChange={handleInputChange}
        />
        <span className="absolute top-0 left-0 px-4 text-sm flex items-center h-full peer-focus:h-7 peer-focus:text-xs peer-valid:h-7 peer-valid:text-xs transition-all">
          {placeholder}
        </span>
      </label>
    </div>
  );
}
