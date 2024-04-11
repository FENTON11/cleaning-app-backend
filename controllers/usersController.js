import Users from '../models/User.js';
import { StatusCodes } from 'http-status-codes';
import bcrypt from "bcryptjs"
import BadRequestError from '../errors/bad-request.js';
import UnauthenticatedError from '../errors/unauthenticated.js';

export const register = async (req, res, next) => {
    try {
        console.log("in register api route")
        const user = new Users({ ...req.body });
        const hashedPassword = await user.hashPassword();
        user.password = hashedPassword;
        await user.save();
        const { password, ...newUser } = user._doc;
        return res
            .status(StatusCodes.CREATED)
            .json({ success: true, user: newUser });
    } catch (error) {
        next(error);
    }
};

export const updateUser = async (req, res, next) => {
    try {
    const {params:{id},body} = req;
    let user = {}
    if(body.password){
        const {password,...newuser} = body;
        const pass =  bcrypt.hash(body.password);
         user = {...newuser,password:pass}

    }else{
        const {password,...newuser} = body;
        user = {...newuser}
    }

      user = await Users.findByIdAndUpdate(id,{...user},{new:true,runValidators:true})
        const { password, ...newUser } = user._doc;
        return res
            .status(StatusCodes.CREATED)
            .json({ success: true, user: newUser });
    } catch (error) {
        next(error);
    }
};
export const login = async (req, res, next) => {
    try {
        const {
            body: { email, password },
        } = req;
        if (!email || !password) {
            throw new BadRequestError(
                'please provide both email and password!'
            );
        }
        const user = await Users.findOne({ email });
        if (!user) {
            throw new UnauthenticatedError('INVALID EMAIL!');
        }
        const passwordMatched = await user.checkPassword(password);
        if (!passwordMatched) {
            throw new UnauthenticatedError('INVALID PASSWORD!');
        }
        const token = await user.createToken();
        const { password: removePassword, ...newUser } = user._doc;
        return res
            .status(StatusCodes.OK)
            .json({ success: true, user: newUser, token });
    } catch (error) {
        next(error);
    }
};
export const OauthLogin = async (req, res, next) => {
    try {
        let user = await Users.findOne(
            { email: req.body.email },
            { password: 0 }
        );
        if (!user) {
            user = await Users.create({...req.body})
        }
        const token = await user.createToken();
        return res
            .status(StatusCodes.CREATED)
            .json({ success: true, user,token});
    } catch (error) {
        next(error);
    }
};




