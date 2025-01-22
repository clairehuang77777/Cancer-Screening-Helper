import { useContext, useDebugValue } from "react"
import { PopUpContext } from "../../../PopUpContext"
import { useState } from "react"
import clsx from "clsx"
import { TypeContext } from "../../../TypeContext"
import { useEffect } from "react"

export const QualifyResult = () => {
  const {setShowPopUp} = useContext(PopUpContext)
  const {type} = useContext(TypeContext)
  
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

  return (
    <>
    <div className="lower-section-result-area-text">
        以您的年齡及性別，你能做的癌症篩檢項目為：
    </div>
      <div className="lower-section-result-area-four-box">
        {/* {oralCancer? <img className="checkicon1" src="/checkicon.png"></img>:<></>} */}
        <img className={clsx("cancer1", {checked: oralCancer})} src="/cancer1.png"></img>
        {/* {breastCancer? <img className="checkicon2" src="/checkicon.png"></img>:<></>} */}
        <img className={clsx("cancer2", {checked: breastCancer})} src="/cancer2.png"></img>
        {/* {cervixCancer? <img className="checkicon3" src="/checkicon.png"></img>:<></>} */}
        <img className={clsx("cancer3", {checked: cervixCancer})} src="/cancer3.png"></img>
        {/* {colonCancer? <img className="checkicon4" src="/checkicon.png"></img>:<></>} */}
        <img className={clsx("cancer4", {checked: colonCancer})} src="/cancer4.png"></img>
      </div>
      <button className="NearByBtn" type="submit" 
      onClick={()=>setShowPopUp(true)}>查看鄰近醫院 </button>
    </>
  )
}