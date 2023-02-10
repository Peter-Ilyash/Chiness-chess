import axios from 'axios';
import type { AxiosError, AxiosResponse } from 'axios';
import type { Preset } from './shared/types';

type ResponsePromise<T> = Promise<AxiosResponse<T> | AxiosError<T>>;

const api = axios.create({
	baseURL: 'http://demo7919674.mockable.io/',
});

export const requestPresets = (): ResponsePromise<Preset[]> => api.get('');
