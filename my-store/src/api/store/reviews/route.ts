import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { REVIEW_MODULE } from "../../../modules/review"
import ReviewModuleService from "../../../modules/review/service"

// GET /store/reviews?product_id=xxx
export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const reviewService: ReviewModuleService = req.scope.resolve(REVIEW_MODULE)
  const { product_id } = req.query

  const reviews = await reviewService.listReviews(
    product_id ? { product_id: product_id as string } : {}
  )

  res.json({ reviews })
}

// POST /store/reviews
export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  const reviewService: ReviewModuleService = req.scope.resolve(REVIEW_MODULE)

  const review = await reviewService.createReviews(
    req.body as {
      product_id: string
      customer_name: string
      rating: number
      content: string
    }
  )

  res.json({ review })
}