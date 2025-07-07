import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import de from 'dayjs/locale/de';
import en from 'dayjs/locale/en';
import relativeTime from 'dayjs/plugin/relativeTime';
import { getContext, setContext } from 'svelte';

import { Contexts } from './contexts';
interface TemporalState {
	currentLocale: 'en' | 'de';
	locales: {
		en: typeof en;
		de: typeof de;
	};
}
type SupportedLocales = 'en' | 'de';

class TemporalStateClass {
	$currentLocale = $state<SupportedLocales>('en');

	constructor(initialLocale: SupportedLocales = 'en') {
		this.$currentLocale = initialLocale;
		dayjs.locale(initialLocale);
		dayjs.extend(relativeTime);
	}

	setLocale(locale: SupportedLocales) {
		this.$currentLocale = locale;
		dayjs.locale(locale);
	}

	getLocale(): SupportedLocales {
		return this.$currentLocale;
	}

	get dayjs(): Dayjs {
		return dayjs(); // uses globally set locale
	}

	to(date: Date): string {
		const toHours = dayjs(date).diff(dayjs(), 'hours');
		const toMinutes = dayjs(date).diff(dayjs(), 'minutes');
		return `${toHours}h ${toMinutes}m`;
	}

	hoursAndMinutesAgo(date: Date): { days: number; hours: number; minutes: number } {
		const minutes = dayjs(date).diff(dayjs(), 'minutes');
		const hours = Math.floor(minutes / 60);
		const days = Math.floor(hours / 24);
		return { days: Math.abs(days), hours: Math.abs(hours % 24), minutes: Math.abs(minutes % 60) };
	}

	now(): string {
		return dayjs().format('HH:mm');
	}
}
export function initTemporalState(locale: TemporalState['currentLocale']) {
	const temporalState = new TemporalStateClass();
	temporalState.setLocale(locale);

	setContext(Contexts.Temporal, temporalState);
	return temporalState;
}

export function getTemporalState(): TemporalStateClass {
	const state = getContext<TemporalStateClass>(Contexts.Temporal);
	if (!state) {
		throw new Error('Temporal state not defined.');
	}
	return state;
}
