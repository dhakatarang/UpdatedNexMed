// pages/api/ocr.js
import Tesseract from 'tesseract.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { imageUrl } = req.body;
    
    const result = await Tesseract.recognize(
      imageUrl,
      'eng',
      { logger: m => console.log(m) }
    );
    
    res.status(200).json({ text: result.data.text });
  } catch (error) {
    console.error('OCR API Error:', error);
    res.status(500).json({ error: 'Failed to process image' });
  }
}