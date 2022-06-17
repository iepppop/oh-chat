import { useRouter } from "next/router";
import { useEffect } from "react";


const ScrollToTop = () => {
    const router = useRouter();
    const pathname = router.pathname;

    useEffect(() => {
        window.scrollTo(0, 0);
      }, [pathname]);    

    return null;
}    

export default ScrollToTop;