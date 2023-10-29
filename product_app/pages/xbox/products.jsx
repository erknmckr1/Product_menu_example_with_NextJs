import * as React from "react";
import Image from "next/image";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
 import CancelIcon from "@mui/icons-material/Close";
import Checkbox from "@mui/material/Checkbox";
import { toast } from "react-toastify";
import { useState, useContext } from "react";
import axios from "axios";
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
  console.log(rowModesModel)
  // Düzenleme moduna gecırecek event...
  const handleEditClick = (id) => {
    const confirmed = window.confirm("Are you sure you want to edit the user?");
    if (confirmed) {
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    }
  };

  const handleCancelClick = (id) =>{
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
  }

  // delete product 
  const handleDeleteClick = async (id) => {
    if(window.confirm("Ürün silinsin mi ?")){
      try {
        const res = await axios.delete(`/api/xbox/${id}`)
        if(res.status === 200){
          toast.success("Ürün başarıyla silindi.")
        }
      } catch (err) {
        console.log(err)
      }
    }
  }

  const handleSaveClick = () => {

  }

  function EditToolbar() {
    const handleClick = () => {};

    return (
      <GridToolbarContainer>
        <div className="w-full h-full flex justify-evenly items-center">
          <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
            Add record
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
      width: 150,
      editable: false,
    },
    {
      field: "description",
      headerName: "Description",
      width: 150,
      editable: false,
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      width: 150,
      editable: false,
    },
    {
      field: "image",
      headerName: "Image",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 250,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 200,
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
          <GridActionsCellItem
            icon={<SaveIcon />}
            label="Save"
            sx={{
              color: "primary.main",
            }}
            onClick={() => handleSaveClick(id)}
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

  return (
    <div className="w-screen h-screens">
      {/* navbar */}
      <div className="h-[100px] w-full px-2 sm:p-0 bg-gray-300 flex justify-between ">
        <div className="sm:w-2/3 h-full flex justify-center items-center ">
          <Image
            className="w-[120px] p-1"
            alt=""
            src="/remove_logo.png"
            width={200}
            height={200}
          />
        </div>
      </div>
      {/* navbar end */}
      <div className="w-full h-full max-h-[calc(100vh_-_100px)] ">
        <div className="w-full h-full flex justify-center  sm:px-10">
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
