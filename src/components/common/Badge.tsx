const Badge = ({ children }: { children: string }) => {
  return (
    <span className="badge topleft">
      {children}
    </span>
  )
}

export default Badge
