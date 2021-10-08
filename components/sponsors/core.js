import React, {useCallback, useState, useEffect} from 'react'
import {useRouter} from "next/router";
import {sortArrayByParam} from "../../services/array";
import {getSponsors} from "../../firebase/data/sponsors";

const SponsorsCore = () => {
  const router = useRouter()
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getData = useCallback(() => {
    setIsLoading(true);
    getSponsors()
      .then(res => setList(sortArrayByParam(res, 'name')))
      .catch(err => console.log('ERROR_ON_GET_CHAMPIONSHIP_TYPES', err))
      .finally(() => setIsLoading(false))
  }, [])

  const onSelectItem = id => router.push(`sponsors/${id}`)

  useEffect(() => {
    getData()
  }, [])

  return [list, isLoading, getData, onSelectItem]
}

export default SponsorsCore
