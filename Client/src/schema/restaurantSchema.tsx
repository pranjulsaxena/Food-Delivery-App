import { file, z } from "zod/v4"; 

export const restaurantSchema = z.object({
    restaurantName: z.string().min(1,"required can't be empty"),
    city: z.string().min(1,"can't be empty"),
    country: z.string().min(1,"can't be empty"),
    deliveryTime: z.number().min(10),
    cuisines: z.array(z.string().min(1)),
    image:z.instanceof(File).optional().refine((file)=>file?.size !== 0,{message:"Image file is requried"})
})

export type restaurantType = z.infer<typeof restaurantSchema>;
