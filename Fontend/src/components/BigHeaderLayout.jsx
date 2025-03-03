export const BigHeaderLayout =({upperNavigation, upperSectionArea, SmallLowerSectionTopArea, SmallLowerSectionMiddleArea,SmallLowerSectionButtonArea}) =>{
  return (
    <>
    <div className="background-container-big">
      <div className="big-layout-upper-section">
        <div className="upper-section-navigation">
          {upperNavigation}
        </div>
         <div className="upper-section-textarea">
          {upperSectionArea}
        </div>
      </div>
      <div className="big-layout-lower-section">
        <div className="Small-lower-section-top-area">
          {SmallLowerSectionTopArea}
        </div>
        <div className="Small-lower-section-middle-area">
          {SmallLowerSectionMiddleArea}
        </div>
        <div className="Small-lower-section-button-area">
          {SmallLowerSectionButtonArea}
        </div>
      </div>
    </div>
    </>
  )
}