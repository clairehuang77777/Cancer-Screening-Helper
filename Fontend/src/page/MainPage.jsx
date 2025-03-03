import { Header } from "../components/Header/Header"
import { UpperSectionText } from "../components/UpperSection/UpperSectionText"
import { BigHeaderLayout } from "../components/BigHeaderLayout"
import { FontSizeH2Text } from "../components/LowerSection/item/FontSizeH2Text"
import { FourGridImage } from "../components/LowerSection/item/FourGridImage" 
import { LetGoBtn } from "../components/LowerSection/item/LetGoBtn"

export const MainPage = () =>{
  const text = "政府補助免費篩檢類型"
  
  return (
    <BigHeaderLayout upperNavigation={<Header/>} upperSectionArea={<UpperSectionText/>} SmallLowerSectionTopArea={<FontSizeH2Text text={text}/>} SmallLowerSectionMiddleArea={<FourGridImage/>} SmallLowerSectionButtonArea={<LetGoBtn/>}/>
  )
}