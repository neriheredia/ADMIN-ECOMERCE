import "./productList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { deleteProduct, getProducts } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Loading from "../../components/loading/Loading";

export default function ProductList() {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const products = useSelector((state) => state.product.products);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts(dispatch, user?.accessToken).then((response) => {
      setLoading(false);
    });
  }, [dispatch]);

  const handleDelete = (id) => {
    setLoading(true);
    deleteProduct(id, dispatch, user?.accessToken).then((response) => {
      setLoading(false);
      history.push("/products");
    });
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "product",
      headerName: "Product",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.title}
          </div>
        );
      },
    },

    { field: "quantity", headerName: "Quantity", width: 130 },
    { field: "inStock", headerName: "Stock", width: 130 },
    {
      field: "price",
      headerName: "Price",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/product/" + params.row._id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];
  return (
    <div className="productList">
      {loading ? (
        <div className="contentLoading">
          <Loading />
        </div>
      ) : (
        <DataGrid
          rows={products}
          disableSelectionOnClick
          columns={columns}
          getRowId={(row) => row._id}
          pageSize={8}
          checkboxSelection
        />
      )}
    </div>
  );
}
