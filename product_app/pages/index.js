import { product } from "@/product";
import Image from "next/image";
import { categories } from "@/product";
import { useState, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import axios from "axios";

export default function Home() {
  const [clickedCategory, setClickedCategory] = useState("All");
  const [searchText, setSearchText] = useState("");
  const [openInput, setOpenInput] = useState(false);
  const [filteredProduct, setFilteredProduct] = useState([]);
  const [products,setProducts] = useState([])
   // get products
   useEffect(()=>{
    const getProduct = async () => {
      try {
        const res = await axios.get("/api/xbox")
        setProducts(res.data)
      } catch (err) {
          console.log(err)
      }
    }
    getProduct();
  },[])

  useEffect(() => {
    const updatedProduct = product.filter((item) => {
      if (
        (clickedCategory === "All" || item.category === clickedCategory) &&
        (searchText === "" ||
          item.title.toLowerCase().includes(searchText.toLowerCase()))
      ) {
        return true;
      }
      return false;
    });

    setFilteredProduct(updatedProduct);
  }, [clickedCategory, searchText]);

 
  
  return (
    <div className="w-screen h-screen">
      {/* navbar start */}
      <div className="h-[100px] w-full px-2 sm:p-0 bg-gray-300 flex justify-between ">
        <div className="sm:w-2/3 h-full flex justify-center items-center">
          <span className="text-[30px]">LOGO</span>
        </div>
        <div className="sm:w-1/3 h-full flex justify-center items-center">
          <input
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Arama"
            className={`${
              openInput === false
                ? "text-center hidden sm:block outline-none bg-transparent border-b-4 border-black"
                : "text-center sm:block outline-none bg-transparent border-b-4 border-black"
            } `}
          />
          <button
            onClick={() => setOpenInput(!openInput)}
            className="block sm:hidden"
          >
            <BsSearch />
          </button>
        </div>
      </div>
      {/* navbar end */}
      <div className="w-full h-full max-h-[calc(100vh_-_100px)]">
        <div className="w-full mx-auto container">
          {/* buttons */}
          <div className="w-full h-full pt-5">
            <div className="w-auto h-full flex gap-x-3 items-center justify-center">
              {categories.map((item, index) => (
                <button
                  onClick={() => setClickedCategory(item)}
                  key={index}
                  className={` ${
                    clickedCategory === item
                      ? "outline px-7 py-2 border border-1 hover:outline ease-in duration-100"
                      : "px-7 py-2 border border-1 hover:outline ease-in duration-100"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          {/* product cards */}
          <div className="w-full h-full mt-5 p-2 ">
            <div className="w-full h-full flex flex-wrap gap-x-3 gap-y-3 ">
              {filteredProduct &&
                filteredProduct.map((item, index) => (
                  <div key={index} className="w-[700px] h-auto   ">
                    <div className="flex w-full h-full">
                      {/* image */}
                      <div className="w-1/3 h-[200px] border border-1 flex items-center justify-center rounded-xl border-4 border-black">
                        <Image height={200} width={200} alt="" src="next.svg" />
                      </div>
                      {/* product information */}
                      <div className="w-2/3 h-full p-5">
                        <div className="w-full h-full flex flex-col">
                          {/* title & price */}
                          <div className="flex justify-between items-center border-b-2 border-black">
                            <span className="text-red-400 text-[20px] sm:text-[25px]">
                              {item.title}
                            </span>
                            <span className="font-semibold">
                              {item.price} £
                            </span>
                          </div>
                          {/* desc */}
                          <div className="w-full h-full flex justify-center items-center">
                            <span>{item.desc}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// export const getServerSideProps  = async () => {
//   const products = await axios.get(`api/xbox`);
//   return{
//     props:{
//       productList : products.data ? products.data : [],
//     }
//   }
// }