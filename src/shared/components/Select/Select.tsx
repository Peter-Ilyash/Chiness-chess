import type { StandardTextFieldProps, MenuItemProps } from '@mui/material';
import { TextField, MenuItem } from '@mui/material';
import classNames from 'classnames';
import classes from './Select.module.scss';

export interface SelectOption extends MenuItemProps {
	name: string;
	label: string;
}

export interface SelectProps extends StandardTextFieldProps {
	value: string;
	options: SelectOption[];
	className?: string;
}

export const Select = ({ value, options, className, ...props }: SelectProps) => (
	<TextField
		className={classNames(classes.select, className)}
		select
		label="Pick mode"
		value={value}
		size="small"
		{...props}
	>
		{options.map(({ name, label, ...optionProps }) => (
			<MenuItem key={name} value={name} {...optionProps}>
				{label}
			</MenuItem>
		))}
	</TextField>
);
