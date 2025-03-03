import { Header } from "../components/Header/Header"
import { NearByLayout } from "../components/NearByLayout"
import {HospitalDetailCard} from "../components/LowerSection/item/HopsitalDetailCard"
import { TitleAndMap } from "../components/LowerSection/item/TitleAndMap"
//取得用戶位置
import { useContext } from "react"
import { UserAddressContext } from "../UserAddressContext"
import { ProgressBar } from "../components/LowerSection/item/ProgressBar"

export const NearByPage = () => {
  const {userAddress} = useContext(UserAddressContext)
  // const userAddress ="台中市西區五權路2-145號"
  //初始化UserDistrict
  let UsersDistrict = "未知區";

  //**spilt的邏輯要能包含台北市 */
  //把取得的資料只取出區域>>西區
  if(userAddress){
    const words = userAddress.split('市');
    const district = words[1].split('區');
    UsersDistrict = district[0]? `${district[0]}`:"未知區"
    // console.log(UsersDistrict)
  } else {
    console.error("useraddress為空")
  }


  return (
    <NearByLayout upperNavigation={<Header/>} ProgressBarMap={<ProgressBar/>}TitleAndMapArea={<TitleAndMap district={UsersDistrict}/>} DetailCardArea={<HospitalDetailCard district={UsersDistrict}/>} />
  )
}