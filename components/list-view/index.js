import React, {useEffect, useState} from 'react'
import { useRouter } from 'next/router'
import ImageContainer from "../image-container";
import Carousel from "../carousel";
import css from '../../styles/components/list-view.module.scss'
import ListViewContentComponent from "./components/content-component";
import PencilIcon from "../ui/icons/pencil-icon";
import PlusIcon from "../ui/icons/plus-icon";
import SearchIcon from "../ui/icons/search-icon";
import clsx from "clsx";

const ListView = ({ data, imageClassName }) => {
  const router = useRouter()
  const { pathname } = router
  const [dataList, setDataList] = useState(data)
  const [selectedValue, setSelectedValue] = useState(data[0])
  const [selectedIndex, setSelectedIndex] = useState(0)

  useEffect(() => {
    setSelectedValue(data[0])
    setSelectedIndex(0)
    setDataList(data)
  }, [])

  const onSelectItem = key => {
    setSelectedValue(dataList[key])
    setSelectedIndex(key)
  }

  const onListSearcher = e => {
    const value = e.target.value.toUpperCase()
    if (value.length > 1) {
      const filtered = data.filter(item => !!item.name.toUpperCase().includes(value))
      setDataList(filtered)
    } else {
      setDataList(data)
    }
  }

  return (
    <div className={css.listContainer}>
      <div className={css.buttonsContainer}>
        <div className={css.buttonsGroup}>
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
        <div className={css.searcherContainer}>
          <input type={'search'} onChange={onListSearcher}/>
          <button className={css.button}>
            <SearchIcon size={'40'} />
          </button>
        </div>
      </div>
      <ImageContainer
        className={clsx(css.poster, imageClassName)}
        src={selectedValue?.imageUrl}
        alt={selectedValue?.name}
      />
      <div className={css.carouselContainer}>
        <Carousel
          list={dataList}
          viewParam={'name'}
          onSelect={onSelectItem}
          keySelected={selectedIndex}
          imageClassName={imageClassName}
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
