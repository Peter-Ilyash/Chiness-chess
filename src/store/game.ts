/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import _ from 'lodash';
import type { AxiosResponse } from 'axios';
import type { AppAction, RootState } from './store';
import type { Field, FieldRow, FieldCell, Preset } from '../shared/types';
import { requestPresets as apiRequestPresets } from '../api';

interface SetPresetPayload {
	presetName: string;
}

interface ChangeCellModePayload {
	cell: FieldCell;
}

interface GameState {
	field: Field;
	presets: Preset[];
	activePreset: Preset | null;
	isGame: boolean;
}

const getFieldWithSize = (fieldSize: number) => {
	const field: Field = [];

	for (let i = 0; i < Math.trunc(fieldSize / 5); i++) {
		const row: FieldRow = {
			id: _.uniqueId('row'),
			cells: [],
		};

		for (let j = 0; j < 5; j++) {
			if (i * 5 + j >= fieldSize) {
				break;
			}
			row.cells.push({
				id: _.uniqueId('cell'),
				row: i,
				column: j,
				isHovered: false,
			});
		}

		field.push(row);
	}

	return field;
};

export const requestPresets = createAsyncThunk('game/requestPresetsStatus', async () => {
	const response = await apiRequestPresets();
	return (response as AxiosResponse<Preset[]>).data;
});

const gameSlice = createSlice({
	name: 'game',
	initialState: {
		field: [],
		presets: [],
		activePreset: null,
		isGame: false,
	} as GameState,
	reducers: {
		setPreset: (state, { payload }: AppAction<SetPresetPayload>) => {
			const currentPreset =
				state.presets.find((preset) => preset.name === payload.presetName) ?? null;

			state.activePreset = currentPreset;
			state.field = getFieldWithSize(currentPreset!.field);
		},
		changeCellMode: (state, { payload }: AppAction<ChangeCellModePayload>) => {
			const { row, column, isHovered } = payload.cell;
			state.field[row].cells[column].isHovered = !isHovered;
		},
		startGame: (state) => {
			state.isGame = true;
		},
		stopGame: (state) => {
			state.isGame = false;
		},
	},
	extraReducers: (builder) =>
		builder.addCase(requestPresets.fulfilled, (state, { payload }) => {
			const [firstPreset] = payload;
			state.presets = payload;
			state.activePreset = firstPreset;
			state.field = getFieldWithSize(firstPreset.field);
		}),
});

export const { setPreset, changeCellMode, startGame, stopGame } = gameSlice.actions;
export const { reducer: gameReducer } = gameSlice;
export const gameSelector = (state: RootState) => state.game;
