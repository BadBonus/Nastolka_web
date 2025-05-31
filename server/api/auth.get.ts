 
export default defineEventHandler(async (event) => {

 
   
  await setUserSession(event, {
    user: {
      name: 'John Doe'
    }
  })
  return {}
})