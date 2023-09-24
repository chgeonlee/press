import { useEffect, useState } from 'react';
import press from '@/lib'

export enum ViewportEnum {
	MOBILE,
	TABLET,
	//LAPTOP
}

export default function useViewport() {
	
	const [ viewport, setViewport ] = useState( ViewportEnum.MOBILE )

	useEffect(() => {
		if ( typeof window !== 'object' ) {
			return;
		}

		function handleResize() {
			const { width: w } = press.device.properties
			
			if( w <= 480 ) {
				setViewport( ViewportEnum.MOBILE );
			} else {
				setViewport( ViewportEnum.TABLET );
			}
			
            return;
		}
		handleResize();

		window.addEventListener('resize', handleResize);

		return () => window.removeEventListener('resize', handleResize);

    }, []);

	return viewport;
}
