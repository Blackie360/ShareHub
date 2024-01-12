import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
    publicRoutes: ['/', '/api/send'], // Add '/api/send' to the publicRoutes array
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
