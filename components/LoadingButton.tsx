import { Loader2 } from "lucide-react"


export function LoadingButton() {
  return (
    <button
      disabled={true}
      className="custom-btn text-primary-blue rounded-full bg-white min-w-[173px] border-2"
    >
      <div className="flex flex-row relative justify-between">
        <Loader2 className="mr-3 animate-spin" />
        <span>
          Please Wait
        </span>
      </div>
    </button>
  )
}

export default LoadingButton