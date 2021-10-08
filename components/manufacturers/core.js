import React, {useState, useCallback, useEffect} from 'react'
import {useRouter} from "next/router";
import {sortArrayByParam} from "../../services/array";
import {getManufacturers} from "../../firebase/data/manufacturers";

const ManufacturersCore = () => {
  const router = useRouter();
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getData = useCallback(() => {
    setIsLoading(true);
    getManufacturers()
      .then(res => setList(sortArrayByParam(res, 'name')))
      .catch(err => console.log('ERROR_ON_GET_CHAMPIONSHIP_TYPES', err))
      .finally(() => setIsLoading(false))
  }, [])

  const onSelectItem = id => router.push(`manufacturers/${id}`)

  useEffect(() => {
    getData()
  }, [])

  return [list, isLoading, getData, onSelectItem]
}

export default ManufacturersCore
