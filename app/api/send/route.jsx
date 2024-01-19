// api/sendEmail.js
import { EmailTemplate } from '../../_component/email-template.jsx';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const requestData = await req.json();

    const data = {
      from: 'shareit@resend.dev',
      to: [requestData.emailToSend],
      subject: 'File Shared with You',
      react: EmailTemplate({
        firstName: requestData.userName,
        fileName: requestData.fileName,
        fileSize: requestData.fileSize,
        fileType: requestData.fileType,
        shortLink: requestData.shortLink,
      }),
    };

    const responseData = await resend.emails.send(data);

    return Response.json(responseData);
  } catch (error) {
    return Response.json({ error });
  }
}
