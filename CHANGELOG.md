# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
