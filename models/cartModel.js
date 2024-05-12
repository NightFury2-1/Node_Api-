const mongoose = require("mongoose");

const cartSchema = mongoose.Schema(
  {
    prdid: {
      type: Number,
      required: true,
    },
    qty: {
      type: Number,
      required: true,
    },
    amt: {
      type: Number,
      required: true,
    },
    sts: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamp: true,
  }
);

const Cart = mongoose.model("Cart", cartSchema);
module.export = Cart;
