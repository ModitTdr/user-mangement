import LoaderText from "@/components/ui/LoaderText"

const LoadingPage = () => {
  return (
    <div className="loading-page">
      <LoaderText loaderSize={32}>
        Loading
      </LoaderText>
    </div>
  )
}

export default LoadingPage