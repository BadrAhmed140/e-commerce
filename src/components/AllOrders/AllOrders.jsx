import React, { useEffect, useState,useContext } from 'react'
import styles from './AllOrders.module.css'

import { CartContext } from '../../context/CartContext';
import { UserTokenContext } from '../../context/userTokenContext';
import { jwtDecode } from 'jwt-decode';



export default function AllOrders() {


let {getAllOrder}=useContext(CartContext);
let [orders,setOrders]=useState([]);


async function getOrders(){
let decode =jwtDecode(localStorage.getItem("token"));
let res =await getAllOrder(decode.id);
console.log(res ,"res");
setOrders(res.data);
}
useEffect(()=>{getOrders()},[])

  return (
    <div className="container mx-auto p-4">
    <h1 className="text-3xl font-extrabold mb-8 text-center text-indigo-600">
      All Orders
    </h1>
    {orders.map((order) => (
      <div
        key={order._id}
        className="bg-gradient-to-r from-blue-50 to-white shadow-lg rounded-lg p-6 mb-8 border border-blue-200"
      >
        <h2 className="text-xl font-bold text-blue-700 mb-4">
          Order #{order.id}
        </h2>
        <div className="mb-4">
          <p className="text-gray-800">
            <span className="font-semibold text-indigo-600">Customer:</span>{" "}
            {order.user.name} ({order.user.email})
          </p>
          <p className="text-gray-800">
            <span className="font-semibold text-indigo-600">Phone:</span>{" "}
            {order.user.phone}
          </p>
        </div>
        <div className="mb-4">
          <p className="text-gray-800">
            <span className="font-semibold text-indigo-600">
              Shipping Address:
            </span>{" "}
            {order.shippingAddress.details}, {order.shippingAddress.city}
          </p>
        </div>
        <div className="mb-4">
          <p className="text-gray-800">
            <span className="font-semibold text-indigo-600">
              Payment Method:
            </span>{" "}
            {order.paymentMethodType}
          </p>
          <p className="text-gray-800">
            <span className="font-semibold text-indigo-600">Paid:</span>{" "}
            {order.isPaid ? (
              <span className="text-green-600 font-medium">
                Yes (Paid at: {new Date(order.paidAt).toLocaleString()})
              </span>
            ) : (
              <span className="text-red-600 font-medium">No</span>
            )}
          </p>
          <p className="text-gray-800">
            <span className="font-semibold text-indigo-600">
              Delivered:
            </span>{" "}
            {order.isDelivered ? (
              <span className="text-green-600 font-medium">Yes</span>
            ) : (
              <span className="text-red-600 font-medium">No</span>
            )}
          </p>
        </div>
        <p className="font-bold text-gray-900 mb-4">
          Total Price:{" "}
          <span className="text-blue-600">${order.totalOrderPrice}</span>
        </p>
        <h3 className="text-lg font-semibold text-indigo-500 mb-2">
          Cart Items:
        </h3>
        <ul className="space-y-3">
          {order.cartItems.map((item) => (
            <li
              key={item._id}
              className="bg-white p-4 rounded-lg border border-gray-300 shadow-sm hover:shadow-md transition-shadow"
            >
              <p className="text-gray-800">
                <span className="font-semibold text-blue-600">Product:</span>{" "}
                {item.product.name}
              </p>
              <p className="text-gray-800">
                <span className="font-semibold text-blue-600">Price:</span>{" "}
                ${item.price}
              </p>
              <p className="text-gray-800">
                <span className="font-semibold text-blue-600">
                  Quantity:
                </span>{" "}
                {item.count}
              </p>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-gray-600">
          <span className="font-semibold text-indigo-600">
            Order Created:
          </span>{" "}
          {new Date(order.createdAt).toLocaleString()}
        </p>
      </div>
    ))}
  </div>
  )
}
