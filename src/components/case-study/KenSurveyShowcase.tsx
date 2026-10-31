const PROJECT = '/assets/projects/ken-survey/'

type ShowcaseProps = { className?: string; priority?: boolean }

/** A studio laptop composition for the compact homepage work card. */
export function KenSurveyShowcase({ className = '', priority = false }: ShowcaseProps) {
  return (
    <img
      src={`${PROJECT}showcase/survey-laptop-studio-v2.png`}
      alt="Studio presentation of the Survey hub, Brand Perception page and Survey Library"
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      className={`h-full w-full object-cover object-center ${className}`}
    />
  )
}

/** The full Brand Perception page, with two readable details from that same page. */
export function KenSurveyLongPageMockup() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-lg bg-[#e4dfd9]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_37%_24%,#f4f0ec_0%,#e4dfd9_60%,#d7d0ca_100%)]" aria-hidden="true" />
      <div className="pointer-events-none absolute bottom-[8%] left-[18%] h-[12%] w-[68%] rounded-full bg-[#605752]/20 blur-[20px]" aria-hidden="true" />

      <div className="absolute left-[5%] top-[8%] z-10 w-[72%] -rotate-[5deg] overflow-hidden rounded-[3px] border-[4px] border-white bg-white shadow-[0_27px_42px_-18px_rgba(48,38,32,0.42)] sm:left-[9%] sm:w-[65%] sm:border-[7px] lg:left-[12%] lg:w-[60%]">
        <img src={`${PROJECT}v2/bp-home.webp`} alt="Brand Perception opening screen" className="block h-auto w-full" loading="lazy" decoding="async" />
      </div>
      <div className="absolute -bottom-[16%] left-[8%] z-20 w-[63%] rotate-[4deg] overflow-hidden rounded-[3px] border-[4px] border-white bg-white shadow-[0_26px_40px_-18px_rgba(48,38,32,0.45)] sm:left-[13%] sm:w-[55%] sm:border-[7px] lg:left-[20%] lg:w-[48%]">
        <img src={`${PROJECT}v2/bp-method.webp`} alt="Brand Perception research method section" className="block h-auto w-full" loading="lazy" decoding="async" />
      </div>

      {/* The complete page is scaled to the height of this artboard, so every section is visible at once. */}
      <div className="absolute right-[5%] top-[5%] z-30 h-[89%] rotate-[5deg] overflow-hidden rounded-[2px] border-[3px] border-white bg-white shadow-[0_25px_35px_-18px_rgba(48,38,32,0.48)] sm:right-[12%] sm:border-[5px] lg:right-[15%]">
        <img src={`${PROJECT}showcase/brand.jpg`} alt="Complete Brand Perception page from top to bottom" className="block h-full w-auto max-w-none" loading="lazy" decoding="async" />
      </div>
    </div>
  )
}

/** Survey hub on desktop, with two distinct mobile journeys beside it. */
export function KenSurveyResponsiveShowcase() {
  return (
    <div className="h-full w-full overflow-hidden rounded-lg bg-[#292f3b]">
      <picture className="block h-full w-full">
        <source
          media="(max-width: 639px)"
          srcSet={`${PROJECT}showcase/survey-responsive-mixed-mobile-v1.png`}
        />
        <img
          src={`${PROJECT}showcase/survey-responsive-mixed-v1.png`}
          alt="Ken Survey hub on a laptop beside Brand Perception and Employee Engagement mobile previews"
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover object-center sm:object-contain lg:object-cover"
        />
      </picture>
    </div>
  )
}
