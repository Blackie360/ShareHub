import { EmailTemplate } from '../../_component/email-template.jsx';
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const requestData = await req.json();

    // Extract necessary data from the request
    const { recipientEmail, file } = requestData;

    // Customize the email content based on file sharing
    const emailData = {
      from: 'FileShare App <noreply@fileshareapp.dev>',
      to: [recipientEmail],
      subject: `File Shared: ${file.fileName}`,
      react: EmailTemplate({
        recipientName: 'John', // You might want to dynamically get the recipient's name from your user database
        fileName: file.fileName,
        fileSize: file.fileSize,
        fileType: file.fileType,
        shortLink: 'https://fileshareapp.dev/shortlink', // Replace with your actual short link
      }),
    };

    // Send the email
    const response = await resend.emails.send(emailData);

    // Return a successful response with the email sending details
    return new Response(JSON.stringify({ success: true, data: response }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    // Handle errors and return an error response
    console.error('Error sending email:', error);
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500, // Internal Server Error
    });
  }
}