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
        以您的年齡及性別，<br></br>你能做的癌症篩檢項目為：
    </div>
      <div className="lower-section-result-area-four-box">
        <img className={clsx("cancer1", {checked: oralCancer})} src="https://res.cloudinary.com/daxegohhe/image/upload/v1736915432/%E5%8F%A3%E8%85%94_rymq53.png"></img>
        <img className={clsx("cancer2", {checked: breastCancer})} src="https://res.cloudinary.com/daxegohhe/image/upload/v1736915432/%E4%B9%B3%E7%99%8C_jjqf5a.png"></img>
        <img className={clsx("cancer3", {checked: cervixCancer})} src="https://res.cloudinary.com/daxegohhe/image/upload/v1736915432/%E5%AD%90%E5%AE%AE_imu2vx.png"></img>
        <img className={clsx("cancer4", {checked: colonCancer})} src="https://res.cloudinary.com/daxegohhe/image/upload/v1736915432/%E5%A4%A7%E8%85%B8%E7%99%8C_r7ndhm.png"></img>
      </div>
      <button className="NearByBtn" type="submit" 
      onClick={()=>setShowPopUp(true)}>查看鄰近醫院 </button>
    </>
  )
}