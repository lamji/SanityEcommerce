import { connectToDatabase } from '../../../src/DB/lib/index';
import Banner from '../../../src/DB/models/banner';

export default async function handler(req, res) {
  const { id } = req.query;
  await connectToDatabase();

  if (req.method !== 'PUT') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    // If setting this banner as active, deactivate all others
    if (req.body.isActive) {
      await Banner.updateMany({ _id: { $ne: id } }, { isActive: false });
    }

    // Exclude `_id` from req.body
    const { _id, ...updateData } = req.body;

    console.log(updateData);

    const banner = await Banner.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!banner) {
      return res.status(404).json({ success: false, message: 'Banner not found' });
    }

    res.status(200).json({ success: true, data: banner });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
}
