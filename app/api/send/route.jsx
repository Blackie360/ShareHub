
import EmailTemplate from '../../_component/email-template.jsx';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const requestData = await req.json();
    console.log('Request Data:', requestData);

    // Ensure userName is defined before splitting
    const userName = requestData.userName || 'you'; 

    const emailData = {
      from: 'shareit@resend.dev',
      to: [requestData.emailToSend],
      subject: 'File Shared with You',
      react: EmailTemplate({
        userName,
        fileName: requestData.fileName,
        fileSize: requestData.fileSize,
        fileType: requestData.fileType,
        shortLink: requestData.shortLink,
      }),
    };

    console.log('Email Data:', emailData);

    const responseData = await resend.emails.send(emailData);
    console.log('Resend API Response:', responseData);

    // Ensure response.data is defined before accessing properties
    if (responseData.data) {
      console.log('Response Data:', responseData.data);
    } else {
      console.error('Response Data is undefined.');
    }

    return Response.json(responseData);
  } catch (error) {
    console.error('Error:', error);
    return Response.json({ error: error.message || 'Unknown error' });
  }
}
