# AlertBanner

Announces something that needs attention across the whole screen.

- **Critical** (`role="alert"`): a patient needs action now. Raised with `shadow-raised`, includes the bed and the value, and an Acknowledge action.
- **Info** (`role="status"`): planning information, no action required.
- Title says what and where; text says since when and who knows. No exclamation marks.
- Only one critical banner per screen; stack further alerts into a list.
