import { CheckCircle } from "lucide-react"

export default function AltScoreLogo() {
  return (
    <div className="flex justify-center items-center w-full">
      <div className="flex items-center gap-2">
        <div className="relative w-10 h-10 rounded-full bg-white flex items-center justify-center">
          <div className="absolute inset-0 rounded-full overflow-hidden">
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: "#26A65B", // Solid green background to match the image
              }}
            />
          </div>
          <CheckCircle className="w-5 h-5 text-white z-10" />
        </div>
        <h1 className="text-2xl font-bold text-[#002E42]">AltScore</h1>
      </div>
    </div>
  )
}
