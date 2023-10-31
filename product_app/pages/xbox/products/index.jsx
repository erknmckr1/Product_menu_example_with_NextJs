import * as React from "react";
import Image from "next/image";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import CancelIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import { useState, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import { ProductContext } from "@/context/context";

function Products() {
  const [rowModesModel, setRowModesModel] = useState({});
  const { product } = useContext(ProductContext);
  const [showEditPage, setShowEditPage] = useState(false);
  //const [filteredProduct, setFilteredProduct] = useState();
  const [productId, setProductId] = useState("");
  const router = useRouter();

  // Düzenleme moduna gecırecek event...
  const handleEditClick = (id) => {
    // edit butonuna tıkladııgmız da id yi aldık ve ürünler içinde bu id ile eşleşen ürünü bulduk
    const x = product.filter((item, index) => {
      return item.id === id;
    });
    const confirmed = window.confirm("Are you sure you want to edit the user?");
    if (confirmed) {
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
      setShowEditPage(true);
      // ürün edit sayfasına tıkladıgımız urunun ıd sını gondermek ıcın state'e atıyoruz.
      setProductId(id);
      router.push(`/xbox/products/${id}`);
    }
  };

  const handleCancelClick = (id) => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
  };

  // delete product
  const handleDeleteClick = async (id) => {
    if (window.confirm("Ürün silinsin mi ?")) {
      try {
        const res = await axios.delete(`/api/xbox/${id}`);
        if (res.status === 200) {
          toast.success("Ürün başarıyla silindi.");
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  function EditToolbar() {
    const handleClick = () => {};

    return (
      <GridToolbarContainer>
        <div className="w-full h-full flex justify-evenly items-center">
          <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
            <a href="/xbox">Ürün Ekle</a>
          </Button>
          <input
            placeholder="search"
            className="w-44 text-center h-8 bg-transparent border-b-2 border-black outline-none"
          />
        </div>
      </GridToolbarContainer>
    );
  }
  const columns = [
    { field: "id", headerName: "ID", width: 150 },
    {
      field: "title",
      headerName: "Title",
      width: 200,
      editable: false,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "description",
      headerName: "Description",
      width: 200,
      editable: false,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      width: 200,
      editable: false,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "image",
      headerName: "Image",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 200,
      align: "left",
      headerAlign: "left",
      renderCell: (params) => (
        <img className="h-12" src={params.value} alt="" />
      ),
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 200,
      align: "left",
      headerAlign: "left",
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={() => handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={() => handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  const rows =
    product &&
    product.map((item, index) => {
      return {
        id: item.id,
        title: item.title,
        description: item.description,
        price: item.price,
        image: item.img_url,
      };
    });

  const handleLogout = async () => {
    if (window.confirm("Oturum kapatılsın mı ?")) {
      try {
        const res = await axios.put("/xbox/login");
        if (res.status === 200) {
          toast.success("Oturum başarıyla kapatıldı.");
          router.push("/xbox/login")
        }
      } catch (err) {
        console.log(err);
        toast.success("Oturum kapatılamadı.");
      }
    }
  };

  return (
    <div className="w-screen h-screen relative">
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
            <button className="hover:underline" onClick={handleLogout}>Çıkış Yap</button>
          </div>
        </div>
      </div>
      {/* navbar end */}
      <div className="w-full h-full max-h-[calc(100vh_-_100px)] container mx-auto ">
        <h1 className="text-[30px] sm:px-10 py-3">Ürün Listesi</h1>
        <div className="w-full  flex justify-center  sm:px-10">
          <Box sx={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 10,
                  },
                },
              }}
              slots={{
                toolbar: EditToolbar,
              }}
              pageSizeOptions={[5]}
              checkboxSelection
              disableRowSelectionOnClick
            />
          </Box>
        </div>
      </div>
    </div>
  );
}

export default Products;

export async function getServerSideProps(context) {
  const { req, res } = context;

  // Kullanıcının çerezini kontrol et
  if (!req.headers.cookie || !req.headers.cookie.includes("token")) {
    // Kullanıcı giriş yapmamışsa login sayfasına yönlendir
    return {
      redirect: {
        destination: "/xbox/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
