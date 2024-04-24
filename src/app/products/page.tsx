"use client"

import { Button } from '@/components/Button'
import { Table, TableTr } from '@/components/Table'
import { MainLayout } from '@/layouts'
import { getProducts } from '@/services/prodcts'
import { FakeProduct } from '@/types/fakeProduct'
import React, { useEffect, useState } from 'react'

export default function Products() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<FakeProduct[]>([]);

  const headers = ["id", "Name", "Price", "Category", "Rating", "Actions"]

  function getProductsFunc() {
    getProducts().then((res) => {
      console.log(res.data)
      setProducts(res.data)
      setIsLoading(false)
    }).catch((err) => {
      console.log(err)
      setIsLoading(false)
    })
  }

  useEffect(() => {
    getProductsFunc()
  }, [])

  return (
    <MainLayout  >
      <div>
        <h1 className="text-3xl font-bold text-gray-400">Product</h1>
        <Table headers={headers} isLoading={isLoading}>
          {products.map((product: FakeProduct) => (
            <TableTr key={product.id.toString()}>
              <td >{product.id}</td>
              <td className="max-w-[100px] overflow-hidden text-ellipsis">
                {product.title}
              </td>
              <td >{product.price}</td>
              <td >{product.category}</td>
              <td >{product.rating.rate}</td>
              <td >
                <Button
                  className="text-white bg-blue-400 rounded-md px-2 py-2"
                  href={`/products/detail/${product.id}`}
                >
                  See
                </Button>
              </td>
            </TableTr>
          ))
          }
        </Table>
      </div>
    </MainLayout>)
}