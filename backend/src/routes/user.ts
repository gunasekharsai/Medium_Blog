import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
import {SignupInput, signinInput, signupInput} from "@guna_1472/medium-common"

export const userRouter = new Hono<{
    Bindings :{
        DATABASE_URL: string,
        SECRET_KEY: string
    }
}>()

userRouter.post('/signup',async(c)=>{
    c.header('Content-Length','365');
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  const body = await c.req.json();
  const {success} = signupInput.safeParse(body);
  if(!success){
    c.status(411);
    return c.json({
      message:"inputs are not correct"
    })
  }
  try{
    const user = await prisma.user.create({
      data: {
        username: body.username,
        password: body.password,
        name: body.name
      },
    })
    const jwt = await sign({
      id: user.id
    }, c.env.SECRET_KEY);

    return c.text(jwt)
  } catch(e){
    console.log(e);
    c.status(411);
    return c.text("invalid(user already exists)");
  }
  })
  userRouter.post('/signin',async(c)=>{
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate()) // intializzing prisma
  const body = await c.req.json();
  const {success} = signinInput.safeParse(body);
  if(!success){
    c.status(411);
    return c.json({
      message:"inputs are not correct"
    })
  }
  try{
    const user = await prisma.user.findFirst({
      where:{
        username: body.username,
        password: body.password
      }
    });
    if(!user){
      c.status(403) //UNAUTHORIZED;
      return c.json({error: "user not found"});
    }
    const jwt = await sign({
      id: user.id
    }, c.env.SECRET_KEY);

    return c.text(jwt)
  } catch(e){
    console.log(e);
    c.status(411)
    return c.text("invalid")
  }
  })