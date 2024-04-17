import z from "zod"

// type infering in zod so that input validation can be access to frontend and backend
//signin and signup valiodation checks

export const signupInput = z.object({
    username:z.string().email(),
    password:z.string().min(6),
    name: z.string().optional()
})
export const signinInput = z.object({
    username:z.string().email(),
    password:z.string().min(6),
})

// blog checks (updating,creating,gettting)

export const createBloginput = z.object({
    title:z.string(),
    content:z.string(),
})
export const updateBloginput = z.object({
    title:z.string(),
    content:z.string(),
    id : z.number()
})
export type SignupInput = z.infer<typeof signupInput>
export type SigninInput = z.infer<typeof signinInput>
export type CreateBloginput= z.infer<typeof createBloginput>
export type UpdateBloginput= z.infer<typeof updateBloginput>