import LoaderText from "@/components/ui/LoaderText"

const LoadingPage = ({ text }: { text?: string }) => {
  return (
    <div className="loading-page">
      <LoaderText loaderSize={28}>
        {text || "Loading"}
      </LoaderText>
    </div>
  )
}

export default LoadingPage