import React from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function Index() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
  });

  const [imageSrc, setImageSrc] = useState();
  const [imageFile, setImageFile] = useState();
  const [touchedFields, setTouchedFields] = useState({});

  const handleInputChange = (fieldName, value) => {
    setFormData({
      ...formData,
      [fieldName]: value,
    });

    setTouchedFields({
      ...touchedFields,
      [fieldName]: true,
    });
  };

  const handleFileChange = (changeEvent) => {
    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      setImageSrc(onLoadEvent.target.result);
      setImageFile(changeEvent.target.files[0]);
    };

    reader.onerror = function (error) {
      console.error("Dosya okuma hatası:", error);
    };

    reader.readAsDataURL(changeEvent.target.files[0]);
  };

  const createProduct = async (e) => {
    e.preventDefault();
    const number = Math.floor(Math.random()*99999) + 1

    // FormData nesnesi oluştur
    const data = new FormData();
    data.append("file", imageFile);
    data.append("upload_preset", "sensifa");

    try {
      const uploadImg = await axios.post(
        "https://api.cloudinary.com/v1_1/dtar4nbiw/image/upload",
        data
      );

      const { url } = uploadImg.data;

      const productInfo = {
        title: formData.title,
        description: formData.description,
        id:number,
        price: parseInt(formData.price),
        category: formData.category,
        img_url: url,
      };

      const postProduct = await axios.post("/api/xbox", productInfo);
      if (postProduct.status === 200) {
        toast.success("Ürün başarıyla kaydedildi.");
        setFormData({
          title: "",
          description: "",
          price: "",
          category: "",
        });
        setImageFile("");
        setImageSrc("");
      }
    } catch (error) {
      console.error("Hata: ", error);
    }
  };

  return (
    <div className="w-screen h-screen">
      {/* navbar */}
      <div className="h-[100px] w-full px-2 sm:p-0 bg-gray-300 flex justify-between ">
        <div className="sm:w-2/3 h-full flex justify-center items-center">
          <span className="text-[30px]">LOGO</span>
        </div>
      </div>
      <div className="w-full h-full max-h-[calc(100vh_-_100px)] flex justify-center items-center">
        <div className="w-[800px] h-[800px] border-y-4  border-black">
          <div className="p-5 w-full h-auto text-center">
            <span className="text-[30px] lg:text-[40px]">xyz</span>
          </div>
          <form
            className="w-full px-10 h-auto bg-slate-100"
            onSubmit={createProduct}
          >
            <div className="w-full h-auto flex flex-col gap-y-4">
              <Input
                placeholder="Title"
                value={formData.title}
                touched={touchedFields.title}
                onChange={(value) => handleInputChange("title", value)}
              />
              <Input
                placeholder="Category"
                value={formData.category}
                touched={touchedFields.category}
                onChange={(value) => handleInputChange("category", value)}
              />
              <Input
                placeholder="Description"
                value={formData.description}
                touched={touchedFields.description}
                onChange={(value) => handleInputChange("description", value)}
              />
              <Input
                placeholder="Price"
                value={formData.price}
                touched={touchedFields.price}
                onChange={(value) => handleInputChange("price", value)}
              />
            </div>
            <div className="flex w-full py-5">
              <label className="flex gap-2 items-center">
                <input
                  type="file"
                  onChange={(e) => handleFileChange(e)}
                  className="hidden"
                />
                <button className="btn p-3 bg-black text-white pointer-events-none rounded-md hover:bg-blue-300 transition duration-300 ease-in-out hover:scale-110">
                  Fotoğraf Seç
                </button>
                {imageSrc && (
                  <div>
                    <img
                      src={imageSrc}
                      alt=""
                      className="w-12 h-12 rounded-full"
                    />
                  </div>
                )}
              </label>
            </div>
            <div className="w-full h-auto flex justify-center items-center mt-4">
              <button
                type="submit"
                className="w-36 py-3 bg-black text-white font-semibold rounded-md hover:bg-blue-300 transition duration-300 ease-in-out hover:scale-110"
              >
                Ekle
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Index;

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
