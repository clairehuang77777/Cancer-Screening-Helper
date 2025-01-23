import { useNavigate } from "react-router-dom"

export const NoSupportLayout = ({ upperNavigation}) => {
  const navigate = useNavigate()

  return (
    <div className="background-container">
      <div className="small-layout-upper-section">
        <div className="upper-section-navigation">
          {upperNavigation}
        </div>
      </div>

      <div className="small-layout-lower-section-sorry">
        <div className="noSupportIcon">
          <img className="sorryImg" src="/sorry.png"></img>
        </div>
        <div className="noSupportText">
          <p>很抱歉！<br></br>目前只支援台中地區！</p>
        </div>
        <button className="BacktoTopBtn"  
      onClick={()=>navigate("/")}>返回首頁 </button>
      </div>
    </div>
  )
}