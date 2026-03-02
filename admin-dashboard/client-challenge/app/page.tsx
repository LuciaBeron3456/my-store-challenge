"use client"

import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from 'next/navigation';


export default function Home() {

  const [loading, setIsLoading] = useState<boolean>(false)
  const [reviews, setReviews] = useState(null)

  const searchParams = useSearchParams()

  const product_id = searchParams.get('product_id')

  const getReviews = async (product_id: string | null) => {
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

      setIsLoading(true)
      setReviews(reviews)
    } catch (e) {
      throw new Error("Reviews not found")
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const customer_name = formData.get('customer_name') as string
    const product_id = formData.get('product_id') as string
    const rating = formData.get('rating') as string
    const content = formData.get('content') as string
    const date = formData.get('date') as string

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reviews`, {
      method: 'POST',
      body: JSON.stringify({ customer_name, product_id, rating, content, date })
    })

    if (!response.ok) {
      throw new Error("Review not created")
    }

    alert("Review created successfully")
  }

  const router = useRouter();
  const pathname = usePathname();

  const handleProductId = useCallback((product_id: string) => {
    if (product_id) {
      const params = new URLSearchParams(searchParams.toString());
      params.set('product_id', product_id as string);
      router.push(`${pathname}?${params.toString()}`);
    }
  }, [product_id, pathname, router, searchParams]);


  useEffect(() => {
    setIsLoading(true)
    getReviews(product_id).then((reviews) => {
      setIsLoading(false)
      setReviews(reviews)
    }).catch(() => {
      setIsLoading(false)
      setReviews(null)
    })
  }, [product_id])


  return (
    <div>
      <div className="flex justify-center items-center mb-2">
        <input className="border border-gray-300 rounded-md p-2" type="text" name="product_id" placeholder="Product ID" onChange={(e) => handleProductId(e.target.value)} />
        <button className="bg-blue-500 text-white p-2 rounded-md w-[20%] cursor-pointer" type="button" onClick={() => handleProductId('')}>Clear</button>
      </div>

      {loading ? <div>Loading</div>
        :
        <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
          <table className="w-full text-sm text-left rtl:text-right text-body">
            <thead className="text-sm text-body bg-neutral-secondary-soft border-b rounded-base border-default">
              <tr>
                <th scope="col" className="px-6 py-3 font-medium">
                  Customer name
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                  Product ID
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                  Star Rating
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                  Review Content
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {
                reviews?.map((reviews:any) => (
                  <>
                  <tr className="bg-neutral-primary border-b border-default">
                    <th scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap">
                      {reviews.customer_name}
                    </th>
                  </tr>
                  <tr className="bg-neutral-primary border-b border-default">
                    <td className="px-6 py-4"> {reviews.product_id} </td>
                    <td className="px-6 py-4"> {reviews.rating} </td>
                    <td className="px-6 py-4"> {reviews.content} </td>
                    <td className="px-6 py-4"> {reviews.date} </td>
                  </tr>
                  </>
                ))
              }
            </tbody>
          </table>
        </div>
      }
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 mt-4 grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="customer_name">Customer name</label>
          <input type="text" name="customer_name" className="border border-gray-300 rounded-md p-2" placeholder="Customer name" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="product_id">Product ID</label>
          <input type="text" name="product_id" className="border border-gray-300 rounded-md p-2" placeholder="Product ID" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="rating">Rating</label>
          <input type="number" name="rating" className="border border-gray-300 rounded-md p-2" placeholder="Rating" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="content">Content</label>
          <input type="text" name="content" className="border border-gray-300 rounded-md p-2" placeholder="Content" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="date">Date</label>
          <input type="date" name="date" className="border border-gray-300 rounded-md p-2" placeholder="Date" />
        </div>
        <button className="bg-blue-500 text-white p-2 rounded-md w-[30%] cursor-pointer col-span-2" type="submit">Submit</button>
      </form>
    </div>
  );
}
