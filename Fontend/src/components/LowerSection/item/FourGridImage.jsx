export const FourGridImage = () => {
  return (
    <>
    <picture className="cancer1-div">
      <source media="(max-width: 767px)" srcSet="/Group30.svg" />
      <source media="(min-width: 768px)" srcSet="/Group26.svg" />
      <img src="/Group30.svg" alt="說明文字" />
    </picture>
    <picture className="cancer2-div">
      <source media="(max-width: 767px)" srcSet="/Group31.svg" />
      <source media="(min-width: 768px)" srcSet="/Group28.svg" />
      <img src="/Group31.svg" alt="說明文字" />
    </picture>
    <picture className="cancer3-div">
      <source media="(max-width: 767px)" srcSet="/Group32.svg" />
      <source media="(min-width: 768px)" srcSet="/Group29.svg" />
      <img src="/Group32.svg" alt="說明文字" />
    </picture>
    <picture className="cancer4-div">
      <source media="(max-width: 767px)" srcSet="/Group33.svg" />
      <source media="(min-width: 768px)" srcSet="/Group27.svg" />
      <img src="/Group33.svg" alt="說明文字" />
    </picture>
    </>
  )
}