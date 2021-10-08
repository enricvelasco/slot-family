import React, {useEffect, useState, useCallback} from 'react'
import {sortArrayByParam} from "../../services/array";
import {useRouter} from "next/router";
import {getConstructors} from "../../firebase/data/constructors";

const ConstructorsCore = () => {
  const router = useRouter();
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getData = useCallback(() => {
    setIsLoading(true);
    getConstructors()
      .then(res => setList(sortArrayByParam(res, 'name')))
      .catch(err => console.log('ERROR_ON_GET_CHAMPIONSHIP_TYPES', err))
      .finally(() => setIsLoading(false))
  }, [])

  const onSelectItem = id => router.push(`constructors/${id}`)

  useEffect(() => {
    getData()
  }, [])

  return [list, isLoading, getData, onSelectItem]
}

export default ConstructorsCore
