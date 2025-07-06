import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import de from 'dayjs/locale/de';
import en from 'dayjs/locale/en';
import { getContext, setContext } from 'svelte';

import { Contexts } from './contexts';
interface TemporalState {
	currentLocale: 'en' | 'de';
	locales: {
		en: typeof en;
		de: typeof de;
	};
}

class TemporalStateClass implements TemporalState {
	private instance: Dayjs;
	currentLocale = $state<TemporalState['currentLocale']>('en');
	locales: { en: typeof en; de: typeof de };
	constructor() {
		this.instance = dayjs();
		this.currentLocale = 'en';
		this.instance.locale(en);
		this.locales = { en, de };
	}

	public setLocale(locale: 'en' | 'de') {
		this.currentLocale = locale;
		this.instance.locale(locale === 'en' ? en : de);
	}

	public getLocale() {
		return this.currentLocale;
	}
}

export function initTemporalState() {
	const temporalState = new TemporalStateClass();
	setContext(Contexts.Temporal, temporalState);
	return temporalState;
}

export function getTemporalState(): typeof TemporalStateClass {
	const state = getContext<typeof TemporalStateClass>(Contexts.Temporal);
	if (!state) {
		throw new Error('Temporal state not defined.');
	}
	return state;
}
