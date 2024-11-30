import express from "express";
import {
  createNewOrder,
  getAllOrders,
  getMyOrders,
  getSingleOrder,
  updateOrder,
} from "../controllers/order.controller.js";
import { auth } from "../../../middlewares/auth.js";

const router = express.Router();

router.route("/new").post(auth, createNewOrder);
router.route("/:id").get(auth, getSingleOrder);
router.route("/my/orders").get(auth, getMyOrders);
router.route("/orders/placed").get(auth, getAllOrders);
router.route("/update/:id").put(auth, updateOrder);

export default router;
