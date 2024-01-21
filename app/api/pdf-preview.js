import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import { exec } from 'child_process';
import sharp from 'sharp';

const execAsync = promisify(exec);

export default async function handler(req, res) {
  try {
    const { url } = req.query;

    if (!url) {
      return res.status(400).json({ error: 'Missing PDF URL in the query parameters' });
    }

    // Temporary file paths
    const tempPdfPath = path.join(process.cwd(), 'temp.pdf');
    const tempImagePath = path.join(process.cwd(), 'temp.png');

    // Download the PDF file
    const downloadCommand = `curl -o "${tempPdfPath}" "${url}"`;
    await execAsync(downloadCommand);
    console.log('PDF downloaded successfully:', tempPdfPath);

    // Convert the first page of the PDF to an image
    const convertCommand = `pdftoppm -png -f 1 -l 1 "${tempPdfPath}" > "${tempImagePath}"`;
    await execAsync(convertCommand);
    console.log('PDF converted to image successfully:', tempImagePath);

    // Read the generated image file
    const imageBuffer = fs.readFileSync(tempImagePath);

    // Use Sharp to resize the image if needed
    const resizedImageBuffer = await sharp(imageBuffer).resize({ width: 500, height: 500 }).toBuffer();

    // Send the resized image as a response
    res.setHeader('Content-Type', 'image/png');
    res.send(resizedImageBuffer);
  } catch (error) {
    console.error('Error in pdf-preview API:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    // Clean up: Delete temporary files
    fs.unlinkSync(tempPdfPath);
    fs.unlinkSync(tempImagePath);
  }
}
