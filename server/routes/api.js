import express from 'express';
const router = express.Router();
import *as UserController from '../src/controllers/UsersController.js';
import *as HeroController from '../src/controllers/HeroController.js';
import *as BlogController from '../src/controllers/BlogController.js';
import *as TeamController from '../src/controllers/TeamController.js';
import *as ServiceController from '../src/controllers/ServiceController.js';
import AuthMiddleware from '../src/middlewares/authMiddleware.js';



///user

router.post("/Registration", UserController.Registration);
router.post("/Login",UserController.Login);



///Blog
router.post("/CreateBlog",BlogController.CreateBlog);
router.get("/ReadBlogByUser",AuthMiddleware,BlogController.ReadBlogByUser);
router.get("/ReadAllBlog",BlogController.ReadAllBlog);
router.post("/UpdateBlog/:BlogID",BlogController.UpdateBlog);
router.post("/DeleteBlog",BlogController.DeleteBlog);


///HeroSection

router.post("/HeroSection",AuthMiddleware,HeroController.HeroSection);
router.get("/ReadHeroSection",HeroController.ReadHeroSection);


///TeamSection
router.post("/TeamCreate",TeamController.TeamCreate);
router.get("/TeamRead",TeamController.TeamRead);
router.post("/TeamUpdate/:TeamID",TeamController.TeamUpdate);
router.post("/TeamRemove",TeamController.TeamRemove);


///ServiceSection
router.post("/ServiceCreate",ServiceController.ServicesCreate);
router.get("/ServiceRead",ServiceController.ServicesRead);
router.post("/ServiceUpdate/:serviceID",ServiceController.ServicesUpdate);
router.post("/ServiceRemove",ServiceController.ServicesRemove);






export default router;