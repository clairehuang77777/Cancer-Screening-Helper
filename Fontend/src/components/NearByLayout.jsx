export const NearByLayout = ({ upperNavigation, TitleAndMapArea, DetailCardArea}) => {
  return (
    <div className="background-container-small">
      <div className="small-layout-upper-section">
        <div className="upper-section-navigation">
          {upperNavigation}
        </div>
      </div>

      <div className="small-layout-lower-section-map">
        <div className="nearByHospital-text">
          {TitleAndMapArea}
        </div>
        <div className="nearByHospital-detail">
          {DetailCardArea}
        </div>
      </div>
    </div>
  )
}