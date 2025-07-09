# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.1] - 2025-07-06

### Fixed

- **Date/time handling**: Replaced native JavaScript Date handling with dayjs library for more reliable date/time operations
- Fixed time validation and formatting inconsistencies across the application
- Improved timezone handling and locale support for date/time display

### Added

- **dayjs integration**: Added dayjs library for consistent date/time manipulation
- **Temporal state management**: New temporal store for centralized date/time handling
- **Event deletion**: Added ability to delete individual events with confirmation toast
- **Database seeding**: Added seed script for development data generation
- **Enhanced time formatting**: Improved time ago display with days, hours, and minutes
- **Locale-aware time handling**: Proper localization support for English and German

### Changed

- **Time input validation**: Enhanced time picker validation using dayjs for more accurate future time detection
- **Event creation**: Updated event creation to use UTC timestamps for consistency
- **Time display**: Improved time ago calculations with better precision and formatting
- **Navigation**: Enhanced locale switching with proper dayjs locale configuration
- **Database queries**: Removed event limit to show all events by default
- **Rate limiting**: Disabled rate limiting in development mode

### Technical Details

- Added dayjs with UTC and relativeTime plugins for robust date/time handling
- Implemented `TemporalStateClass` for centralized temporal operations
- Created `timeAgo()` function for consistent time difference calculations
- Updated internationalization messages to support dynamic time formatting
- Added event deletion API endpoint with proper baby ownership validation
- Enhanced form validation to prevent empty time submissions

### Files Modified

- `package.json` - Added dayjs dependency and updated version to 0.2.1
- `src/lib/stores/temporal.svelte.ts` - New temporal state management
- `src/lib/stores/contexts.ts` - New context definitions
- `src/lib/stores/index.ts` - New store exports
- `src/lib/components/baby-fed-modal.svelte` - Enhanced time validation and UTC handling
- `src/lib/components/nav-bar.svelte` - Improved locale switching with dayjs
- `src/lib/components/past-events.svelte` - Added event deletion and improved time display
- `src/routes/+layout.svelte` - Added temporal state initialization
- `src/routes/[id]/+page.server.ts` - Removed event limit
- `src/routes/[id]/+page.svelte` - Updated event creation with UTC timestamps
- `src/routes/api/baby/[id]/event/+server.ts` - Enhanced event creation with proper timestamp handling
- `src/routes/api/baby/[id]/event/[eventId]/+server.ts` - New event deletion endpoint
- `src/hooks.server.ts` - Disabled rate limiting in development
- `prisma/seed.ts` - New database seeding script
- `messages/en.json` - Updated time formatting messages
- `messages/de-ch.json` - Updated German time formatting messages

## [0.2.0] - 2025-07-06

### Added

- **Event pagination**: Limited initial display to show only the 10 most recent events for better performance
- "Load more" button to fetch all events when needed
- "No more entries" message when all events have been loaded
- Internationalization support for new pagination messages in English and German

### Changed

- Modified database queries to limit initial event loading to 10 most recent entries
- Updated event display component to support pagination functionality
- Enhanced user experience by reducing initial page load time

### Technical Details

- Added `take: 10` and `orderBy: { createdAt: 'desc' }` to database queries
- Implemented `fetchAllEvents()` function to load complete event history
- Added loading states and "hasMore" flag for pagination control
- Updated internationalization files with new pagination messages

### Files Modified

- `src/routes/[id]/+page.server.ts` - Added event limit to database query
- `src/lib/components/past-events.svelte` - Implemented pagination functionality
- `messages/en.json` - Added pagination-related messages
- `messages/de-ch.json` - Added German translations for pagination
- `package.json` - Updated version to 0.2.0

## [0.1.1] - 2025-07-06

### Fixed

- **Time property handling**: Fixed server-side error when time property is not provided in feeding events
- Made time property optional in event creation API to prevent crashes when no custom time is selected
- Updated version to 0.1.1

### Technical Details

- Added null check for `body.time` before attempting to parse time values
- Enhanced server-side event creation to handle cases where time is undefined
- Updated package.json version to reflect the bug fix

### Files Modified

- `src/routes/[id]/+server.ts` - Added optional time handling
- `package.json` - Updated version to 0.1.1

## [0.1.0] - 2025-07-05

### Added

- **Time input for feeding events**: Users can now specify a custom time when recording feeding events
- Time picker component in the baby feeding modal with 24-hour format
- Real-time validation to prevent selecting future times
- Error message display for invalid time selections
- Database schema update to support custom timestamps for events
- Server-side processing of custom time values for event creation

### Changed

- Modified database schema: `Event.createdAt` field is no longer auto-generated with `@default(now())`
- Updated event creation API to accept and process custom time values
- Enhanced form validation to include time validation before submission

### Technical Details

- Added `Timepicker` component from Flowbite-Svelte library
- Implemented client-side time validation with `validateTime()` function
- Updated Prisma schema to remove default timestamp generation
- Enhanced server-side event creation to set custom timestamps
- Added internationalization support for time validation error messages

### Files Modified

- `src/lib/components/baby-fed-modal.svelte` - Added time picker and validation
- `prisma/schema.prisma` - Updated Event model timestamp handling
- `src/routes/[id]/+server.ts` - Enhanced event creation with custom time
- `messages/en.json` - Added time validation error message
- `messages/de-ch.json` - Added German translation for time validation error
- `package.json` - Updated dependencies

## [0.0.1] - Initial Release

### Added

- Initial release of FeedChange baby tracking application
- Privacy-focused baby tracking for feeding sessions and diaper changes
- Built with SvelteKit and designed with parents' privacy in mind
