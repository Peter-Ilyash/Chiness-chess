import { Button as MuiButton } from '@mui/material';
import type { ButtonProps as MuiButtonProps } from '@mui/material';
import classNames from 'classnames';
import classes from './Button.module.scss';

export interface ButtonProps extends MuiButtonProps {
	label: string;
}

export const Button = ({ label, className, ...props }: ButtonProps) => (
	<MuiButton className={classNames(classes.button, className)} variant="contained" {...props}>
		{label}
	</MuiButton>
);
