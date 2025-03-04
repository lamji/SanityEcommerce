import { connectToDatabase } from '../../../src/DB/lib/index';
import Banner from '../../../src/DB/models/banner';;

export default async function handler(req, res) {
  await connectToDatabase();

  switch (req.method) {
    case 'GET':
      try {
        // Get the active banner by default
        const banner = await Banner.findOne({ isActive: true });
        if (!banner) {
          return res.status(200).json({ success: true, data: [{
            buttonText: 'Shop Now',
            discount: '0%',
            desc: 'Default Description  ',
            image: 'https://res.cloudinary.com/dlax3esau/image/upload/v1740919134/aj3lxxckmu4wxalo7vm6.webp',
            smallText: 'Default Small Text',
            largeText2: 'FINE',
            saleTime: '15 November to 15 December 2025',
            largeText1: 'FINE',
            product: 'AQWT12 Headphones',
            midText: 'AQWT12 Headphones',
          }] });
        }
        res.status(200).json({ success: true, data: banner });
      } catch (error) {
        res.status(500).json({ success: false, message: error.message });
      }
      break;

    case 'POST':
      try {
        // If setting this banner as active, deactivate all others
        if (req.body.isActive) {
          await Banner.updateMany({}, { isActive: false });
        }
        
        const banner = await Banner.create(req.body);
        res.status(201).json({ success: true, data: banner });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    default:
      res.status(405).json({ success: false, message: 'Method not allowed' });
      break;
  }
} 