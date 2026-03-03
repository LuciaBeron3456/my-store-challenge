import { Router, Request, Response } from 'express'
import fetch from 'node-fetch';


const router = Router()
const MEDUSA_URL = process.env.MEDUSA_BACKEND_URL

// GET /api/reviews?product_id=xxx — proxy to Medusa
router.get('/', async (req: Request, res: Response) => {
  try {
    const { product_id } = req.query

    let url = `${MEDUSA_URL}/api/review`
    if (product_id) {
      url += `?product_id=${product_id}`
    }

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Review not found")
    }

    const reviews = response.json()

    return reviews
  } catch (e) {
    throw new Error("Review not found")
  }
})

// POST /api/reviews — proxy to Medusa
router.post('/', async (req: Request, res: Response) => {
  try {

    const response = await fetch(`${MEDUSA_URL}/api/review`, { method: 'POST', body: JSON.stringify(req.body) });

    if (!response.ok) {
      throw new Error("Reviews not found")
    }

    return response.json()
  } catch (e) {
    throw new Error("Reviews not found")
  }
})

export default router