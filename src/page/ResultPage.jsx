import { Header } from "../components/Header/Header"
import { ProgressBarEnd } from "../components/LowerSection/item/ProgressBarEnd"
import { SmallHeaderLayout } from "../components/SmallHeaderLayout"
import { QualifyResult } from "../components/LowerSection/item/QualifyResult"
import { PopupModal } from "../components/Modal/PopupModal"
import { useState } from "react"
import { PopUpContext } from "../PopUpContext"

export const ResultPage = () => {
  const [showPopUp, setShowPopUp] = useState(false)

  return (
    <>
    <PopUpContext.Provider value={{showPopUp, setShowPopUp}}>
      <PopupModal/>
      <SmallHeaderLayout upperNavigation={<Header/>} lowerSectionProgressBarArea={<ProgressBarEnd/>} lowerSectionButtonArea={<QualifyResult/>} />
    </PopUpContext.Provider>
    </>
  )
}