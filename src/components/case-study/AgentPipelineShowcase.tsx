/** Actual workflow capture, bounded so the complete diagram stays visible. */
export function AgentPipelineShowcase() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl bg-[#171b24] p-4 text-white sm:p-5">
      <div className="flex shrink-0 items-center justify-between gap-3 border-b border-white/15 pb-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.13em] text-white/75">Audit → Review → Fix & verify</span>
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#b9c8ff]" aria-hidden />
      </div>
      <div className="mt-3 min-h-0 flex-1 overflow-hidden rounded-md bg-white">
        <img src="/assets/projects/agent-pipeline/redesign-system.png" alt="Actual agent workflow: audit evidence and design-system rules feed the correction pipeline, measured preview, human review and Figma handoff" width="1077" height="789" className="h-full w-full object-contain" loading="lazy" decoding="async" />
      </div>
    </div>
  )
}
