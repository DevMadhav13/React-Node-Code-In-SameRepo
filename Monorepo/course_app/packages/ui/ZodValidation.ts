import { z } from 'zod'; 

export let USercredValidation = z.object({
  username : z.string().min(1).max(30),
  password : z.string().min(3).max(30)
})

export let AdmincredValidation = z.object({
    username : z.string().min(1).max(30),
    password : z.string().min(3).max(30)
  })
  
  export let usernameValidation = z.string().min(1).max(30)  
  export let PasswordValidation = z.string().min(1).max(30)  
  
  export let CourseValidation = z.object({
    title: z.string().min(1).max(30),
    description: z.string().min(1).max(300),
    imageLink : z.string().min(1),
    price : z.number().min(1)
  })

  

