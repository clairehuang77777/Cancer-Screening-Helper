export const SmallHeaderLayout = ({upperNavigation, lowerSectionProgressBarArea,lowerSectionButtonArea }) => {
  return (
    <div className="background-container">
      <div className="small-layout-upper-section">
        <div className="upper-section-navigation">
        {upperNavigation}
        </div>
      </div>
      <div className="small-layout-lower-section">
        <div className="lower-section-progress-bar-area">
        {lowerSectionProgressBarArea}
        </div>
        <div className="lower-section-button-area">
          {lowerSectionButtonArea}
        </div>
      </div>
    </div>
  )
}