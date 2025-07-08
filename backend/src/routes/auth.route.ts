import { Router as router } from 'express';
import { validateEmailIsUnique } from '../middleware/authValidator';
import { loginUser, registerUser } from '../controllers/auth.controller';
import { validateLoginParams, validateRegisterUserParams } from '../middleware/paramsValidator';

const authRouter = router();

authRouter.post('/login', validateLoginParams, loginUser);
authRouter.post('/register', validateRegisterUserParams, validateEmailIsUnique, registerUser);

export { authRouter };
