import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "./CardCom";

const Main = ({ filteredProducts, setQuery }) => {
  const [sortType, setSortType] = useState("");
  const [sortedProducts, setSortedProducts] = useState([...filteredProducts]);
  const [wishList, setWishList] = useState([]);
  const [cart, setCart] = useState([]);
  const [priceRange, setPriceRange] = useState({ lower: 0, upper: Infinity });

  const navigate = useNavigate();

  useEffect(() => {
    const storedWishlist = localStorage.getItem("wishlist");
    const storedCart = localStorage.getItem("cart");

    if (storedWishlist) {
      setWishList(JSON.parse(storedWishlist));
    } else {
      setWishList([]);
    }

    if (storedCart) {
      setCart(JSON.parse(storedCart));
    } else {
      setCart([]);
    }
  }, []);

  const handleWishList = (product) => {
    const isPresent = wishList.some((item) => item.id === product.id);

    if (isPresent) {
      const newList = wishList.filter((item) => item.id !== product.id);
      setWishList(newList);
      localStorage.setItem("wishlist", JSON.stringify(newList));
    } else {
      const newList = [...wishList, product];
      setWishList(newList);
      localStorage.setItem("wishlist", JSON.stringify(newList));
    }
  };

  const handleCart = (product) => {
    const isPresent = cart.some((item) => item.id === product.id);
    const newList = isPresent
      ? cart.filter((item) => item.id !== product.id)
      : [...cart, product];

    setCart(newList);
    localStorage.setItem("cart", JSON.stringify(newList));
  };

  const parsePrice = (priceStr) => {
    return Number(priceStr.replace(/[^0-9.-]+/g, ""));
  };

  useEffect(() => {
    let sortedArray = [...filteredProducts];

    // Filter products based on price range
    sortedArray = sortedArray.filter((product) => {
      const price = parsePrice(product.price);
      return price >= priceRange.lower && price <= priceRange.upper;
    });

    switch (sortType) {
      case "priceLowToHigh":
        sortedArray.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
        break;
      case "priceHighToLow":
        sortedArray.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
        break;
      default:
        sortedArray = [...filteredProducts];
    }

    const updatedArray = sortedArray.map((product) => ({
      ...product,
      isInWishlist: wishList.some((item) => item.id === product.id),
      isInCart: cart.some((item) => item.id === product.id),
    }));

    setSortedProducts(updatedArray);
  }, [wishList, cart, sortType, filteredProducts, priceRange]);

  const handleSortChange = (e) => {
    const value = e.target.value;
    switch (value) {
      case "1":
        setSortType("priceLowToHigh");
        break;
      case "2":
        setSortType("priceHighToLow");
        break;
      default:
        setSortType("");
    }
  };

  const handlePriceRangeChange = (e) => {
    const { name, value } = e.target;
    setPriceRange((prevRange) => ({
      ...prevRange,
      [name]: value ? Number(value) : (name === "lower" ? 0 : Infinity),
    }));
  };

  return (
    <main>
      <div className="select-btn">
        <button className="sell-btn">Sell</button>
        <button
          className="wishlist-btn"
          onClick={() => {
            navigate("/wishlist");
          }}
        >
          Wishlist
        </button>
      </div>
      <div className="select-btn">
        <select
          className="form-select"
          onChange={handleSortChange}
          style={{ width: "200px" }}
        >
          <option selected>Sort By</option>
          <option value="1">Price: Low to High</option>
          <option value="2">Price: High to Low</option>
        </select>
      </div>
      <div className="price-range-inputs">
        <input
          type="number"
          name="lower"
          placeholder="Lower bound"
          onChange={handlePriceRangeChange}
        />
        <input
          type="number"
          name="upper"
          placeholder="Upper bound"
          onChange={handlePriceRangeChange}
        />
      </div>
      <div className="product-cards">
        {sortedProducts.map((product) => (
          <Card
            key={product.val}
            val={product.val}
            id={product.id}
            title={product.title}
            price={product.price}
            describe={product.describe}
            img={product.img}
            isInWishList={product.isInWishlist}
            isInCart={product.isInCart}
            handleWishList={() => handleWishList(product)}
            handleCart={() => handleCart(product)}
          />
        ))}
      </div>
    </main>
  );
};

export default Main;