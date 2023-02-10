export interface Preset {
	name: string;
	field: number;
}

export interface FieldCell {
	id: string;
	row: number;
	column: number;
	isHovered: boolean;
}

export interface FieldRow {
	id: string;
	cells: FieldCell[];
}

export type Field = FieldRow[];
