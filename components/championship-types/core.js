import React, {useEffect, useState, useCallback} from 'react'
import {getChampionshipTypes} from "../../firebase/data/championship-types";
import {sortArrayByParam} from "../../services/array";
import {useRouter} from "next/router";

const ChampionshipTypesCore = () => {
  const router = useRouter();
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getData = useCallback(() => {
    setIsLoading(true);
    getChampionshipTypes()
      .then(res => setList(sortArrayByParam(res, 'order')))
      .catch(err => console.log('ERROR_ON_GET_CHAMPIONSHIP_TYPES', err))
      .finally(() => setIsLoading(false))
  }, [])

  const onSelectItem = id => router.push(`championship-types/${id}`)

  useEffect(() => {
    getData()
  }, [])

  return [list, isLoading, getData, onSelectItem]
}

export default ChampionshipTypesCore
