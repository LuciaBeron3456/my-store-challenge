

export const getReviews = async ({ product_id } : {product_id: string}) => {
    try {
        let url = `${process.env.NEXT_PUBLIC_API_URL}/api/reviews`

        if (product_id) {
            url += `?product_id=${product_id}`
        }
        const response = await fetch(url, { cache: "no-store" });
    
        if (!response.ok) {
          throw new Error("Reviews not found")
        }
    
        const reviews = response.json()
    
        return reviews
      } catch (e) {
        throw new Error("Reviewa not found")
      }
}