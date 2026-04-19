export default function Sidebar_Item({ route, active, onClick }) {
  return (
    <div className="">
      <div
<<<<<<< HEAD
        className={`sidebar-item ${active ? "active" : ""} border-b border-[#d8f3dc] h-12 hover:bg-[#d8f3dc] w-80 pt-4 text-sm pl-2`}
=======
        className={`sidebar-item ${active ? "active" : ""} border-b-2 border-green-100 h-12 hover:bg-green-100 w-80 pt-4 text-sm`}
>>>>>>> parent of f2d580d (Updated colors to be more acurate)
        onClick={onClick}
      >
        {route.name}
      </div>
    </div>
  );
}
