import { Table, TableBody, TableRow, TableCell } from '@mui/material';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Button, Select } from '../../shared';
import { changeCellMode, gameSelector, setPreset, startGame, stopGame } from '../../store/game';
import classes from './GameField.module.scss';

export const GameField = () => {
	const { activePreset, presets, field, isGame } = useAppSelector(gameSelector);

	const dispatch = useAppDispatch();

	return (
		<div className={classes['game-field']}>
			<Select
				value={activePreset!.name ?? ''}
				options={presets.map(({ name }) => ({ name, label: name }))}
				onChange={({ target: { value } }) => dispatch(setPreset({ presetName: value }))}
			/>
			<Button
				label={isGame ? 'Stop' : 'Start'}
				onClick={() => dispatch(isGame ? stopGame() : startGame())}
			/>

			<Table className={classes['game-field__table']}>
				<TableBody>
					{field.map(({ id: rowId, cells }) => (
						<TableRow key={rowId}>
							{cells.map((cell) => (
								<TableCell
									key={cell.id}
									className={classNames(classes['game-field__cell'], {
										[classes['game-field__cell--hovered']]: cell.isHovered,
									})}
									onMouseEnter={() => {
										if (!isGame) {
											return;
										}

										dispatch(changeCellMode({ cell }));
									}}
								/>
							))}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
};
