

import exporss from 'express'
import auth from '../../middleware/auth'
import { adminController } from './admin.controller'
import { USER_ROLE } from '../auth/auth.constant'

const router = exporss.Router()

// admin routes
router.patch('/users/:userId/block', auth(USER_ROLE.admin), adminController.userBlockController)
router.get('/all-user', auth('admin'), adminController.getAllUser);
router.get('/view-all-order', auth('admin'), adminController.getAllOrderController);
router.patch('/confirm-order/:orderId', auth('admin'), adminController.confirmOrder);

export const AdminRoute = router