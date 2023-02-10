import { List, ListItem, ListItemText } from '@mui/material';
import { useAppSelector } from '../../store/hooks';
import { Heading, HeadingTag } from '../../shared';
import classes from './ResultList.module.scss';
import { gameSelector } from '../../store/game';

export const ResultList = () => {
	const { field } = useAppSelector(gameSelector);

	return (
		<div className={classes['result-list']}>
			<Heading Tag={HeadingTag.SECTION} text="Hover squares" />
			<List>
				{field
					.flatMap(({ cells }) => cells)
					.filter((cell) => cell.isHovered)
					.map(({ id, row, column }) => (
						<ListItem key={id} className={classes['result-list__item']}>
							<ListItemText primary={`row ${row + 1} column ${column + 1}`} />
						</ListItem>
					))}
			</List>
		</div>
	);
};
