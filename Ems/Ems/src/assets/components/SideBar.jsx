

const SideBar = ({ activeTab, setActiveTab }) => {
  return (
    <div className="sidebar">
      <p className="sidebar-brand">Employee Details</p>

      <nav className="sidebar-nav">
        <button  onClick={()=>setActiveTab("info")}>Employees Info</button>
        <button onClick={()=>setActiveTab("attendence")}>Attendence</button>   

        <button  onClick={()=>setActiveTab("hike")}>Perfomance Evaluation</button>
      </nav>
    </div>
  )
}

export default SideBar