// api/send.js (or similar)

import { EmailTemplate } from '../../_component/email-template.jsx';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const requestData = await req.json();
    console.log('Request Data:', requestData);

    const emailData = {
      from: 'shareit@resend.dev',
      to: [requestData.emailToSend],
      subject: 'File Shared with You',
      react: EmailTemplate({
        firstName: requestData.userName.split('@')[0],
        fileName: requestData.fileName,
        fileSize: requestData.fileSize,
        fileType: requestData.fileType,
        shortLink: requestData.shortLink,
      }),
    };

    const responseData = await resend.emails.send(emailData);
    console.log('Resend API Response:', responseData);

    return Response.json(responseData);
  } catch (error) {
    console.error('Error:', error);
    return Response.json({ error });
  }
}
