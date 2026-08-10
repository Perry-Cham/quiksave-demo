import z from "zod";

const configSchema = z.object({
    mongo_uri: z.string().min(1, "Mongo URI is required"),
    imageKit_private_key: z.string().min(1, "ImageKit URL is required"),
    betterAuth_secret: z.string().min(1, "Better Auth secret is required"),
    betterAuth_api_url: z.string().min(1, "Better Auth API URL is required"),
});

type configType = z.infer<typeof configSchema>;

const getConfig: () => configType | undefined = () => {
    try {
        const config = {
            mongo_uri: process.env.MONGO_URI,
            imageKit_private_key: process.env.IMAGEKIT_PRIVATE_KEY,
            betterAuth_secret: process.env.BETTERAUTH_SECRET,
            betterAuth_api_url: process.env.BETTERAUTH_API_URL,
        };
        const parsedConfig = configSchema.parse(config);
        return parsedConfig;

    } catch (error) {
        if (error instanceof z.ZodError) {
            const missingVars = error.issues
                .map((e) => `${e.path.join('.')}: ${e.message}`)
                .join('\n');

            throw new Error(`Invalid environment configuration:\n${missingVars}`);
        }
        throw error

    }





}

export default getConfig;