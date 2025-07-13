import { z } from "zod/v4"; 
 
export const userLoginSchema = z.object({ 
  email: z.email("Invalid Email"),
  password: z.string().min(1,"required")
});



export const userSignupSchema = z.object({
  email: z.email("Invalid Email"),
  password: z.string()
    .min(8, "Minimum Length should be 8")
    .max(15, "Password character limit exceeded 15"),
    // .regex(
    //   /(?=.*[A-Z])/,
    //   "Password should include at least one uppercase letter"
    // )
    // .regex(
    //   /(?=.*[!@#$%^&*])/,
    //   "Password should include at least one special character"
    // ),,
    name:z.string().min(2,"Enter Full name").max(20,"Max length is 10"),
    phone:z.string().length(10,"10 digits are required")
});


export type LoginInputState = z.infer<typeof userLoginSchema>;
export type SignupInputState = z.infer<typeof userSignupSchema>;
