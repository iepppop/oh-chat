import { useRouter } from "next/router";

const Footer = () => {
    const router = useRouter();
    return (
        <>
      {router.pathname === "/login" || router.pathname === "/register" ? null : (
        <div className="absolute left-0 bottom-0 w-full">
        <div className="border-t">
           <div className="max-w-[800px] m-auto py-2 flex items-center">
            <h1 className="w-[80%] text-[10px] font-semibold">오일리</h1>
            <h2 className="w-[20%] text-right text-[10px] font-semibold">@ohily</h2>
           </div>
        </div>
    </div>
      )}
      </>
    )
}
export default Footer