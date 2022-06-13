const SidebarLink = ({ Icon, text, active }) => {
  return (
    <div 
    className={`flex items-center justify-center xl:justify-start
    text-l space-x-3 hoverAnimation font-bold ${active && "font-bold"}`}>
        <Icon className="h-7"/>
        <span className="hidden xl:inline">{text}</span>
    </div>
  )
}
export default SidebarLink