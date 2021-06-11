import axios from 'axios'
import { useEffect, useState } from 'react'
import ScoopOption from './ScoopOptions'
import Row from 'react-bootstrap/Row'
import ToppingOptions from './ToppingOptions'

export default function Options({ optionType }) {
  const [items, setItems] = useState([])

  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((response) => setItems(response.data))
      .catch((error) => console.log(error))
  }, [optionType])

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
