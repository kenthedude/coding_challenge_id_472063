import { Router as router } from 'express';
import { validateJWT } from '../middleware/authValidator';
import { getTasks, getTask, postTask, putTask, patchTask, deleteTask } from '../controllers/tasks.controller';
import { validatePatchTaskParams, validatePutTaskParams, validateRegisterTaskParams } from '../middleware/paramsValidator';

const tasksRouter = router();

tasksRouter.get('', validateJWT, getTasks);
tasksRouter.post('', validateRegisterTaskParams, validateJWT, postTask);
tasksRouter.get('/:id', validateJWT, getTask);
tasksRouter.put('/:id', validatePutTaskParams, validateJWT, putTask);
tasksRouter.delete('/:id', validateJWT, deleteTask);
tasksRouter.patch('/:id', validatePatchTaskParams, validateJWT, patchTask);

export { tasksRouter };
