import { Header } from "../components/Header/Header"
import { ProgressBar } from "../components/LowerSection/item/ProgressBar"
import { SmallHeaderLayout } from "../components/SmallHeaderLayout"
import { AgeGenderForm } from "../components/LowerSection/item/AgeGenderForm"
import { useEffect } from "react"

export const FormPage = () => {
  useEffect(() => {
    const ageSlider = document.getElementById("ageSlider");
    const ageOutput = document.getElementById("ageOutput");

    if (ageSlider && ageOutput) {
      ageOutput.innerHTML = ageSlider.value;

      ageSlider.oninput = function () {
        ageOutput.innerHTML = this.value;
      };
    }
    
  }, []); // 空依賴陣列確保只在初次渲染時執行

  return (
    <SmallHeaderLayout upperNavigation={<Header/>} lowerSectionProgressBarArea={<ProgressBar/>} lowerSectionButtonArea={<AgeGenderForm/>} />
  )
}