### Issue: NextRouter not Mounted Error and Redirect Issue

#### Description
Encountering a runtime error related to `NextRouter` not being mounted. This issue occurs when attempting to use `useRouter` in the `page.js` file. Additionally, after a successful file upload, there is a problem with redirecting, resulting in an error related to `router.push` not being a function. The issue seems to be associated with incorrect usage or import of the `useRouter` hook.

#### Steps to Reproduce
1. Upload a file using the `UploadForm` component.
2. Observe the `NextRouter not Mounted` error.
3. After a successful file upload, encounter an error related to `router.push`.

#### Expected Behavior
- Successful file upload should not trigger a `NextRouter` error.
- Redirecting after a successful upload should work without errors.

#### Code Snippets
- Ensure the correct usage of `useRouter` in the `page.js` file.
- Validate the image path in the `UploadForm.jsx` component.

#### Environment
- Next.js version: latest 
- clerk for auth
- firebases for storage 
