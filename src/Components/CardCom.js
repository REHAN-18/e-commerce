import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CardActions from "@mui/material/CardActions";

export default function ProductCard({
  id,
  title,
  price,
  img,
  describe,
  isInWishList,
  isInCart,
  handleWishList,
  handleCart,
}) {
  const [open, setOpen] = useState(false);
  // console.log(val);
  const handleModalToggle = () => {
    setOpen(!open);
  };
  // const handleAddToCart = () => {
  //   const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  //   const newItem = { id, title, price, img, describe };
  //   const updatedCartItems = [...cartItems, newItem];
  //   localStorage.setItem('cart', JSON.stringify(updatedCartItems));
  //   alert("Product added to cart!");
  // };
  return (
    <>
      {/* Card Layout */}
      <Card
        sx={{
          minHeight: "400px",
          height: "100%",
          maxWidth: "400px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          alignItems: "center",
          borderRadius: "15px",
          margin: "20px auto",
          padding: "30px 25px",
        }} // Updated styles
        className="card-hover"
      >
        <CardActionArea
          onClick={handleModalToggle}
          sx={{
            minHeight: "200px",
            height: "100%",
            marginBottom: "10px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          {/* Image of Product */}
          <CardMedia
            component="img"
            height="120" // Adjust this height as needed
            image={img}
            alt={title}
            style={{
              objectFit: "contain",
              width: "100%",
              borderTopLeftRadius: "15px", // Rounded corners
              borderTopRightRadius: "15px",
            }}
          />
          <CardContent sx={{ height: "200px" }}>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              align="center"
            >
              {title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                height: "80px",
                overflow: "hidden",
                mb: 1,
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: 4,
                WebkitBoxOrient: "vertical",
              }}
              align="center"
            >
              {describe}
            </Typography>
            <Typography variant="h6" color="success.main" align="center">
              {price}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions sx={{ justifyContent: "center", padding: "16px" }}>
          <button className="btngg addmore" onClick={handleModalToggle}>
            More Info
          </button>
          <button
            className="btngg addwhis"
            onClick={() => handleWishList({ id, title, price, img, describe })}
          >
            {isInWishList ? "Remove" : "Add to Wishlist"}
          </button>
          <button
            className="btngg addcart"
            onClick={() => handleCart({ id, title, price, img, describe })}
          >
            {isInCart ? "Remove from Cart" : "Add to Cart"}
          </button>
        </CardActions>
      </Card>

      {/* Modal/Dialog */}
      <Dialog open={open} onClose={handleModalToggle} maxWidth="md" fullWidth>
        <DialogTitle sx={{ pb: 2 }} align="center">
          {title}
        </DialogTitle>
        <DialogContent>
          <CardMedia
            component="img"
            height="250"
            image={img}
            alt={title}
            style={{
              objectFit: "contain",
              width: "100%",
              borderRadius: "15px",
            }}
          />
          <b>Details:</b>
          <Typography variant="body1" sx={{ mt: 2 }} align="center">
            {describe}
          </Typography>
          <br />
          <b>Price:</b>
          <Typography
            variant="h5"
            color="success.main"
            sx={{ mt: 2 }}
            align="center"
          >
            {price}
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", padding: "16px" }}>
          <button
            className="custom-button"
            onClick={handleModalToggle}
            style={{
              marginBottom: "10px",
            }}
          >
            Close
          </button>
          <button
            className="custom-button"
            onClick={handleModalToggle}
            style={{ backgroundColor: "blue", marginBottom: "10px" }}
          >
            Chat with Seller
          </button>
        </DialogActions>
      </Dialog>
    </>
  );
}
