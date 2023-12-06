
import model from "./model.js";
// create
export const createUser = (user) => model.create(user);

// read
export const findAllUsers = () => model.find();
export const findUserById = (userId) => model.findById(userId);
export const findUserByUsername = (username) =>
    model.findOne({ username: username });
export const findUserByCredentials = (username, password) =>
    model.findOne({ username, password });
// same thing as export const findUserByCredentials = (usr, pass) => model.findOne({ username: usr, password: pass });

// put
// update the user by primary key
export const updateUser = (userId, user) =>
    model.updateOne({ _id: userId }, { $set: user });

// delete
export const deleteUser = (userId) => model.deleteOne({ _id: userId });


