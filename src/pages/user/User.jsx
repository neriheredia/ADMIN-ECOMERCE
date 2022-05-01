import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
} from "@material-ui/icons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import { updateUser } from "../../redux/apiCalls";
import "./user.css";

export default function User() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const userId = location.pathname.split("/")[2];
  const token = useSelector((state) => state.user.currentUser.accessToken);
  const user = useSelector((state) =>
    state.users.users.filter((u) => u._id === userId)
  );
  const [box, setBox] = useState(false);
  const [inputs, setInputs] = useState({
    username: "" || user[0].username,
    email: "" || user[0].email,
    password: "" || user[0].password,
    box: false,
  });

  const handleChangeInputs = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeBox = (e) => {
    setBox(!box);
    setInputs({
      ...inputs,
      box: !box,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      updateUser(dispatch, userId, inputs, token).then((response) => {
        history.push("/users");
      });
    } catch (err) {
      console.log(err);
    }
  };
  console.log(user);
  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
        <Link to="/newUser">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src={
                user[0].img ||
                "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
              }
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{user[0].username}</span>
              <span className="userShowUserTitle">{user[0].email}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{user[0].username}</span>
            </div>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">{user[0].createdAt}</span>
            </div>
            <span className="userShowTitle">{user.isAdmin}</span>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{user[0].email}</span>
            </div>
            <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle">
                {user[0].isAdmin === false ? "NO" : "YES"}
              </span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm" onSubmit={handleSubmit}>
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  placeholder="username..."
                  className="userUpdateInput"
                  onChange={handleChangeInputs}
                />
              </div>
              <div className="userUpdateItem">
                <label>Password </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Passwrod..."
                  className="userUpdateInput"
                  onChange={handleChangeInputs}
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  email="email"
                  placeholder="muestra@gmail.com"
                  className="userUpdateInput"
                  onChange={handleChangeInputs}
                />
              </div>
              <div className="userUpdateBox">
                <label>isAdmin</label>
                <input
                  type="checkbox"
                  className="userUpdateBox"
                  onChange={handleChangeBox}
                />
              </div>
            </div>
            <div className="userUpdateRight">
              <button className="userUpdateButton">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
