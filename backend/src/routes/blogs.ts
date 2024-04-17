import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign, verify } from 'hono/jwt'
import { createBloginput, updateBloginput } from "@guna_1472/medium-common";

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL : string,
        SECRET_KEY: string
    },
    Variables :{
        userId: string
    }
}>()

blogRouter.use('/*', async (c,next)=>{
    const authHeader = c.req.header("authorization") || "";
    try{
        const user = await verify(authHeader,c.env.SECRET_KEY)
        if(user){
            c.set("userId",user.id);
            await next();
        }else{
            c.status(403);
            return c.json({
                message:"you are not logged in"
            })
        }
    }catch(e){
        return c.json({
            message : "you are not logged in"
        })
    }
   
});

blogRouter.post('/',async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const author =c.get("userId");
    const body = await c.req.json();
    const {success} = createBloginput.safeParse(body);
    if(!success){
        c.status(411);
        return c.json({
            meassage : "inputs are not correct"
        })
    }
    const post = await prisma.blog.create({
        data:{
            title: body.title,
            content: body.content,
            authorId: Number(author)
        },
    })
    return c.json({
        id:post.id
    })
  })
blogRouter.put('/',async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json();
    const {success} = updateBloginput.safeParse(body);
    if(!success){
        c.status(411);
        return c.json({
            message : "invalid inputs"
        })
    }
    const post = await prisma.blog.update({
        where :{
            id:body.id
        },
        data:{
            title: body.title,
            content: body.content,
        },
    })
    return c.json({
        id:post.id
    })
  })
//todo: add pagination
  blogRouter.get('/bulk',async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    
    const blogs = await prisma.blog.findMany({
        select: {
            title: true,
            content: true,
            id: true,
            author: {
                select: {
                    name: true
                }
            }
        }
    })
    return c.json({
        blogs
    })
})

blogRouter.get('/:id', async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const id = c.req.param("id");
    const blog = await prisma.blog.findUnique({
        where :{
            id:Number(id)
        },
        select:{
            id:true,
            title:true,
            content:true,
            author:{
                select:{
                    name:true,
                }
            }
        }
    })
    return c.json({
        blog
    })
  })