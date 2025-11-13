# NEET 2026 Tracker

A comprehensive web-based study tracker and planner for NEET 2026 aspirants. This application helps students track their syllabus completion, manage study time, and stay motivated throughout their preparation journey.

## Features

### 1. Countdown Timer
- Real-time countdown to NEET 2026 (Expected: May 3, 2026)
- Displays remaining days, hours, minutes, and seconds
- Helps maintain urgency and time awareness

### 2. Comprehensive Syllabus Tracking
- **Physics**: Complete Class 11 & 12 syllabus (19 chapters)
- **Chemistry**: Physical, Inorganic, and Organic Chemistry (27 topics)
- **Biology**: Botany and Zoology covering all NEET topics (40+ topics)
- Chapter-wise organization with expandable sections
- Track individual topic completion with checkboxes

### 3. Progress Dashboard
- Overall syllabus completion percentage
- Subject-wise progress bars (Physics, Chemistry, Biology)
- Total topics completed counter
- Visual progress indicators for motivation

### 4. Study Timer (Pomodoro-style)
- Customizable study session duration (1-180 minutes)
- Start, Pause, and Reset controls
- Automatic time tracking
- Session completion alerts
- Total study time tracking

### 5. Study Statistics
- Total study time logged (hours and minutes)
- Daily study streak counter
- Automatic streak maintenance
- Last study date tracking

### 6. Search & Filter
- Search topics across all subjects
- Filter topics by:
  - All topics
  - Completed topics
  - Pending topics
- Quick access to specific chapters or topics

### 7. Study Notes
- Built-in notes section
- Auto-save every 30 seconds
- Persistent storage using localStorage
- Manual save option

### 8. Motivational Quotes
- Rotating inspirational quotes
- Auto-refresh every 30 seconds
- Keeps you motivated during study sessions

## How to Use

### Getting Started
1. Open `index.html` in any modern web browser
2. No installation or server required - works offline!
3. All data is saved locally in your browser

### Tracking Your Progress
1. Browse through Physics, Chemistry, and Biology sections
2. Check off topics as you complete them
3. Watch your progress bars fill up automatically
4. Use search to find specific topics quickly
5. Filter to focus on pending or completed topics

### Using the Study Timer
1. Set your desired study duration (default: 25 minutes)
2. Click "Start" to begin your study session
3. Study time is automatically tracked and saved
4. Take breaks when the timer completes
5. Your total study time accumulates in the stats

### Maintaining Your Streak
- Study daily to maintain your streak
- Streak automatically updates when you use the study timer
- Consecutive study days increase your streak counter
- Missing a day resets your streak to 1

### Taking Notes
- Write notes in the provided text area
- Notes are auto-saved every 30 seconds
- Click "Save Notes" for manual save
- Notes persist across sessions

## NEET Syllabus Coverage

### Physics (19 Topics)
- Class 11: Physical World, Kinematics, Laws of Motion, Work & Energy, Gravitation, Thermodynamics, Waves, etc.
- Class 12: Electrostatics, Current Electricity, Magnetism, EMI, Optics, Modern Physics, etc.

### Chemistry (27 Topics)
- Physical Chemistry: Atomic Structure, Thermodynamics, Equilibrium, Kinetics, etc.
- Inorganic Chemistry: Periodic Table, Chemical Bonding, Coordination Compounds, etc.
- Organic Chemistry: Hydrocarbons, Functional Groups, Biomolecules, Polymers, etc.

### Biology (40+ Topics)
- Botany: Plant Kingdom, Morphology, Anatomy, Physiology, Reproduction, etc.
- Zoology: Human Physiology, Reproduction, Genetics, Evolution, Ecology, etc.
- Specialized: Biotechnology, Health, Environment, etc.

## Technical Details

### Technologies Used
- Pure HTML5, CSS3, and JavaScript
- No external dependencies or frameworks
- Responsive design (mobile-friendly)
- LocalStorage for data persistence

### Browser Compatibility
- Chrome/Edge: Fully supported
- Firefox: Fully supported
- Safari: Fully supported
- Opera: Fully supported
- Mobile browsers: Fully responsive

### Data Storage
- All data stored locally using browser's localStorage
- No internet connection required after initial load
- No data sent to external servers (complete privacy)
- Data persists until browser cache is cleared

### Storage Keys
- `neetProgress`: Topic completion data
- `neetStudyStats`: Study time and streak data
- `neetStudyNotes`: User's study notes

## Tips for Effective Use

1. **Set Daily Goals**: Aim to complete 2-3 topics per subject daily
2. **Use the Timer**: Break study into focused 25-50 minute sessions
3. **Track Consistently**: Check off topics immediately after completion
4. **Review Progress**: Check your dashboard weekly to assess progress
5. **Maintain Streak**: Study daily to build momentum
6. **Take Notes**: Document important formulas, concepts, and insights
7. **Search Feature**: Use search when revising specific topics
8. **Filter Pending**: Focus on incomplete topics during intensive revision

## Customization

### Changing Exam Date
Edit line 529 in `index.html`:
```javascript
const examDate = new Date('2026-05-03T09:00:00');
```

### Adding More Topics
Add topics to the `syllabusData` object starting at line 393 in `index.html`.

### Modifying Timer Defaults
Change the default session duration at line 251:
```html
<input type="number" id="sessionMinutes" value="25" min="1" max="180">
```

## Data Backup

To backup your progress:
1. Open browser Developer Tools (F12)
2. Go to Console tab
3. Run: `console.log(localStorage.getItem('neetProgress'))`
4. Copy the output and save to a file

To restore:
1. Open browser Developer Tools (F12)
2. Go to Console tab
3. Run: `localStorage.setItem('neetProgress', 'YOUR_SAVED_DATA')`

## Troubleshooting

**Progress not saving?**
- Ensure JavaScript is enabled
- Check if localStorage is enabled in browser settings
- Clear browser cache and reload

**Timer not working?**
- Check browser console for errors
- Ensure page has focus (some browsers pause background timers)

**Topics not displaying?**
- Refresh the page
- Clear browser cache
- Try a different browser

## Future Enhancements

Potential features for future versions:
- Mock test integration
- Previous year questions tracking
- Revision scheduler
- Performance analytics
- Export/Import progress data
- Dark mode toggle
- Custom topic additions
- Integration with study materials

## Support

For issues or suggestions:
1. Check browser console for errors
2. Verify browser compatibility
3. Try clearing cache and reloading
4. Test in different browser

## License

Free to use for personal educational purposes.

## Motivation

"The journey of NEET preparation is challenging but rewarding. Stay consistent, stay focused, and success will follow. Every topic you complete brings you one step closer to your dream of becoming a doctor!"

---

**Best of luck for NEET 2026! 🎯🏥**
