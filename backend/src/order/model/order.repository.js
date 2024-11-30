import OrderModel from "./order.schema.js";

export const createNewOrderRepo = async (data) => {
  try {
    const newOrder = await OrderModel.create(data);
    return newOrder;
  } catch (error) {
    throw new Error("Failed to create order: " + error.message);
  }
};

export const getOrderByIdRepo = async (orderId) => {
  const order = await OrderModel.findById(orderId);
  if (!order) {
    throw new Error("Order not found");
  }
  return order;
};

export const getAllMyOrdersRepo = async (userId) => {
  const orders = await OrderModel.find({ user: userId }).populate(
    "orderedItems.product"
  );
  if (!orders.length) {
    return res.status(400).json({
      success: false,
      message: "No orders found",
    });
  }
  return orders;
};

export const getAllOrdersRepo = async () => {
  try {
    const orders = await OrderModel.find();
    return orders;
  } catch (error) {
    throw new Error("Failed to get orders: " + error.message);
  }
};

export const updateOrderRepo = async (orderId, updatedData) => {
  const order = await OrderModel.findByIdAndUpdate(orderId, updatedData, {
    new: true,
  });
  if (!order) {
    throw new Error("Order not found");
  }
  return order;
};
