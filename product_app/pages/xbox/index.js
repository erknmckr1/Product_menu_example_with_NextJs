import React from "react";
import { useState } from "react";

function Index() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
  });
  const [imageSrc, setImageSrc] = useState();
  const [imageFile, setImageFile] = useState();
  const [touchedFields, setTouchedFields] = useState({}); // Touched durumları için kullanılan bir nesne

  const handleInputChange = (fieldName, value) => {
    setFormData({
      ...formData,
      [fieldName]: value,
    });

    // Alanın dokunduğunu işaretlemek için touchedFields nesnesini güncelleyin
    setTouchedFields({
      ...touchedFields,
      [fieldName]: true,
    });
  };

 

  //! FileReader
  const handleFileChange = (changeEvent) => {
    const reader = new FileReader();

    //! Gelen dosyayı base64 formatında oku
    reader.readAsDataURL(changeEvent.target.files[0]);

    reader.onload = function (onLoadEvent) {
      setImageSrc(onLoadEvent.target.result);
      setImageFile(changeEvent.target.files[0]);
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Gönderilen Veriler:", formData);
  };

  return (
    <div className="w-screen h-screen">
      <div className="w-full h-full flex justify-center items-center">
        <div className="w-[800px] h-[800px] border-4 border-black">
          <div className="p-5 w-full h-auto text-center">
            <span className="text-[30px] lg:text-[40px]">xyz</span>
          </div>
          <form
            className="w-full px-10 h-auto bg-slate-100"
            onSubmit={handleSubmit}
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
            {/* upload ımage... */}
            <div className="flex w-full py-5 ">
              <label className="flex gap-2 items-center">
                <input
                  type="file"
                  onChange={(e) => handleFileChange(e)}
                  className="hidden"
                />
                <button className="btn p-3 bg-black text-white pointer-events-none rounded-md hover:bg-blue-300 transition duration-300 ease-in-out hover:scale-110">
                  Choose an Image
                </button>
                {imageSrc && (
                  <div>
                    {/*eslint-disable-next-line @next/next/no-img-element*/}
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
                className="w-36 py-3 bg-black  text-white font-semibold rounded-md hover:bg-blue-300 transition duration-300 ease-in-out hover:scale-110"
              >
                Gönder
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
