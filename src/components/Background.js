import Image from "next/image"

export default function Background() {
    return (
        <div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                {/* Logo image with reduced opacity */}
                <Image src="/logo.png" alt="logo" width={800} height={800} style={{ opacity: '0.18' }} />
            </div>
            <div className="absolute top-0 left-0">
                {/* Logo image with reduced opacity */}
                <Image src="/msvmbg.png"  width={2550} height= "3300" alt="logo"  style={{ opacity: '0.3'}} />
            </div>
        </div>
    )
}