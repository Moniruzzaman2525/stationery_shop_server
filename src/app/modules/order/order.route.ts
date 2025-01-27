import express from 'express';
import { OrderControllers } from './order.controllers';
import auth from '../../middleware/auth';

const router = express.Router();

// Order a Stationery Product Router
router.post('/confirm-order', auth('admin'), OrderControllers.orderProductController);
router.post('/callback',auth('admin'), OrderControllers.orderCallbackController);
// Calculate Revenue from Orders Router
router.get('/orders/revenue', OrderControllers.revenueGenerateController);
router.get('/', OrderControllers.getUserOrderController);

export const OrderRoutes = router;
