import { useNavigate } from "react-router-dom"

export const LetGoBtn = () => {
  const navigate = useNavigate()
  return (
    <button className="letGoBtn" type="submit" onClick={()=>navigate("/formPage")}>出發</button>
  )
}