/**
 * ترويسة قسم موحّدة — عناوين مدمجة أنيقة بهوية GUPI
 */
export default function SectionHeader({ icon: Icon, eyebrow, title, subtitle, dark = false }) {
  return (
    <div className="text-center mb-10">
      {eyebrow && (
        <div
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-3 ${
            dark
              ? 'bg-white/10 text-gupi-amber-300 border border-white/15'
              : 'bg-gupi-orange-100 text-gupi-orange-700 border border-gupi-orange-200/60'
          }`}
        >
          {Icon && <Icon className="w-3.5 h-3.5" />}
          {eyebrow}
        </div>
      )}
      <h2
        className={`text-xl md:text-2xl font-display font-bold mb-2 ${
          dark ? 'text-white' : 'text-gupi-orange-950'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`text-sm md:text-base max-w-2xl mx-auto leading-relaxed ${
            dark ? 'text-gupi-ink-300' : 'text-gupi-ink-600'
          }`}
        >
          {subtitle}
        </p>
      )}
      {/* فاصل زخرفي — معيّن الهوية */}
      <div className="flex items-center justify-center gap-2 mt-4" aria-hidden="true">
        <span className={`h-px w-12 ${dark ? 'bg-gradient-to-l from-transparent to-gupi-amber-400' : 'bg-gradient-to-l from-transparent to-gupi-orange-400'}`} />
        <span className={`w-1.5 h-1.5 rotate-45 ${dark ? 'bg-gupi-amber-400' : 'bg-gupi-orange-500'}`} />
        <span className={`h-px w-12 ${dark ? 'bg-gradient-to-r from-transparent to-gupi-amber-400' : 'bg-gradient-to-r from-transparent to-gupi-orange-400'}`} />
      </div>
    </div>
  );
}
