import { Hono, Next } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { env } from 'hono/adapter'
import { cors } from 'hono/cors'
import { Resend } from "resend";
const app = new Hono()
app.use('/*', cors())


app.post('/addUser', async (c) => {
  const body: {
    name: string;
    email: string;
    password: string;
    userName: string
  } = await c.req.json()
  const { DATABASE_URL } = env<{ DATABASE_URL: string }>(c)

  const prisma = new PrismaClient({
      datasourceUrl: DATABASE_URL,
  }).$extends(withAccelerate())

  console.log(body)

  try {
    const res = await prisma.user.create({
      data: {
        name: body.name,
        userName : body.userName,
        email: body.email,
        password: body.password
      },
      select:{
        id:true,
        email:true
      }
    })
    
    return c.json({msg: "data successfully inserted into database",data:res})
  } catch (error) {
    return c.json({msg: error})
  }
})
app.post('/addUserDetails', async (c) => {
  const body: {
    userId : number,
    location: string;
    profileUrl: string;
    interests: string[]
  } = await c.req.json()
  const { DATABASE_URL } = env<{ DATABASE_URL: string }>(c)

  const prisma = new PrismaClient({
      datasourceUrl: DATABASE_URL,
  }).$extends(withAccelerate())

  console.log(body)

  try {
    const res = await prisma.user.update({
      where: {
        id: body.userId
      },
      data: {
        profileUrl: body.profileUrl,
        location: body.location,
      }
    })
    const userInterestPromises = body.interests.map(async interest => {
      await prisma.userInterests.create({
        data: {
          userId: body.userId,
          interest: interest,
        },
      });
    });
    const intersetResp = await Promise.all(userInterestPromises);
    
    return c.json({msg: "data successfully inserted into database",dataUpdated:res})
  } catch (error) {
    return c.json({msg: error})
  }
})
app.get('/', async (c) => {
  return c.json({msg: "server up please hit other end points"})
})
app.get('/deleteUsers', async (c) => {
  const { DATABASE_URL } = env<{ DATABASE_URL: string }>(c)
  const prisma = new PrismaClient({
    datasourceUrl: DATABASE_URL,
}).$extends(withAccelerate())
try{
  const res = await prisma.userInterests.deleteMany({})
  const res1 = await prisma.user.deleteMany({})
  return c.json({msg: res})
}
catch(error){
  return c.json({msg: error})
}

  return c.json({msg: "server up please hit other end points"})
})
app.post("/sendEmail", async (c) => {
  const { RESEND_API } = env<{ RESEND_API: string }>(c);
  const resend = new Resend(RESEND_API);
  const body: {
    email:string
  } = await c.req.json()
  const { data, error } = await resend.emails.send({
    from: "nikhilkethe@kethesainikhil.online",
    to: [body.email],
    subject: "hello world",
    html: "<strong>it works!</strong>",
  });

  if (error) {
    return c.json({ error });
  }

  return c.json({ data });
});




export default app