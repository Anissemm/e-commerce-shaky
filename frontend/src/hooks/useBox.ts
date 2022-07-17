import React, { useEffect, useRef, useState } from 'react';
import debounce from 'lodash.debounce'

export const useClientBox = () => {
    const ref = useRef(null);
    const [bbox, setBbox] = useState({} as DOMRect);

    const set = debounce(() =>
        setBbox(ref && ref.current ? (ref.current as HTMLElement).getBoundingClientRect() : {} as DOMRect ), 50);

    useEffect(() => {
        set();
        window.addEventListener('resize', set);
        return () => window.removeEventListener('resize', set);
    }, []);

    const returnValues: [DOMRect, React.MutableRefObject<null | HTMLElement>] = [bbox, ref]
    return returnValues
};