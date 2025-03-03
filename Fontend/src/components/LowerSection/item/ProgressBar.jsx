import { useRef, useEffect, useContext } from "react"
import { ProgressBarChangeContext } from "../../../ProgressBarChangeContext"

export const ProgressBar = () => {
  //第一個step會變化的(原點+線條)
  const FirstStepDOM = useRef(null)
  const SecondStepDOM = useRef(null)
  const ThirdStepDOM = useRef(null)
  
  const {firstStepStatus, setFirstStepStatus,secondStepStatus, setSecondStepStatusStepStatus} = useContext(ProgressBarChangeContext)

  console.log(firstStepStatus)
  console.log(secondStepStatus)

  useEffect(()=>{
    if(firstStepStatus){
      console.log(FirstStepDOM.current.className)
      FirstStepDOM.current.classList.remove("current")
      FirstStepDOM.current.classList.add("visited")
      SecondStepDOM.current.classList.add("current")
    }
  },[firstStepStatus])
  
  useEffect(()=>{
    if (secondStepStatus){
      console.log(SecondStepDOM.current.className)
      FirstStepDOM.current.classList.remove("current")
      FirstStepDOM.current.classList.add("visited")
      SecondStepDOM.current.classList.remove("current")
      SecondStepDOM.current.classList.add("visited")
      ThirdStepDOM.current.classList.add("current")
    }
  },[secondStepStatus])

  return (
    <>
    <ol className="cd-multi-steps text-top">
			<li ref={FirstStepDOM} className="current">
        <a className="progress-bar-title">資格確認</a>
      </li>
			<li ref={SecondStepDOM}>
        <a className="progress-bar-title">資格結果</a>
      </li>
			<li ref={ThirdStepDOM}>
        <a className="progress-bar-title">鄰近診所</a>
      </li>
		</ol>
    </>
  )
}