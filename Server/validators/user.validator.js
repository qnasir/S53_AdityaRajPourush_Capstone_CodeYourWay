const z = require("zod");

const userSchema = z.object({
  username: z.string().trim().toLowerCase(),
  email: z.string().trim().toLowerCase().email(),
  password: z.string().optional(),
  role: z.enum(["admin", "user"]).default("user"),
  fullname: z.string().trim(),
  profileImage: z
    .string()
    .default(
      "https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg"
    ),
  refreshToken: z.string().optional(),
  questionsDone: z.array(z.string().cuid()).optional(),
});

module.exports = userSchema;
