import { createContext, useContext, useState, useMemo, useEffect } from 'react'
import { pricePerItem } from '../constants/index'
const OrderDetails = createContext()

export function useOrderDetails() {
  const context = useContext(OrderDetails)

  if (!context) {
    throw new Error('useOrderDetails must be used within an OrderData')
  }

  return context
}

function calculateSubtotal(optionType, optionCounts) {
  let optionCount = 0
  for (const count of optionCounts[optionType].values()) {
    optionCount += count
  }
  return optionCount * pricePerItem[optionType]
}

export function OrderDetailsProvider(props) {
  const [optionCounts, setOptionCounts] = useState({
    scoops: new Map(),
    toppings: new Map(),
  })

  const [totals, setTotals] = useState({
    scoops: 0,
    toppings: 0,
    grandTotal: 0,
  })

  useEffect(() => {
    const scoopsSubtotal = calculateSubtotal('scoops', optionCounts)
    const toppingsSubstotal = calculateSubtotal('toppings', optionCounts)
    const grandTotal = scoopsSubtotal + toppingsSubstotal

    setTotals({
      scoops: scoopsSubtotal,
      toppings: toppingsSubstotal,
      grandTotal,
    })
  }, [optionCounts])

  const value = useMemo(() => {
    function updateItemCount(itemName, newItemCount, optionType) {
      const newOptionCounts = { ...optionCounts }
      //update option count for this item with the new value
      const optionCountsMap = optionCounts[optionType]
      optionCountsMap.set(itemName, parseInt(newItemCount))
      setOptionCounts(newOptionCounts)
    }
    // getter: object containing option counts for scoops and toppings, subtotals and totals
    // setter: updateOptionCounts
    return [{ ...optionCounts, totals }, updateItemCount]
  }, [optionCounts, totals])

  return <OrderDetails.Provider value={value} {...props} />
}
