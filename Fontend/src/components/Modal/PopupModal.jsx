import { useContext, useState } from "react"
import { PopUpContext } from "../../PopUpContext"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { UserAddressContext } from "../../UserAddressContext"
import { UserLatContext } from "../../UserLatContext"
import { UserLngContext } from "../../UserLngContext"
import clsx from "clsx"

export const PopupModal = () => {
  const {showPopUp, setShowPopUp} = useContext(PopUpContext)
  const {SetUserAddress} = useContext(UserAddressContext)
  const {SetUserLat} = useContext(UserLatContext)
  const {SetUserLng} = useContext(UserLngContext)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  
 

  //使用用戶打開的瀏覽器原生提供的webapi, 取得用戶經緯度位置
  const getCurrentPosition = () => {
    return new Promise((resolve, reject)=> {
      if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(
          (position) => {
            if(position && position.coords){
              const userPosition = position.coords
              SetUserLat(userPosition.latitude)
              SetUserLng(userPosition.longitude)
              axios
                .post('https://cancer-screening-helper.onrender.com/api/location',{
                userLat: userPosition.latitude,
                userLng: userPosition.longitude
              })
              .then(response => {
                const userAddress = response.data.address
                SetUserAddress(userAddress)
                console.log("地址為",userAddress)
                resolve(userAddress)
              })
              .catch(error=> {
                console.error("錯誤為:",error)
                reject(error)
              })
             }
            else {
              console.log("無法取得用戶坐標")
              reject(new Error("無法取得用戶坐標"))
            }
        },(error) => {
          console.error("無法取得你的位置",error.message)
          reject(error)
        }
      )
    } else {
        console.log("你的裝置不支援地理位置功能")
        reject (new Error("你的裝置不支援地理位置功能"))
      }
    }) 
  }

  const determineUserCity = (userAddress) =>{
    console.log("inside determineCity, userAddress,",userAddress)
    const countryCity = userAddress.split('市')
    console.log("inside determineCity, userAddress,",countryCity)
    const addressCity = countryCity[0].split('台湾')
    console.log("inside determineCity, addressCity,",addressCity)
    const city = addressCity[1]
    console.log("inside determineCity, city,",city)
    return city
  }

  const handleAgreeClick = async (event) => {
    event.preventDefault();
    setLoading(true) //開始載入
    try {
      const userAddress = await getCurrentPosition()
      console.log(userAddress)
      const userCity = determineUserCity(userAddress)
      if (!userCity) {
      console.error("未能解析使用者城市");
      return;
    }
      console.log("使用者城市是", userCity)

      if (userCity === "台中" || userCity === "臺中"){
        navigate('/NearByPage')
      } else {
        navigate('/NotSupportingPage')
      }
    } catch(error){
      console.error("處理點擊事件時出錯：",error)
    } finally {
      setLoading(false)
    }
  }

  return (
    showPopUp && (
    <>
    <div className="cover-image">
    </div>
    <div className="pop-up-message">
      <form action="">
        {loading ? (<div className="loading"><div className="bubblingG"><span id="bubblingG_1"></span><span id="bubblingG_2"></span><span id="bubblingG_3"></span></div></div>) : (<p className="pop-up-message-text">允許取得你的位置</p>)}
        <button type="submit" className={clsx("agreePermissionBtn",{ clicked:loading })} onClick={handleAgreeClick}>{loading? "載入中" : "同意"}</button><br></br>
        <button type="submit" className="notAgreePermissionBtn" onClick={()=>setShowPopUp(false)}>下次再說</button>
      </form>
    </div>
    </>
  )  
  )
}