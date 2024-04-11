import  express  from "express";
import {login, register, updateUser} from '../controllers/usersController.js';
// import authorize from '../../../middlewares/authentication.js';
// import {register} from "../controllers/usersController"

const Router = express.Router();
// Router.route('/').get(authorize,getAllUsers);
Router.route('/login').post(login);
Router.route('/register').post(register);
Router.route('/update/:id').patch(updateUser);
export default Router