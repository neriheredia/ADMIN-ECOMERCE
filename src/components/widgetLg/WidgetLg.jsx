import "./widgetLg.css";
import { useState } from "react";
// import { userRequest } from "../../requestMethods";
import { format } from "timeago.js";
import { productRows } from "../../dummyData";

export default function WidgetLg() {
  const [orders, setOrders] = useState(productRows);

  //   useEffect(() => {
  //     const getOrders = async () => {
  //       try {
  //         const res = await userRequest.get("orders");
  //         setOrders(res.data);
  //       } catch (err) {}
  //     };
  //     getOrders();
  //   });
  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest transactions</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Customer</th>
          {/* <th className="widgetLgTh">Date</th> */}
          <th className="widgetLgTh">Amount</th>
          <th className="widgetLgTh">Status</th>
        </tr>
        {orders.map((order) => (
          <tr className="widgetLgTr" key={order.id}>
            <td className="widgetLgUser">
              <span className="widgetLgName">{order.name}</span>
            </td>
            {/* <td className="widgetLgDate">{format(order.createdAt)}</td> */}
            <td className="widgetLgAmount">${order.price}</td>
            <td className="widgetLgStatus">
              <Button type={order.status} />
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}
