import {
  createNewOrderRepo,
  getAllMyOrdersRepo,
  getAllOrdersRepo,
  getOrderByIdRepo,
  updateOrderRepo,
} from "../model/order.repository.js";
import { ErrorHandler } from "../../../utils/errorHandler.js";

export const createNewOrder = async (req, res, next) => {
  try {
    const {
      shippingInfo,
      orderedItems,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      paidAt,
    } = req.body;
    if (!shippingInfo || !orderedItems || !paymentInfo) {
      return next(new ErrorHandler("Invalid order data provided", 400));
    }
    if (orderedItems.length === 0) {
      return next(
        new ErrorHandler("Order must include at least one item", 400)
      );
    }
    const orderData = {
      shippingInfo,
      orderedItems,
      user: req.user._id,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      paidAt,
    };
    const newOrder = await createNewOrderRepo(orderData);
    return res.status(201).json({
      success: true,
      message: "Order placed successfully!",
      order: newOrder,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Error while placing your order!",
    });
  }
};

export const getSingleOrder = async (req, res, next) => {
  const { id } = req.params;
  try {
    const order = await getOrderByIdRepo(id);
    return res.status(200).json({
      success: true,
      order: order,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while getting the order!",
    });
  }
};

export const getMyOrders = async (req, res, next) => {
  try {
    if (!req.user._id) {
      return next(new ErrorHandler("User not authorized", 401));
    }
    const userId = req.user._id;
    if (!userId) {
      return next(new ErrorHandler("User not authorized", 401));
    }

    const orders = await getAllMyOrdersRepo(userId);
    return res.status(200).json({
      success: true,
      orders: orders,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while getting your orders!",
    });
  }
};

export const getAllOrders = async (req, res, next) => {
  try {
    const orders = await getAllOrdersRepo();
    return res.status(200).json({
      success: true,
      orders: orders,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while getting all orders!",
    });
  }
};

export const updateOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedOrderData = req.body;
    const updatedOrder = await updateOrderRepo(id, updatedOrderData);
    return res.status(200).json({
      success: true,
      message: "Order updated successfully!",
      order: updatedOrder,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Error while updating the order!",
    });
  }
};
