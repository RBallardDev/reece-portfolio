type EngineeringCardProps = {
  title: string;
  type: string;
  summary: string;
};

export default function EngineeringCard({
  title,
  type,
  summary,
}: EngineeringCardProps) {
  return (
    <div className="group rounded-xl border border-white/10 bg-white/0 p-5 transition-colors hover:border-white/25 hover:bg-white/5">
      {/* Image placeholder */}
      <div className="aspect-video w-full rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/30 text-xs mb-4">
        Image placeholder
      </div>
      
      {/* Type label */}
      <p className="text-xs uppercase tracking-wider text-white/50 mb-1">
        {type}
      </p>
      
      {/* Title */}
      <h3 className="text-lg font-semibold text-white mb-2">
        {title}
      </h3>
      
      {/* Summary */}
      <p className="text-sm text-white/60 leading-relaxed">
        {summary}
      </p>
    </div>
  );
}

