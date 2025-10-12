const FoundationCard = ({
  icon: Icon,
  title,
  description,
  highlight,
  onClick,
}) => {
  return (
    <div
      className={
        `h-full group relative p-6 rounded-2xl flex flex-col shadow-sm transition-all duration-400 ease-out cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#ac1f23] ` +
        (highlight
          ? "bg-gradient-to-br from-orange-50 via-orange-100 to-orange-50 border border-orange-300/60 shadow-[0_4px_18px_-4px_rgba(255,140,0,0.35)] hover:shadow-[0_6px_24px_-4px_rgba(255,140,0,0.45)] hover:-translate-y-1"
          : "bg-gray-100/90 hover:bg-gray-100 hover:-translate-y-1 hover:shadow-md")
      }
      tabIndex={0}
      role="button"
      onClick={onClick}
      onKeyDown={(e) => {
        if (!onClick) return;
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <Icon
            className={
              highlight
                ? "text-[#ac1f23] drop-shadow-md"
                : "text-[#ac1f23] drop-shadow-sm"
            }
            style={{ fontSize: "2rem" }}
          />
        </div>
        <div className="flex-1">
          <h3
            className={`text-lg sm:text-xl font-semibold tracking-wide ${
              highlight ? "text-[#ac1f23]" : "text-gray-800"
            }`}
          >
            {title}
          </h3>
        </div>
      </div>
    </div>
  );
};
export default FoundationCard;
