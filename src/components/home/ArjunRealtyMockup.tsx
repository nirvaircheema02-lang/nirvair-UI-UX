const A = '/assets/projects/arjun-realty/v2/'

/** A compact, layered presentation of two real Arjun Realty screens. */
export function ArjunRealtyMockup() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#e9e8e3] [background-image:radial-gradient(ellipse_at_78%_18%,rgba(255,255,255,0.95),transparent_52%),linear-gradient(145deg,#e9e8e3,#d9dce2)]">
      <div
        className="pointer-events-none absolute inset-[7%] rounded-[50%] border border-white/50"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-[38%] -left-[15%] h-[85%] w-[95%] rounded-[50%] bg-white/35 blur-3xl"
        aria-hidden="true"
      />
      <div className="absolute left-[5%] top-[12%] w-[84%] -rotate-[4deg] overflow-hidden rounded-[0.45rem] border border-white/85 bg-white shadow-[0_28px_50px_-22px_rgba(21,31,62,0.44),0_5px_14px_rgba(21,31,62,0.12)] transition-transform duration-700 ease-out group-hover:-translate-y-1.5 group-hover:-rotate-[2deg] group-focus-visible:-translate-y-1.5 group-focus-visible:-rotate-[2deg] motion-reduce:transform-none">
        <div className="flex h-[19px] items-center gap-1 border-b border-[#e8e8e8] bg-[#fafafa] px-2.5 sm:h-[22px]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#e8ab9c]" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#e7cc88]" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#a8c8a8]" />
          <span className="mx-auto h-[7px] w-[38%] rounded-full bg-[#ececec]" />
        </div>
        <div className="relative">
          <img
            src={`${A}hero.webp`}
            alt="Arjun Realty website homepage with the premium property hero and consultation actions"
            className="block aspect-[1800/930] w-full object-cover object-top"
            loading="lazy"
            decoding="async"
          />
          <span
            className="pointer-events-none absolute left-[7%] top-[21.5%] h-[5%] w-[39%] bg-[#000022]"
            aria-hidden="true"
          />
        </div>
      </div>

      <div className="absolute bottom-[7%] right-[4%] w-[47%] rotate-[4deg] overflow-hidden rounded-[0.4rem] border border-white/90 bg-white shadow-[0_25px_45px_-18px_rgba(21,31,62,0.5),0_4px_12px_rgba(21,31,62,0.14)] transition-transform duration-700 ease-out group-hover:translate-x-1 group-hover:-translate-y-2 group-hover:rotate-[2deg] group-focus-visible:translate-x-1 group-focus-visible:-translate-y-2 group-focus-visible:rotate-[2deg] motion-reduce:transform-none">
        <div className="flex h-[16px] items-center gap-1 border-b border-[#e8e8e8] bg-[#fafafa] px-2 sm:h-[19px]">
          <span className="h-1 w-1 rounded-full bg-[#e8ab9c]" />
          <span className="h-1 w-1 rounded-full bg-[#e7cc88]" />
          <span className="h-1 w-1 rounded-full bg-[#a8c8a8]" />
          <span className="mx-auto h-[6px] w-[38%] rounded-full bg-[#ececec]" />
        </div>
        <img
          src={`${A}project-detail.webp`}
          alt="Arjun Realty property detail with residence information and enquiry actions"
          className="block aspect-[1500/829] w-full object-cover object-top"
          loading="lazy"
          decoding="async"
        />
      </div>
    </div>
  )
}
