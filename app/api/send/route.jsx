// api/send.js

import EmailTemplate from '../../_component/email-template.jsx';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const requestData = await req.json();
    console.log('Request Data:', requestData);

    // Check if emailToSend is defined before splitting
    const emailToSend = requestData.emailToSend;
    const firstName = emailToSend ? emailToSend.split('@')[0] : '';
    console.log('EmailToSend:', emailToSend);
        console.log('FirstName:', firstName);

    const emailData = {
      from: 'shareit@resend.dev',
      to: [emailToSend],
      subject: 'File Shared with You',
      react: EmailTemplate({
        firstName: firstName,
        fileName: requestData.fileName,
        fileSize: requestData.fileSize,
        fileType: requestData.fileType,
        shortLink: requestData.shortLink,
      }),
    };

    console.log('Email Data:', emailData);

    const responseData = await resend.emails.send(emailData);
    console.log('Resend API Response:', responseData);

    return Response.json(responseData);
  } catch (error) {
    console.error('Error:', error);
    return Response.json({ error: error.message || 'Unknown error' });
  }
}
