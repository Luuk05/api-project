import { Link, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import "../styles.css";
import React, { useState, useEffect } from "react";

export let Page = () => {
  const { page } = useParams();
  let [input, setInput] = useState(page);
  let [coins, setCoins] = useState([]);

  // Wanneer onderstaand niet wordt gebruikt krijg ik een infinite loop
  const location = useLocation();
  useEffect(() => {
    setInput(page);
  }, [location]);

  console.log(page, input, 1);

  useEffect(() => {
    axios
      .get(
        `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=100&tsym=USD&page=${
          input - 1
        }`
      )
      .then((data) => {
        setCoins(data.data.Data);
      });
  }, [input]);

  return (
    <div className="container">
      <div className="pagination">
        <Link to={"/" + (parseInt(page) === 1 ? 1 : parseInt(page) - 1)}>
          {parseInt(page) === 1 ? "-" : parseInt(page) - 1}
        </Link>
        <Link className="current-page" to={"/" + page}>
          {page}
        </Link>
        <Link to={"/" + (parseInt(page) === 7 ? 7 : parseInt(page) + 1)}>
          {parseInt(page) === 7 ? "-" : parseInt(page) + 1}
        </Link>
      </div>

      {coins.map((coin, index) => {
        try {
          return (
            <div className="row" key={index}>
              <div>
                <img
                  src={"https://www.cryptocompare.com/" + coin.RAW.USD.IMAGEURL}
                />
              </div>
              <h4>{coin.CoinInfo.FullName}</h4>
              <h5 className={coin.RAW.USD.CHANGEPCTDAY > 0 ? "green" : "red"}>
                {coin.RAW.USD.CHANGEPCTDAY.toFixed(2)}%
              </h5>
              <p>&euro; {coin.RAW.USD.PRICE.toFixed(2)},-</p>
            </div>
          );
        } catch (e) {
          console.log("Error als de api niets kan ophalen");
        }
      })}
    </div>
  );
};
