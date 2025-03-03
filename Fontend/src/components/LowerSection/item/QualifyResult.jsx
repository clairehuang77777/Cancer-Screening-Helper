import { useContext, useDebugValue } from "react"
import { PopUpContext } from "../../../PopUpContext"
import { useState } from "react"
import clsx from "clsx"
import { TypeContext } from "../../../TypeContext"
import { useEffect } from "react"
import { ProgressBarChangeContext } from "../../../ProgressBarChangeContext"

export const QualifyResult = () => {
  const {setShowPopUp} = useContext(PopUpContext)
  const {type} = useContext(TypeContext)
  const {secondStepStatus, setSecondStepStatusStepStatus} = useContext(ProgressBarChangeContext)
  
  //調整可做篩檢結果的CSS變數
  const [oralCancer, setOralCancer] = useState(false)
  const [breastCancer, setBreastCancer] = useState(false)
  const [cervixCancer, setCervixCancer] = useState(false)
  const [colonCancer, setColonCancer] = useState(false)

  //依type調整可篩檢顯示項目

  useEffect(()=>{
    //初始化所有狀態
    setOralCancer(false)
    setBreastCancer(false)
    setCervixCancer(false)
    setColonCancer(false)
  
  if ( type === 2 ) {
    setOralCancer(true)
  } else if (type=== 3) {
    setOralCancer(true)
    setCervixCancer(true)
  } else if (type === 4) {
    setOralCancer(true)
    setColonCancer(true)
  } else if (type === 5){
    setOralCancer(true)
    setBreastCancer(true)
    setCervixCancer(true)
  } else if (type === 6){
    setOralCancer(true)
    setBreastCancer(true)
    setCervixCancer(true)
    setColonCancer(true)
  }
},[type])
//只有當type改變才會執行這段邏輯

  function handleNearByClick(){
    setShowPopUp(true),
    setSecondStepStatusStepStatus(true)
  }

  return (
    <>
    <div className="lower-section-result-area-text">
        以您的年齡及性別，你能做的癌症篩檢項目為：
    </div>
      <div className="lower-section-result-area-four-box">
        <div className="cancer1-area">
          <img className={clsx("cancer1", {checked: oralCancer})} src="/Group33.svg"></img>
          <img className="checkicon1" src="/checkicon.png"></img>
        </div>
        <div className="cancer2-area">
          <img className={clsx("cancer2", {checked: breastCancer})} src="/Group30.svg"></img>
          <img className="checkicon2" src="/checkicon.png"></img>
        </div>
        <div className="cancer3-area">
          <img className={clsx("cancer3", {checked: cervixCancer})} src="/Group31.svg"></img>
          <img className="checkicon3" src="/checkicon.png"></img>
        </div>
        <div className="cancer3-area">
          <img className={clsx("cancer4", {checked: colonCancer})} src="/Group32.svg"></img>
          <img className="checkicon4" src="/checkicon.png"></img>
        </div>
        
      </div>
      <button className="NearByBtn" type="submit" 
      onClick={handleNearByClick}>查看鄰近醫院 </button>
    </>
  )
}