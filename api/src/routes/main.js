const signup = require('./signup')
const login = require('./login')
const logout = require('./logout')
const createTask = require('./createTask')
const updateTask = require('./updateTask')
const deleteTask = require('./deleteTask')
const getTask = require('./getTask')
const getAllTasks = require('./getAllTasks')
const users = require('./users')

module.exports = [
   signup,
   login,
   logout,
   createTask,
   updateTask,
   deleteTask,
   getTask,
   getAllTasks,
   users
]