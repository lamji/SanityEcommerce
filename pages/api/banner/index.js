import { connectToDatabase } from '../../../src/DB/lib/index';
import Banner from '../../../src/DB/models/banner';

export default async function handler(req, res) {
  await connectToDatabase();

  switch (req.method) {
    case 'GET':
      try {
        // Get the active banner by default
        const banner = await Banner.findById('67d3b1942dd90cd2324f21a8');
        if (!banner) {
          return res.status(200).json({
            'data': {
              "buttonText": "Shop Now",
              "discount": "1%",
              "desc": "Default Description  ",
              "image": "http://res.cloudinary.com/dlax3esau/image/upload/v1742653638/w78hyonhmdfxhfqzbqx0.webp",
              "smallText": "Default Small Text",
              "largeText2": "FINE",
              "saleTime": "15 November to 15 December 2025",
              "largeText1": "FINE",
              "product": "Test Product 1",
              "midText": "AQWT12 Headphones",
              "isDiscount": false,
              "images": [
                  "http://res.cloudinary.com/dlax3esau/image/upload/v1742653638/w78hyonhmdfxhfqzbqx0.webp",
                  "http://res.cloudinary.com/dlax3esau/image/upload/v1742653638/tbyeglzppv8oqlcuhqal.webp",
                  "http://res.cloudinary.com/dlax3esau/image/upload/v1742653638/ptnxej2fbhhlzfn8oi7k.webp",
                  "http://res.cloudinary.com/dlax3esau/image/upload/v1742653638/w2mov3pcaztw5oldpnyx.webp"
              ],
              "before": 101,
              "now": 99.99
            },
              
          });
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
