export default function CategoryCard({ name, onClick }) {
  return (
    <div
      onClick={onClick}
      className="p-3 md:p-4 border rounded-xl shadow hover:shadow-lg transition cursor-pointer 
                 flex items-center justify-center text-center
                 text-sm md:text-base font-medium
                 min-w-[80px] md:min-w-[100px] max-w-[120px] md:max-w-[150px]
                 truncate md:break-words"
    >
      {name}
    </div>
  );
}
