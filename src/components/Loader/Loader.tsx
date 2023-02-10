import { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';
import classNames from 'classnames';
import classes from './Loader.module.scss';

export const Loader = () => {
	const [isVisible, setVisibility] = useState<boolean>(false);

	useEffect(() => {
		const showTimeout = setTimeout(() => setVisibility(true), 2000);
		return () => clearTimeout(showTimeout);
	}, []);

	return (
		<CircularProgress
			className={classNames(classes.loader, { [classes['loader--visible']]: isVisible })}
		/>
	);
};
