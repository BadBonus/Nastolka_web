// import {z} from 'zod'

// const bodySchema = z.object({
//   email: z.string().email(),
//   password: z.string().min(8)
// })

export default defineEventHandler(async (event) => {
  // const {email, password} = await readValidatedBody(event, bodySchema.parse)

  // if (email === 'admin@admin.com' && password === 'iamtheadmin') {
  // set the user session in the cookie
  // this server util is auto-imported by the auth-utils module
  const demo_bearer = '1234567890987'
  await setUserSession(event, {
    token: demo_bearer
  });
  return {
    name: 'John Doe',
    email: "test@gmail.com",
    token: demo_bearer
  }
  // }
  // throw createError({
  //   statusCode: 401,
  //   message: 'Bad credentials'
  // })
})