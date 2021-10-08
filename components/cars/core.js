import React, {useState, useCallback, useEffect} from 'react'
import {sortArrayByParam} from "../../services/array";
import {getCars} from "../../firebase/data/cars";
import {useRouter} from "next/router";

const CarsCore = () => {
  const router = useRouter()
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getData = useCallback(() => {
    setIsLoading(true);
    getCars()
      .then(res => {
        const arr = res.map(item => ({...item, name: `${item.constructor.name} ${item.model} ${item.year} (${item.manufacturer.name})`}))
        setList(sortArrayByParam(arr, 'name'))
      })
      .catch(err => console.log('ERROR_ON_GET_CHAMPIONSHIP_TYPES', err))
      .finally(() => setIsLoading(false))
  }, [])

  const onSelectItem = id => router.push(`cars/${id}`)

  useEffect(() => {
    getData()
  }, [])

  return [list, isLoading, getData, onSelectItem]
}

export default CarsCore
