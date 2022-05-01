import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { publicRequest } from "../../requestMethods";
import { useSelector } from "react-redux";

export default function WidgetSm() {
  const [users, setUsers] = useState([]);
  const user = useSelector((state) => state.user.currentUser);
  const token = user?.accessToken || null;

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await publicRequest.get("users/?new=true", {
          headers: {
            token: `Bearer ${token}`,
          },
        });
        setUsers(res.data);
      } catch (err) {}
    };
    getUsers();
  }, []);

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {users?.map((user) => (
          <li className="widgetSmListItem" key={user._id}>
            <img
              src={
                user.img ||
                "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
              }
              alt=""
              className="widgetSmImg"
            />
            <div className="widgetSmUser">
              <span className="widgetSmUsername">{user.username}</span>
            </div>
            <button className="widgetSmButton">
              <Visibility className="widgetSmIcon" />
              Display
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
