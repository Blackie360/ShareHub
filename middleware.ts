import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
    publicRoutes: ['/','/about','/contact', '/api/send', '/f/(.*)'],
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
