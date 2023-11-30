import React, { useEffect, useState } from "react";
import { useWindowScroll } from "react-use";
import {KeyboardArrowUp} from '@mui/icons-material';
import {useLocation} from "react-router-dom";


const ScrollToTop = () => {
    const {pathname} = useLocation();
    const { y: pageYOffset } = useWindowScroll();
    const [visible, setVisiblity] = useState(false);

    useEffect(() => {
        window.scrollTo({ top: 0,left: 0, behavior: "smooth" })
    }, [pathname]);


    useEffect(() => {
        if (pageYOffset > 200) {
            setVisiblity(true);
        } else {
            setVisiblity(false);
        }
    }, [pageYOffset]);

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

    if (!visible) {
        return false;
    }

    return (
        <div
            className="scroll-to-top cursor-pointer text-center"
            onClick={scrollToTop}
        >
            <KeyboardArrowUp/>
        </div>
    );
};

export default ScrollToTop;