# Interview Tracker App

**Type**: Business Requirements Document  
**Version**: 1.0  
**Date**: 2024-01-15  
**Author**: Product Team  
**Status**: Draft  
**Stakeholders**: Product, Design, Engineering Leads

## Executive Summary

Interview Tracker is a mobile/web application that helps job seekers organize and manage their interview schedules. The app consolidates all upcoming interviews in one place, tracks interview rounds per position, and helps users stay organized throughout their job search process. This product addresses the common problem of managing multiple interviews across different companies, dates, and rounds.

## Problem Statement

Job seekers often face challenges when managing multiple interviews simultaneously:

- **Who has this problem?**: Active job seekers who are interviewing with multiple companies, especially those in competitive fields or making career transitions
- **What is the problem?**: 
  - Interviews are scheduled across different platforms (email, calendar apps, phone calls)
  - Difficult to track which company, position, and round each interview represents
  - Easy to lose track of interview details like meeting links, addresses, or round progression
  - No centralized view of all upcoming interviews
  - Hard to remember interview history and progression through rounds
- **Why is this important?**: 
  - Missing or being late to interviews damages professional reputation
  - Poor organization leads to missed opportunities
  - Stress and anxiety from disorganization affects interview performance
  - Time wasted searching for interview details across multiple sources
- **What happens if we don't solve it?**: Job seekers continue to struggle with organization, potentially missing interviews or showing up unprepared, which negatively impacts their job search success rate and mental well-being.

## Business Goals and Success Metrics

### Primary Business Goals
1. **Reduce Interview Miss Rate**: Help users never miss an interview by providing a centralized, reliable tracking system
2. **Improve User Organization**: Enable users to efficiently manage multiple interviews across different companies and rounds
3. **Reduce Job Search Stress**: Provide peace of mind through better organization and visibility
4. **Increase User Engagement**: Create a tool users rely on daily during their job search

### Success Metrics
- **User Adoption**: 1,000 active users within 3 months of launch
- **Interview Tracking**: Average of 5+ interviews tracked per active user
- **Feature Usage**: 80% of users update interview details at least once per week
- **User Satisfaction**: NPS score of 50+ within 6 months
- **Retention**: 60% of users remain active after 30 days
- **Interview Completion Rate**: Users report 95%+ on-time arrival to tracked interviews

### Non-Goals
- **Not a job board**: We are not aggregating job listings or connecting users with employers
- **Not a calendar replacement**: We focus on interview-specific tracking, not general calendar management
- **Not a resume builder**: We do not provide resume creation or editing tools
- **Not a networking platform**: We do not facilitate connections between job seekers and recruiters
- **No AI interview prep**: We focus on organization, not interview preparation content (v1)

## User Personas and Use Cases

### Primary Personas

#### Persona 1: "The Active Job Seeker - Sarah"
- **Name**: Sarah Chen
- **Role**: Software Engineer transitioning to a new company
- **Age**: 28
- **Goals**: 
  - Land a new position within 2 months
  - Keep track of 8-10 active interview processes
  - Never miss an interview or mix up details
- **Pain Points**: 
  - Receives interview invites via email, LinkedIn, and phone calls
  - Has interviews at different stages (phone screens, technical rounds, final rounds)
  - Struggles to remember which company is at which round
  - Sometimes forgets meeting links or addresses
- **Current Workflow**: Uses Google Calendar + Notes app + email inbox, constantly switching between apps

#### Persona 2: "The Career Changer - Marcus"
- **Name**: Marcus Johnson
- **Role**: Marketing professional switching to Product Management
- **Age**: 35
- **Goals**: 
  - Successfully transition to a new field
  - Manage interviews while still working full-time
  - Track progress through multiple interview processes
- **Pain Points**: 
  - Limited time to organize interviews due to current job
  - Needs to quickly reference interview details before calls
  - Wants to see progress across all applications
- **Current Workflow**: Spreadsheet with company names and dates, but loses track of rounds and details

### User Stories

1. **As a job seeker**, I want to add a new interview with company name, job title, and date, so that I have all my interviews in one place.

2. **As a job seeker**, I want to specify whether an interview is virtual (with meeting link) or in-person (with address), so that I know where to go or how to join.

3. **As a job seeker**, I want to track which round each interview represents (e.g., Phone Screen, Technical Round, Final Round), so that I can see my progress through each company's process.

4. **As a job seeker**, I want to update an interview when I pass a round, so that I can track my progression and see what's next.

5. **As a job seeker**, I want to see all my upcoming interviews in a list sorted by date, so that I can quickly see what's coming up.

6. **As a job seeker**, I want to edit interview details (date, time, location, round), so that I can keep information current when things change.

7. **As a job seeker**, I want to see interviews grouped by company, so that I can understand my progress with each company.

### Use Cases

#### Use Case 1: Adding a New Interview
- **Actor**: Job seeker (Sarah)
- **Preconditions**: User has the app installed and is logged in
- **Steps**:
  1. User opens the app and taps "Add Interview"
  2. User enters company name: "TechCorp"
  3. User enters job title: "Senior Software Engineer"
  4. User selects interview date and time from date picker
  5. User selects interview type: "Virtual" or "In-Person"
  6. If Virtual: User enters meeting link (Zoom, Google Meet, etc.)
  7. If In-Person: User enters physical address
  8. User selects round: "Phone Screen", "Technical Round", "Final Round", or "Other"
  9. User taps "Save"
- **Postconditions**: New interview appears in the upcoming interviews list
- **Alternate Flows**: 
  - User cancels: No interview is saved
  - User leaves required fields empty: System shows validation error
  - User enters invalid date (past date): System shows warning but allows save

#### Use Case 2: Updating Interview After Passing a Round
- **Actor**: Job seeker (Marcus)
- **Preconditions**: User has an existing interview for "ProductCorp - Product Manager" at "Phone Screen" round
- **Steps**:
  1. User receives email that they passed the phone screen
  2. User opens the app and finds the ProductCorp interview
  3. User taps on the interview to view details
  4. User taps "Update Round" or "Passed Round"
  5. User selects new round: "Technical Round"
  6. User updates date/time if new interview is scheduled
  7. User updates meeting link/address if changed
  8. User saves changes
- **Postconditions**: Interview now shows as "Technical Round" with updated date/details, previous round is marked as completed
- **Alternate Flows**: 
  - User marks round as "Rejected": Interview is archived or marked as ended
  - User only updates round without date: System keeps existing date, user can update later

#### Use Case 3: Viewing Upcoming Interviews
- **Actor**: Job seeker (Sarah)
- **Preconditions**: User has multiple interviews added
- **Steps**:
  1. User opens the app
  2. User sees list of upcoming interviews sorted by date (soonest first)
  3. Each interview shows: Company name, job title, date/time, round, and location type icon
  4. User can tap any interview to see full details
  5. User can filter by company or round
- **Postconditions**: User can see all upcoming interviews at a glance
- **Alternate Flows**: 
  - No upcoming interviews: System shows empty state with "Add Your First Interview" message
  - Past interviews: System shows them in a separate "Past Interviews" section

## Business Requirements

### Functional Requirements (Business-Focused)

#### BR-1: Interview Creation
- **Description**: Users can create a new interview entry with all essential details
- **User Value**: Users can consolidate all interview information in one place instead of searching through emails and calendars
- **Business Value**: Core functionality that drives user adoption and retention
- **Acceptance Criteria**:
  - [ ] User can enter company name (required field)
  - [ ] User can enter job title (required field)
  - [ ] User can select interview date and time using a date/time picker (required field)
  - [ ] User can select interview type: "Virtual" or "In-Person" (required field)
  - [ ] If Virtual: User can enter meeting link (required when Virtual selected)
  - [ ] If In-Person: User can enter physical address (required when In-Person selected)
  - [ ] User can select interview round from predefined options or enter custom round (required field)
  - [ ] User can save the interview and it appears in their list
  - [ ] System validates all required fields before allowing save
  - [ ] Error handling: System displays clear error messages for missing required fields
- **Priority**: Must Have
- **Dependencies**: None

#### BR-2: Interview Round Tracking
- **Description**: Users can track and update which round each interview represents
- **User Value**: Users can see their progress through each company's interview process and understand what stage they're at
- **Business Value**: Differentiates the product from basic calendar apps by providing interview-specific context
- **Acceptance Criteria**:
  - [ ] System provides predefined round options: "Phone Screen", "Technical Round", "Final Round", "HR Round", "Other"
  - [ ] User can select a round when creating an interview
  - [ ] User can see the current round displayed for each interview
  - [ ] User can update the round for an existing interview
  - [ ] When user updates round, system preserves interview history (shows previous rounds)
  - [ ] User can see interview progression timeline per company
  - [ ] Error handling: System prevents selecting a round that's earlier than current round (e.g., can't go from "Final Round" back to "Phone Screen")
- **Priority**: Must Have
- **Dependencies**: BR-1

#### BR-3: Interview Details Update
- **Description**: Users can edit any interview details including date, time, location, and round
- **User Value**: Users can keep interview information current when schedules change or they progress through rounds
- **Business Value**: Ensures data accuracy and user trust in the app
- **Acceptance Criteria**:
  - [ ] User can view full interview details by tapping on an interview
  - [ ] User can edit company name, job title, date, time, location type, meeting link/address, and round
  - [ ] User can save changes and see updated information reflected immediately
  - [ ] System validates updated information (same validation as creation)
  - [ ] User can cancel editing without saving changes
  - [ ] Error handling: System shows validation errors if updated information is invalid
- **Priority**: Must Have
- **Dependencies**: BR-1, BR-2

#### BR-4: Interview List View
- **Description**: Users can see all their upcoming interviews in a organized list
- **User Value**: Users can quickly see all upcoming interviews at a glance without searching through multiple sources
- **Business Value**: Core value proposition - centralized view drives daily usage
- **Acceptance Criteria**:
  - [ ] System displays all upcoming interviews in a list
  - [ ] Interviews are sorted by date/time (soonest first)
  - [ ] Each list item shows: Company name, job title, date/time, round, and location type indicator
  - [ ] User can tap any interview to view/edit full details
  - [ ] System shows count of upcoming interviews
  - [ ] Past interviews are shown in separate section or filtered out
  - [ ] Empty state: System shows helpful message when no interviews exist
- **Priority**: Must Have
- **Dependencies**: BR-1

#### BR-5: Round Progression Update
- **Description**: Users can mark that they passed a round and update to the next round
- **User Value**: Users can easily track their progress through interview processes and see what's next
- **Business Value**: Encourages regular app usage and provides sense of progress/accomplishment
- **Acceptance Criteria**:
  - [ ] User can mark a round as "Passed" or "Completed"
  - [ ] When marking as passed, user can update to next round
  - [ ] User can update date/time when moving to next round
  - [ ] User can update meeting link/address when moving to next round
  - [ ] System shows interview history (previous rounds completed)
  - [ ] User can see progress timeline: "Phone Screen ✓ → Technical Round → Final Round"
  - [ ] Error handling: User cannot mark round as passed if date hasn't occurred yet (shows warning)
- **Priority**: Must Have
- **Dependencies**: BR-2, BR-3

#### BR-6: Company Grouping View
- **Description**: Users can view interviews grouped by company to see progress per company
- **User Value**: Users can see their progress with each company and understand which companies are at which stages
- **Business Value**: Provides additional organizational value beyond date-based sorting
- **Acceptance Criteria**:
  - [ ] User can toggle between "Date View" and "Company View"
  - [ ] In Company View, interviews are grouped by company name
  - [ ] Each company group shows all interviews for that company
  - [ ] Interviews within each company are sorted by date
  - [ ] User can see round progression per company
  - [ ] User can expand/collapse company groups
- **Priority**: Should Have
- **Dependencies**: BR-4

#### BR-7: Interview Deletion/Archival
- **Description**: Users can remove interviews that are cancelled, rejected, or no longer relevant
- **User Value**: Users can keep their list clean and focused on active opportunities
- **Business Value**: Maintains data quality and user engagement
- **Acceptance Criteria**:
  - [ ] User can delete an interview from detail view
  - [ ] System asks for confirmation before deletion
  - [ ] User can archive interviews (keeps history but removes from active list)
  - [ ] Archived interviews can be viewed in separate section
  - [ ] User can restore archived interviews
  - [ ] Error handling: System prevents accidental deletion with confirmation dialog
- **Priority**: Should Have
- **Dependencies**: BR-4

### Business Rules and Constraints

1. **Interview Round Progression**: Users can only move forward in rounds (cannot go backwards), unless manually editing
2. **Date Validation**: Users can create interviews with past dates (for historical tracking), but system may show a warning
3. **Required Fields**: Company name, job title, date/time, location type, and round are always required
4. **Location Type**: If Virtual is selected, meeting link is required. If In-Person is selected, address is required
5. **Data Retention**: User data is stored locally on device with optional cloud sync (future enhancement)
6. **Privacy**: No interview data is shared with employers or third parties
7. **Accessibility**: App must meet WCAG 2.1 Level AA standards for accessibility

## User Experience Requirements

### User Flows

#### Flow 1: Adding First Interview
1. User opens app (first time)
2. Sees empty state with "Add Your First Interview" CTA
3. Taps "Add Interview"
4. Fills in form: Company, Title, Date, Type, Location, Round
5. Taps "Save"
6. Sees success message and interview appears in list
7. Empty state is replaced with interview list

#### Flow 2: Daily Check-in Before Interview
1. User opens app
2. Sees list of upcoming interviews (sorted by date)
3. Sees interview happening today at top of list
4. Taps interview to view details
5. Sees meeting link/address clearly displayed
6. Can tap link to join meeting or get directions
7. Can quickly reference round and company info

#### Flow 3: Updating After Passing Round
1. User receives email about passing round
2. Opens app and finds company interview
3. Taps interview to view details
4. Taps "Passed Round" or "Update Round"
5. Selects next round from dropdown
6. Updates date/time if provided
7. Updates meeting link if changed
8. Saves changes
9. Sees updated interview with new round and date

### Interaction Patterns
- **Primary Navigation**: Bottom tab bar with "Interviews" and "Settings"
- **List Interaction**: Swipe to archive/delete, tap to view details
- **Form Interaction**: Inline validation, clear error messages, auto-save draft (optional)
- **Date Selection**: Native date/time picker for platform consistency
- **Location Input**: Smart address autocomplete for in-person interviews, URL validation for virtual links

### Content Requirements
- **Empty State**: "You don't have any interviews yet. Tap the + button to add your first interview!"
- **Success Messages**: "Interview added successfully", "Interview updated successfully"
- **Error Messages**: "Please fill in all required fields", "Please enter a valid meeting link", "Please enter a valid address"
- **Round Labels**: Clear, professional labels (Phone Screen, Technical Round, Final Round, HR Round, Other)
- **Tone**: Supportive, professional, encouraging (acknowledging job search stress)

### Accessibility Requirements
- **WCAG 2.1 Level AA Compliance**: Color contrast ratios, keyboard navigation, screen reader support
- **Screen Reader**: All interactive elements have descriptive labels
- **Keyboard Navigation**: Full functionality accessible via keyboard
- **Text Scaling**: App supports system text scaling up to 200%
- **Color Independence**: Information not conveyed by color alone (icons + text)

## Technical Considerations (High-Level)

### Integration Requirements
- **Calendar Integration** (Future): Ability to add interviews to device calendar
- **Email Integration** (Future): Parse interview details from email invites
- **Cloud Sync** (Future): Sync interviews across multiple devices
- **Reminders/Notifications**: Push notifications for upcoming interviews

### Data Requirements
- **User Data**: Company names, job titles, dates/times, locations, rounds, interview history
- **Storage**: Local storage required, cloud storage optional
- **Data Export**: Ability to export interview data (future enhancement)

### Performance Requirements
- **App Launch**: App opens in under 2 seconds
- **List Rendering**: Interview list renders in under 1 second for up to 50 interviews
- **Form Submission**: Save/update operations complete in under 1 second
- **Offline Functionality**: Core features work offline (view, add, edit interviews)

### Platform Requirements
- **Initial Release**: iOS and Android native apps, responsive web app
- **Browser Support**: Chrome, Safari, Firefox (latest 2 versions)
- **Device Support**: iOS 14+, Android 8.0+
- **Screen Sizes**: Support phones and tablets (responsive design)

## Design and Branding

### Visual Style Guidelines
- **Color Palette**: Professional, calming colors (avoid high-stress reds)
- **Typography**: Clear, readable fonts with good hierarchy
- **Icons**: Consistent icon set for rounds, location types, actions
- **Spacing**: Generous whitespace to reduce visual clutter
- **Imagery**: Minimal use of imagery, focus on functionality

### Component Library Usage
- Use platform-native components (iOS Human Interface Guidelines, Material Design)
- Consistent button styles, form inputs, and list items
- Clear visual hierarchy for important information (date, company name)

### Responsive Design Requirements
- **Mobile First**: Optimized for phone screens (primary use case)
- **Tablet Support**: Enhanced layout for tablets with more screen space
- **Web Responsive**: Adapts to different browser window sizes

### Brand Voice and Tone
- **Supportive**: Acknowledge the stress of job searching
- **Professional**: Maintain credibility and trust
- **Encouraging**: Celebrate progress (round completions)
- **Clear**: Direct, unambiguous language
- **Empowering**: Help users feel in control of their job search

## Timeline and Milestones

### Phase 1: MVP (Weeks 1-8)
- **Week 1-2**: Design and wireframes
- **Week 3-4**: Core development (BR-1, BR-2, BR-4)
- **Week 5-6**: Update functionality (BR-3, BR-5)
- **Week 7**: Testing and bug fixes
- **Week 8**: Beta release to 50 users

**MVP Deliverables**: 
- Add interviews with all core fields
- View interview list sorted by date
- Track rounds
- Update interview details
- Basic round progression

### Phase 2: Enhanced Features (Weeks 9-12)
- **Week 9-10**: Company grouping view (BR-6)
- **Week 11**: Deletion/archival (BR-7)
- **Week 12**: Polish, additional testing, public launch

**Dependencies**: 
- Design system must be finalized before development
- User testing feedback from MVP beta

### Phase 3: Future Enhancements (Post-Launch)
- Calendar integration
- Email parsing
- Cloud sync
- Reminders/notifications
- Data export
- Interview statistics/analytics

## Risks and Mitigation

### Business Risks
1. **Low User Adoption**: Job seekers may prefer existing tools (Google Calendar, Notes app)
   - **Mitigation**: Focus on unique value (round tracking, interview-specific features), strong onboarding, user testimonials
2. **Seasonal Usage**: App usage may drop when users find jobs
   - **Mitigation**: Consider expanding to other use cases (networking events, career fairs), referral program for active job seekers
3. **Competition**: Established calendar apps could add interview-specific features
   - **Mitigation**: Focus on interview-specific depth, faster iteration, community building

### Technical Risks
1. **Data Loss**: Local storage could be lost if device fails
   - **Mitigation**: Implement cloud sync in Phase 3, provide export functionality
2. **Performance with Many Interviews**: App may slow down with 50+ interviews
   - **Mitigation**: Implement pagination, efficient data structures, performance testing
3. **Platform Fragmentation**: Different behavior on iOS vs Android vs Web
   - **Mitigation**: Use cross-platform framework (React Native/Flutter) or maintain consistent design system

### Product Risks
1. **Feature Creep**: Users may request many additional features (resume builder, job board, etc.)
   - **Mitigation**: Stay focused on core value proposition, maintain clear non-goals, use user feedback to prioritize
2. **User Confusion**: Round tracking may be confusing for users unfamiliar with interview processes
   - **Mitigation**: Clear onboarding, tooltips, help documentation, default round options

## Open Questions

1. **Round Customization**: Should users be able to create custom round names, or only use predefined options? (Decision: Start with predefined + "Other" option, add customization in future if needed)

2. **Interview History**: How far back should we show interview history? Should completed/rejected interviews be archived automatically? (Decision: Show all interviews, allow manual archival)

3. **Notifications**: What notification strategy should we use? (Decision: Phase 3 feature, start with in-app reminders)

4. **Multi-User**: Should the app support multiple users on one device? (Decision: MVP focuses on single user, multi-user in future)

5. **Data Export Format**: What format should data export use? CSV, JSON, PDF? (Decision: Start with CSV for simplicity)

6. **Interview Status**: Should we track interview status beyond rounds (e.g., "Pending", "Accepted", "Rejected")? (Decision: Focus on rounds for MVP, add status tracking in Phase 2 if needed)

## Appendix

### Glossary
- **Round**: A stage in the interview process (e.g., Phone Screen, Technical Round, Final Round)
- **Virtual Interview**: An interview conducted remotely via video call (Zoom, Google Meet, etc.)
- **In-Person Interview**: An interview conducted at a physical location
- **Interview Progression**: The advancement from one round to the next within a company's interview process

### References
- User research interviews with 10 active job seekers
- Competitive analysis of calendar apps and job search tools
- Industry standards for interview processes (Tech, Finance, Consulting)

### Related Documents
- Design System Guidelines (to be created)
- Technical Requirements Document (to be created)
- User Research Report (to be created)

### Research Notes
- 8 out of 10 job seekers interviewed use multiple tools to track interviews
- Average job seeker manages 5-8 active interview processes simultaneously
- Top pain point: Remembering which company is at which round
- Second pain point: Finding meeting links quickly before interviews
- 90% of interviewees expressed interest in a dedicated interview tracking app

