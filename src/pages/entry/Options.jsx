import axios from 'axios'
import { useEffect, useState } from 'react'
import ScoopOption from './ScoopOptions'
import Row from 'react-bootstrap/Row'
import ToppingOptions from './ToppingOptions'
import AlertBanner from '../common/AlertBanner'

export default function Options({ optionType }) {
  const [items, setItems] = useState([])
  const [error, setError] = useState(false)

  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((response) => setItems(response.data))
      .catch((error) => setError(true))
  }, [optionType])

  if (error) {
    return <AlertBanner></AlertBanner>
  }
  const ItemComponent = optionType === 'scoops' ? ScoopOption : ToppingOptions

  const optionsItems = items.map((item, index) => (
    <ItemComponent
      key={index}
      name={item.name}
      imagePath={item.imagePath}
    ></ItemComponent>
  ))

  return <Row>{optionsItems}</Row>
}
