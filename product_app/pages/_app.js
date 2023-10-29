import "@/styles/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProductProvider } from "@/context/context";
export default function App({ Component, pageProps }) {
  return (
    <>
    <ProductProvider>
      <ToastContainer />
      <Component {...pageProps} />
    </ProductProvider>
    </>
    
  );
}
