import type { HTMLAttributes } from 'react';
import classNames from 'classnames';
import classes from './Heading.module.scss';

export enum HeadingTag {
	'PAGE' = 'h1',
	'SECTION' = 'h2',
	'SUB_SECTION' = 'h3',
}

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
	Tag: HeadingTag;
	className?: string;
	text: string;
}

export const Heading = ({ Tag, text, className, ...attributes }: HeadingProps) => (
	<Tag className={classNames(classes.heading, className)} {...attributes}>
		{text}
	</Tag>
);
