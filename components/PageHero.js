/**
 * ترويسة موحّدة للصفحات الداخلية — هوية GUPI الداكنة مع مؤثرات خفيفة
 */
export default function PageHero({ icon: Icon, eyebrow, title, subtitle, children }) {
  return (
    <div className="relative hero-gradient text-white overflow-hidden">
      {/* سحب متوهجة + شبكة نقاط */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-gupi-orange-500/25 rounded-full blur-3xl animate-drift" />
        <div className="absolute bottom-0 -left-24 w-80 h-80 bg-gupi-amber-400/15 rounded-full blur-3xl animate-drift-slow" />
        <div className="absolute inset-0 dot-grid opacity-60 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        {eyebrow && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-gupi-amber-300 text-xs font-semibold mb-3">
            {Icon && <Icon className="w-3.5 h-3.5" />}
            {eyebrow}
          </div>
        )}
        <h1 className="text-2xl md:text-3xl font-display font-black mb-2">{title}</h1>
        {subtitle && (
          <p className="text-sm md:text-base text-gupi-ink-300 max-w-2xl mx-auto leading-relaxed">{subtitle}</p>
        )}
        {children}
      </div>
    </div>
  );
}
