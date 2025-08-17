export default function CategoryCard({ name }) {
  return (
    <div className="p-4 border rounded-xl shadow hover:shadow-lg transition cursor-pointer">
      {name}
    </div>
  )
}
