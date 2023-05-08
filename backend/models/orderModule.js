const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  items: [
    {
      productId: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  shippingAddress: {
    fullName: {
      type: String,
      required: true,
    },
    phoneNo1: {
      type: Number,
      required: true,
    },
    phoneNo2: {
      type: Number,
    },
    pincode: {
      type: Number,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    houseNo: {
      type: String,
      required: true,
    },
    area: {
      type: String,
      required: true,
    },
    landmark: {
      type: String,
    },
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  paymentId: {
    type: String,
    default: null,
  },
  paymentStatus: {
    type: String,
    default: "Not paid",
  },
  shippingPrice: {
    type: Number,
    default: 75,
  },
  isPaid: {
    type: Boolean,
    required: true,
  },
  paidAt: {
    type: Date,
    default: Date.now,
  },
  orderStatus: {
    type: String,
    default: "On the way",
  },
  isDelivered: {
    type: Boolean,
    default: false,
  },
  deliveredAt: {
    type: Date,
  },
  recievePayment: {
    type: String,
    default: "No",
  },
  upToDate: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Order", orderSchema);
