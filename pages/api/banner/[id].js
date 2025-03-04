import dbConnect from '../../../src/DB/dbConnect';
import Banner from '../../../src/DB/models/banner';

export default async function handler(req, res) {
  const { id } = req.query;
  await dbConnect();

  if (req.method !== 'PUT') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    // If setting this banner as active, deactivate all others
    if (req.body.isActive) {
      await Banner.updateMany({ _id: { $ne: id } }, { isActive: false });
    }

    const banner = await Banner.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });

    if (!banner) {
      return res.status(404).json({ success: false, message: 'Banner not found' });
    }

    res.status(200).json({ success: true, data: banner });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
} 