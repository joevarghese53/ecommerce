import { client } from '../../lib/client';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, rating, comment, productId } = req.body;

    // Create a new review document
    const review = {
      _type: 'review',
      name,
      rating,
      comment,
    };

    try {
      await client.patch(productId)
        .setIfMissing({ reviews: [] })
        .insert('after', 'reviews[-1]', [review])
        .commit();

      res.status(200).json({ message: 'Review submitted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error submitting review', error });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
