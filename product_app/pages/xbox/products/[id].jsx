import * as React from "react";
import Image from "next/image";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";
import CancelIcon from "@mui/icons-material/Close";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { ProductContext } from "@/context/context";

const UpdateProduct = (props) => {
  const router = useRouter();
  const { id } = router.query;
  const { product } = useContext(ProductContext);
  const [filteredProduct, setFilteredProduct] = useState([]);
  const [productsProps, setProductProps] = useState({});
  const { setShowEditPage, showEditPage, productId } = props;
  const [updatedImgFile, setUpdatedImageFile] = useState("");
  const [updateImagedSrc, setUpdatedImageSrc] = useState({});
  useEffect(() => {
    if (id && product) {
      // Context'den çektiğiniz datayı `query` id'ye göre filtreleyelim.
      const x = product.filter((item) => item.id === id);
      setFilteredProduct(x);
    }
  }, [id, product]);

  useEffect(() => {
    if (filteredProduct.length > 0) {
      setProductProps({
        id: filteredProduct[0].id,
        title: filteredProduct[0].title,
        description: filteredProduct[0].description,
        price: filteredProduct[0].price,
        category: filteredProduct[0].category,
      });
      setUpdatedImageSrc(filteredProduct[0].img_url);
    }
  }, [filteredProduct]);
  


  
  

  const handleCancel = () => {
    router.push("/xbox/products")    
};

  const handleInputChange = (fieldName, value) => {
    setProductProps({
      ...productsProps,
      [fieldName]: value,
    });
  };

  console.log(productsProps)

  // dosya verisini oku uzantıyı state ata. reader nesnesi...
  const handleFileChange = (changeEvent) => {
    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      setUpdatedImageSrc(onLoadEvent.target.result);
      setUpdatedImageFile(changeEvent.target.files[0]);
    };

    reader.onerror = function (error) {
      console.error("Dosya okuma hatası:", error);
    };

    reader.readAsDataURL(changeEvent.target.files[0]);
  };

  const handleUpdatedProduct = async () => {
    const data = new FormData();
    data.append("file", updatedImgFile);
    data.append("upload_preset", "sensifa");

    if (window.confirm("Ürün güncellensin mi ? ")) {
      try {
        const uploadImg = await axios.post(
          "https://api.cloudinary.com/v1_1/dtar4nbiw/image/upload",
          data
        );

        const { url } = uploadImg.data;

        const productInfo = {
          title: productsProps.title,
          description: productsProps.description,
          ids: productsProps.id,
          price: parseInt(productsProps.price),
          category: productsProps.category,
          img_url: url ? url : updateImagedSrc,
        };

        const postProduct = await axios.put(
          `/api/xbox/${productId}`,
          productInfo
        );
        if (postProduct.status === 200) {
          toast.success("Ürün başarıyla kaydedildi.");
          setUpdatedImageFile("");
          setUpdatedImageSrc("");
        }
      } catch (error) {
        console.error("Hata: ", error);
      }
    }
  };

  return (
    <div className="absolute left-0 top-0 w-full h-full    ">
      <div className="w-full h-full flex justify-center items-center relative">
        <div className="w-[800px] h-[600px] bg-white rounded-xl z-40">
          <div className="w-full h-full">
            <div className="h-[100px] w-full flex justify-evenly items-center">
              <span className="text-[25px] font-semibold">Ürün Düzenle</span>
              <button onClick={handleCancel}>
                <CancelIcon />
              </button>
            </div>
            <div className="w-full max-h-[calc(100vh_-_100px)] ">
              <div className="w-full h-full flex px-10">
                {/* form start */}
                <div className="w-1/2 h-full flex flex-col gap-y-3 px-10">
                  <Input
                    value={productsProps && productsProps.id}
                    placeholder="ID"
                  />
                  <Input
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    value={productsProps && productsProps.title}
                    placeholder="Title"
                  />
                  <Input
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                    value={productsProps && productsProps.description}
                    placeholder="Description"
                  />
                  <Input
                    onChange={(e) => handleInputChange("price", e.target.value)}
                    value={productsProps && productsProps.price}
                    placeholder="Price"
                  />
                  <Input
                    value={productsProps && productsProps.category}
                    placeholder="Category"
                  />
                </div>
                {/* form end */}
                {/* image change start */}
                <div className="w-1/2 h-full">
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
                      {updateImagedSrc && (
                        <div className="ms-14">
                          <img
                            src={updateImagedSrc}
                            alt=""
                            className="w-20 h-20 rounded-full"
                          />
                        </div>
                      )}
                    </label>
                  </div>
                </div>
              </div>
              <div className="w-full h-full flex items-center justify-center py-5">
                <button
                  type="button"
                  onClick={handleUpdatedProduct}
                  className="w-36 py-3 bg-black text-white font-semibold rounded-md hover:bg-blue-300 transition duration-300 ease-in-out hover:scale-110"
                >
                  Kaydet
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-black opacity-25 absolute top-0 left-0 w-full h-full z-10 "></div>
      </div>
    </div>
  );
};

export default UpdateProduct;

function Input(props) {
  const { values, placeholder, touched, errors, ...inputProps } = props;

  return (
    <div>
      <label className="relative block cursor-text w-full">
        <input
          type="text"
          className=" placeholder-[6px] text-xs text-red-600  h-14 w-full peer border outline-none px-4 pt-2 bg-slate-100 "
          required
          {...inputProps}
        ></input>
        <span className="absolute top-0 left-0 px-4 text-sm flex items-center h-full peer-focus:h-7 peer-focus:text-xs peer-valid:h-7 peer-valid:text-xs transition-all">
          {placeholder}
        </span>
      </label>
    </div>
  );
}
