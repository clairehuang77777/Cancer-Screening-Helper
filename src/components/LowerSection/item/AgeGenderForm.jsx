import { useContext } from "react"
import { TypeContext } from "../../../TypeContext"
import { useState } from "react"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const AgeGenderForm = () => {
  const { type, SetType } = useContext(TypeContext)
  const [age, setAge] = useState('')
  const [gender, setGender] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    // 當 type 更新後執行這段程式碼
    console.log("Updated Type:", type);
  }, [type]); // 監聽 type 的變化

  const handleTypeReveal = () =>{
    //按下send 打資料到後端server
    //搜集下輸入的age & gender
    //分群 >> 共分成6
    //並把值存到type 裡
    if (age < 30) { 
        SetType(1) // 不論性別，年齡小於 30 都屬於 Type 1
        console.log("Type1",type)
      } else if (age >= 30 && age < 50 && gender === 'male') {
        SetType(2) // 年齡 30-50 且男性
        console.log("Type2",type)
      } else if (age > 75 && gender === 'male') {
        SetType(2) // 年齡大於 75 且男性
        console.log("Type2",type)
      } else if (age >= 30 && age < 44 && gender === 'female') {
        SetType(3) // 年齡 30-44 且女性
        console.log("Type3",type)
      } else if (age > 75 && gender === 'female') {
        SetType(3) // 年齡大於 75 且女性
        console.log("Type3",type)
      } else if (age >= 51 && age <= 75 && gender === 'male') {
        SetType(4) // 年齡 51-75 且男性
        console.log("Type4",type)
      } else if (age >= 45 && age < 50 && gender === 'female') {
        SetType(5) // 年齡 45-50 且女性
        console.log("Type5",type)
      } else if (age >= 51 && age <= 75 && gender === 'female') {
        SetType(6)
        console.log("Type6",type)
      }

  }

  return (
    <form className="formFormat" onSubmit={(event)=>{
      event.preventDefault(),
      handleTypeReveal(),
      navigate("/ResultPage")}}> 
      <div className="question-1">
        <div className="question-1-question">
          <label htmlFor="age">1. 年齡：</label>
            <p id="ageOutput"></p>
        </div>
        <div className="question-1-answer">
          <input type="range" min="1" max="100" defaultValue="50" className="ageSlider" id="ageSlider" name="age" onChange={(event)=>setAge(event.target.value)}></input>
        </div>
      </div>
      <div className="question-2">
        <div className="question-2-question">
          <label htmlFor="gender">2. 性別：</label>
        </div>
        <div className="question-2-answer">
            <input type="radio" id="gender-boy" name="gender" value="male" onChange={(event)=>setGender(event.target.value)}></input>
            <label htmlFor="gender-boy">
              <img className="gender-answer-pic" src="/men.png" alt="boy"></img>
            </label>
            <input type="radio" id="gender-girl" name="gender" value="female" onChange={(event)=>setGender(event.target.value)}></input>
            <label htmlFor="gender-girl">
              <img className="gender-answer-pic" src="/women.png" alt="girl" border="0"></img>
            </label>
          </div>
      </div>
      <button className="checkBtn" type="submit" >查看可篩檢項目</button>
    </form>
  )
}
