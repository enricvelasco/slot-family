import React, {useState, useEffect} from 'react'
import Wrapper from "../../components/wrapper";
import SettingsForm from "../../forms/settings";
import {getSettings, saveSettings} from "../../firebase/data/settings";

const Settings = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [settings, setSettings] = useState(null)

  useEffect(() => {
    getSettings()
      .then(res => setSettings(res[0]))
      .catch(err => console.log('ERROR_ON_GET_DATA', err))
      .finally(() => setIsLoading(false))
  }, [])

  const updateSettings = data => {
    saveSettings(data)
      .then()
      .catch(err => console.log('ERROR_ON_SAVE_SETTINGS', err))
  }
  return (
    <Wrapper>
      {isLoading && <div>Loading list...</div>}
      {!isLoading && <SettingsForm data={settings} onSubmit={updateSettings}/>}
    </Wrapper>
  )
}

export default Settings
