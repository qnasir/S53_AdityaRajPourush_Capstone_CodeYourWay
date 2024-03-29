const z = require("zod");

const userSchema = z.object({
    username: z.string().trim().toLowerCase(),
    email: z.string().trim().toLowerCase().email()
})

module.exports = userSchema