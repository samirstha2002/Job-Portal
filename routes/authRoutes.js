const express = require("express");
const authController = require("./../controllers/authcontroller");

const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-8", // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
  // store: ... , // Redis, Memcached, etc. See below.
});
const router = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *      User:
 *          type: object
 *          required:
 *              - name
 *              - lastName
 *              - email
 *              - password
 *              - location
 *          properties:
 *              id:
 *                  type: string
 *                  description: The auto-generated id of user collection
 *              name:
 *                  type: string
 *                  description: User first name
 *              lastName:
 *                  type: string
 *                  description: User last name
 *              email:
 *                  type: string
 *                  format: email
 *                  description: User email address
 *              password:
 *                  type: string
 *                  minLength: 6
 *                  description: User password (at least 6 characters)
 *              location:
 *                  type: string
 *                  description: User location (city or country)
 *          example:
 *              id: "Ghhh667jkl"
 *              name: "Samir"
 *              lastName: "Shrestha"
 *              email: "samirs@gmail.com"
 *              password: "sam12345"
 *              location: "Nepal"
 */

/**
 * @swagger
 * tags:
 *  name: Auth
 *  description: Authentication apis
 */

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Register new user
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: login user
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User login successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: something went wrong
 */

router.post("/register", limiter, authController.registerUser);
router.post("/login", authController.loginUser);
module.exports = router;
