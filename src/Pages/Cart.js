import React, { useEffect, useState } from "react";

import icon from "../Assets/Images/Vector.svg";
import BuyCards from "../Components/Buycards";

import axios from "axios";
import { useParams, useLocation, Route } from "react-router";

const Cart = () => {
  var total = 0;
  const [Products, setProducts] = useState([]);
  const { id } = useParams();

  const setToCart = (name, price) => {
    const find = Products.findIndex((product) => product.prashad === name);
    if (find == -1) {
      setProducts([
        ...Products,
        {
          prashad: name,
          price: price,
          quantity: 1,
          total: price,
        },
      ]);
    }
  };

  if (id == 12) {
    setToCart("सवामणि", 5100);
  } else if (id == 13) {
    setToCart("छप्पन भोग", 3100);
  } else if (id == 14) {
    setToCart("पान भोग", 2100);
  } else if (id == 15) {
    setToCart("ड्राईफ्रुट भोग", 7100);
  } else if (id == 16) {
    setToCart("प्रति फूल", 5);
  } else {
    setProducts({});
  }

  const updateIncProd = (prod) => {
    const filter = Products.findIndex(
      (product) => product.prashad === prod.prashad
    );
    const newProduct = Products.slice();
    newProduct[filter].quantity = newProduct[filter].quantity + 1;
    newProduct[filter].total =
      newProduct[filter].total + newProduct[filter].price;
    setProducts(newProduct);
  };

  const updateDecProduct = (prod) => {
    const filter = Products.findIndex(
      (product) => product.prashad === prod.prashad
    );
    const newProduct = Products.slice();

    newProduct[filter].quantity = newProduct[filter].quantity - 1;

    if (newProduct[filter].quantity == 0) {
      newProduct.splice(filter, 1);
      setProducts(newProduct);
    } else {
      if (
        newProduct[filter].quantity != 1 ||
        newProduct[filter].total != newProduct[filter].price
      ) {
        newProduct[filter].total =
          newProduct[filter].total - newProduct[filter].price;

        setProducts(newProduct);
      }
    }
  };

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  const handlePayment = async () => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const result = await axios({
      method: "post",
      url: "https://razorpay.pythonanywhere.com/payment/order/",
      data: {
        amount: total, // This is the body part
      },
    });

    console.log(result);

    // // creating a new order
    // const result = await axios.post(
    //   "http://razorpay.pythonanywhere.com/payment/order"
    // );

    if (!result) {
      alert("Server error. Are you online?");
      return;
    }

    // Getting the order details back
    const { amount, id, currency } = result.data.order_dict;

    const options = {
      key: "rzp_live_RnvqF57YUkL6zb", // Enter the Key ID generated from the Dashboard
      amount: amount,
      currency: currency,
      order_id: id,
      handler: async function (response) {
        const data = {
          orderCreationId: id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };

        const result = await axios.post(
          "https://razorpay.pythonanywhere.com/payment/success",
          data
        );

        alert(result.data.msg);
      },
      prefill: {
        name: "Soumya Dey",
        email: "SoumyaDey@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Soumya Dey Corporate Office",
      },
      theme: {
        color: "#61dafb",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  if (Products) {
    Products.map((prod) => {
      total = total + prod.total;
    });
  }

  return (
    <div className="cart mt-5">
      <div className="row">
        <div className="col-12">
          <div className="cart d-flex">
            <div className="icon" style={{ marginRight: "20px" }}>
              <img src={icon} className="img-fluid" alt="" />
            </div>
            <div className="text">
              <h2 className="text-cart">कार्ट</h2>
            </div>
          </div>
        </div>
        <div className="table-main text-dark mt-5">
          <table className="table">
            <thead>
              <tr style={{ letterSpacing: "0.155em" }}>
                <th scope="col">प्रसादो</th>
                <th scope="col">कीमत</th>
                <th scope="col">मात्रा</th>
                <th scope="col">कुल</th>
              </tr>
            </thead>
            <tbody
              style={{
                fontWeight: "bold",
                fontSize: "30px",
                lineHeight: "35px",
                color: "#EF2A34",
              }}
            >
              {Products.map((product) => (
                <tr>
                  <td>{product.prashad}</td>
                  <td>{product.price}</td>
                  <td>
                    <i
                      className="fas fa-minus"
                      onClick={() => {
                        updateDecProduct(product);
                      }}
                    ></i>
                    {product.quantity}
                    <i
                      className="fas fa-plus"
                      onClick={() => {
                        updateIncProd(product);
                      }}
                    ></i>
                  </td>
                  <td>{product.total} /-</td>
                </tr>
              ))}
              <tr
                style={{
                  fontWeight: "bold",
                  fontSize: "30px",
                  lineHeight: "35px",
                  color: "#000",
                }}
              >
                <td>कुल राशि</td>
                <td></td>
                <td></td>
                <td>{total} /-</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="proceed mt-5">
          <div className="row">
            <div className="col-12 text-center">
              <button className="proceed-to-pay" onClick={handlePayment}>
                चुकाने के लिए कार्रवाई शुरू करो
              </button>
            </div>
          </div>
        </div>

        <div
          className="similary"
          style={{ marginTop: "150px", fontWeight: "900" }}
        >
          <h3
            className="mb-2"
            style={{
              fontSize: "32px",
              lineHeight: "36px",
              letterSpacing: "0.155em",
            }}
          >
            Similary
          </h3>

          <div className="cards-buy mt-5 pt-3">
            <div className="d-flex  flex-row flex-box-all gy-5 gx-3 justify-content-between flex-wrap">
              <div className="flex-item ">
                <BuyCards name="सवामणि" price={5100} setToCart={setToCart} />
              </div>
              <div className="flex-item ">
                <BuyCards name="छप्पन भोग" price={3100} setToCart={setToCart} />
              </div>
              <div className="flex-item ">
                <BuyCards name="पान भोग" price={2100} setToCart={setToCart} />
              </div>
              <div className="flex-item ">
                <BuyCards
                  name="ड्राईफ्रुट भोग"
                  price={7100}
                  setToCart={setToCart}
                />
              </div>
              <div className="flex-item ">
                <BuyCards name="प्रति फूल" price={5} setToCart={setToCart} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
