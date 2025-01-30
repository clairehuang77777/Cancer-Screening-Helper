import hospitalData from '../../../assets/data/hospitalData.json' 
import { useContext, useEffect } from 'react';
import { UserClickHospitalContext } from '../../../UserClickHospitalContext';

export const HospitalDetailCard = ({ district }) => {
  //處理某五個區域沒有"區“問題
  const districtWithSuffix = 
      district === '中' || district === '西' || district === '南' || district === '北' || district === '東'
        ? `${district}區`
        : district;

  const filteredHospitalData = hospitalData.filter((hospital) => hospital.District === districtWithSuffix)
  const { UserClickHospital, SetUserClickHospital } = useContext(UserClickHospitalContext)
  
  console.log(`拿到更新值 ${UserClickHospital}`)

  
  useEffect(()=>{
  // 如果 UserClickHospital 為空，直接 return
  if (!UserClickHospital) return;

  //透過更新值名稱, 找到對應的hospitalID
  const foundHospital = filteredHospitalData.find((hospital)=> hospital.Name === UserClickHospital)

  if (!foundHospital) {
    console.warn("找不到對應的醫院:", UserClickHospital);
    return; // 找不到就直接 return，避免報錯
  }

  console.log(foundHospital)
  console.log(foundHospital.ID)
  const selectedID = foundHospital.ID

  //當selectedID有變動時
  //透過scrolltoView說要滑動到這個id
  //加入延遲，確保DOM已經渲染完成
  setTimeout(()=> {
    const element = document.getElementById(selectedID)
    element?.scrollIntoView({
        behavior: 'smooth'
      })
    },100)
  },[UserClickHospital, filteredHospitalData])
  


    return (
      <>
      {filteredHospitalData.map((hospital, index)=> (
      <div key={index} className="nearByHospital-detail-card" id={hospital.ID}>
          <div className="hosptialName">{hospital.Name}</div>
          <div className="hosptialPhone">{hospital.Phone}</div>
          <div className="hosptialAddress">{hospital.Address}</div>
          <div className="healthCheckServiceTage"> 癌症篩檢服務</div>
          <div className="healthCheckService">
            <div className="cancer-service-1">
              <div className="cancer-1">乳癌篩檢</div>
              <div className="cancer-1-provided">{hospital.Mammography? "有提供" : "沒有提供"}</div>
            </div>
            <div className="cancer-service-2">
              <div className="cancer-2">口腔癌篩檢</div>
              <div className="cancer-2-provided">{hospital.OralScreening? "有提供" : "沒有提供"}</div>
            </div>
            <div className="cancer-service-3">
              <div className="cancer-3">子宮頸癌篩檢</div>
              <div className="cancer-3-provided">{hospital.papTest? "有提供" : "沒有提供"}</div>
            </div>
            <div className="cancer-service-4">
              <div className="cancer-4">大腸癌篩檢</div>
              <div className="cancer-4-provided">{hospital.FOBT? "有提供" : "沒有提供"}</div>
            </div>
          </div>
        </div>
      ))}
    </>
)}