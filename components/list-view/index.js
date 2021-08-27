import React, {useEffect, useState} from 'react'
import ImageContainer from "../image-container";
import Carousel from "../carousel";
import css from '../../styles/components/list-view.module.scss'
import ListViewContentComponent from "./components/content-component";

const ListView = ({ data }) => {
  const [selectedValue, setSelectedValue] = useState(data[0])
  const [selectedIndex, setSelectedIndex] = useState(0)

  useEffect(() => {
    setSelectedValue(data[0])
    setSelectedIndex(0)
  }, [])

  const onSelectItem = key => {
    setSelectedValue(data[key])
    setSelectedIndex(key)
  }

  return (
    <div className={css.listContainer}>
      <ImageContainer
        className={css.poster}
        src={selectedValue?.imageUrl}
        alt={selectedValue?.name}
      />
      <div className={css.carouselContainer}>
        <Carousel
          list={data}
          viewParam={'name'}
          onSelect={onSelectItem}
          keySelected={selectedIndex}
          ContentComponent={ListViewContentComponent}
        />
      </div>
      <div>{selectedValue.description}</div>
      {/* <Carousel/> */}
      {/* <div>DESCRIPTION</div> */}
    </div>
  )
}

export default ListView
