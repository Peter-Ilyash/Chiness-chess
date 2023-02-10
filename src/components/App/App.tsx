import { useState, useEffect } from 'react';
import { gameSelector, requestPresets } from '../../store/game';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { GameField } from '../GameField';
import { Loader } from '../Loader';
import { ResultList } from '../ResultList';
import classes from './App.module.scss';

export const App = () => {
	const { presets, field } = useAppSelector(gameSelector);
	const dispatch = useAppDispatch();
	const [isLoadingError, setLoadingError] = useState<boolean>(false);

	useEffect(() => {
		dispatch(requestPresets())
			.unwrap()
			.catch(() => setLoadingError(true));
	}, [dispatch]);

	return (
		<div className={classes.app}>
			{isLoadingError ? (
				<h1>Something get wrong... Please, try later</h1>
			) : presets.length && field.length ? (
				<>
					<GameField />
					<ResultList />
				</>
			) : (
				<Loader />
			)}
		</div>
	);
};
