export default function PaginationButton({
  index,
  currentPage,
  handleChangePage,
}) {
  return (
    <div className="flex flex-col w-10 h-10">
      <button
        key={index}
        className={`p-2 h-full w-full text-base font-semibold text-black ${
          index === currentPage
            ? "border-b-azul-hyde border-b-4 rounded-sm"
            : "hover:bg-slate-200 rounded-md"
        }`}
        onClick={() => handleChangePage(index)}
      >
        {index + 1}
      </button>
    </div>
  );
}
