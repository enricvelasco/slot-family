import React, {useEffect, useState} from 'react'
import { useRouter } from 'next/router'
import ImageContainer from "../image-container";
import Carousel from "../carousel";
import css from '../../styles/components/list-view.module.scss'
import ListViewContentComponent from "./components/content-component";
import PencilIcon from "../ui/icons/pencil-icon";
import PlusIcon from "../ui/icons/plus-icon";

const ListView = ({ data }) => {
  console.log('DATA', data)
  const router = useRouter()
  const { pathname } = router
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
      <div className={css.buttonsContainer}>
        <button
          className={css.button}
          onClick={() => router.push(`${pathname}/${selectedValue.id}`)}
        >
          <PencilIcon size={'40'}/>
        </button>
        <button
          className={css.button}
          onClick={() => router.push(`${pathname}/new`)}
        >
          <PlusIcon size={'40'} />
        </button>
      </div>
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
      <div className={css.description}>{selectedValue.description}</div>
      {/* <Carousel/> */}
      {/* <div>DESCRIPTION</div> */}
    </div>
  )
}

export default ListView
