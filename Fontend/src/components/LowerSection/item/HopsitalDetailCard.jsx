import hospitalData from '../../../assets/data/hospitalData.json' 

export const HospitalDetailCard = ({ district }) => {
  //處理某五個區域沒有"區“問題
  const districtWithSuffix = 
      district === '中' || district === '西' || district === '南' || district === '北' || district === '東'
        ? `${district}區`
        : district;

  const filteredHospitalData = hospitalData.filter((hospital) => hospital.District === districtWithSuffix)

    return (
      <>
      {filteredHospitalData.map((hospital, index)=> (
      <div key={index} className="nearByHospital-detail-card">
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