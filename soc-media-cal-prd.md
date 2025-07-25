Below is all the code required to build a **Personal Brand Content Calendar** web application using Next.js with TypeScript. This application provides a 30-day content calendar template with pre-planned post types, optimal posting schedules by platform, and content themes. It also includes GPT prompts to generate platform-specific variations of each post idea via the OpenAI API. The setup guide and complete code for all files are provided.

---

## Setup Guide

To set up and run this project locally, follow these steps:

1. **Install Prerequisites**:
   - Ensure you have Node.js (v16 or later) and npm installed on your system.

2. **Initialize a Next.js Project**:
   ```bash
   npx create-next-app@latest personal-brand-content-calendar --typescript
   ```
   - When prompted, choose the default options or customize as preferred.

3. **Navigate to the Project Directory**:
   ```bash
   cd personal-brand-content-calendar
   ```

4. **Install Additional Dependencies**:
   - Install the OpenAI package for GPT integration:
     ```bash
     npm install openai
     ```

5. **Set Up Environment Variables**:
   - Create a `.env.local` file in the root directory.
   - Add your OpenAI API key (obtainable from the OpenAI website):
     ```
     OPENAI_API_KEY=your-api-key-here
     ```
   - **Note**: Keep this key secret and do not commit it to version control.

6. **Replace or Add the Following Files**:
   - Use the code provided below to create or overwrite files in your project directory.

7. **Run the Development Server**:
   ```bash
   npm run dev
   ```
   - Open your browser to `http://localhost:3000` to see the app.

8. **Optional Deployment**:
   - Push the code to a GitHub repository and deploy to platforms like Vercel or Netlify for public access.

---

## Project Structure and Code

Here’s the complete code for each file, organized by directory. This assumes a standard Next.js project structure.

### 1. `pages/index.tsx`
The main page that loads the calendar and manages its state with local storage.

```typescript
import { useState, useEffect } from 'react';
import CalendarComponent from '../components/Calendar';
import { defaultCalendar } from '../lib/defaultCalendar';

export default function Home() {
  const [calendar, setCalendar] = useState(defaultCalendar);

  useEffect(() => {
    const savedCalendar = localStorage.getItem('calendar');
    if (savedCalendar) {
      setCalendar(JSON.parse(savedCalendar));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('calendar', JSON.stringify(calendar));
  }, [calendar]);

  return <CalendarComponent calendar={calendar} setCalendar={setCalendar} />;
}
```

### 2. `components/Calendar.tsx`
Displays the calendar grid with days organized into weeks.

```typescript
import { Calendar } from '../types';
import Day from './Day';

interface CalendarProps {
  calendar: Calendar;
  setCalendar: (calendar: Calendar) => void;
}

const CalendarComponent: React.FC<CalendarProps> = ({ calendar, setCalendar }) => {
  const daysInMonth = 31; // For July 2025
  const firstDayOfMonth = 2; // Tuesday (0=Sun, 1=Mon, etc.)

  const weeks = [];
  let currentWeek = Array(firstDayOfMonth).fill(null);

  calendar.days.forEach((day) => {
    currentWeek.push(day);
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });

  if (currentWeek.length > 0) {
    weeks.push(currentWeek);
  }

  return (
    <div>
      <h1>{calendar.month}</h1>
      <div className="grid grid-cols-7 gap-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-center font-bold">{day}</div>
        ))}
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="grid grid-cols-7 gap-2">
            {week.map((day, dayIndex) => (
              <Day key={day ? day.date : `empty-${weekIndex}-${dayIndex}`} day={day} setCalendar={setCalendar} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarComponent;
```

### 3. `components/Day.tsx`
Represents a single day in the calendar, displaying the date, theme, and content slots.

```typescript
import { Day as DayType } from '../types';
import ContentSlot from './ContentSlot';

interface DayProps {
  day: DayType | null;
  setCalendar: (calendar: any) => void;
}

const Day: React.FC<DayProps> = ({ day, setCalendar }) => {
  if (!day) return <div className="border p-2 h-32"></div>;

  const updateContent = (type: string, field: string, value: string) => {
    setCalendar((prev: any) => ({
      ...prev,
      days: prev.days.map((d: DayType) =>
        d.date === day.date ? { ...d, content: { ...d.content, [type]: { ...d.content[type], [field]: value } } } : d
      ),
    }));
  };

  return (
    <div className="border p-2 h-32">
      <h3>{day.date}</h3>
      <p>Theme: {day.theme}</p>
      {Object.entries(day.content).map(([type, content]) => (
        <ContentSlot key={type} type={type} content={content} updateContent={updateContent} />
      ))}
    </div>
  );
};

export default Day;
```

### 4. `components/ContentSlot.tsx`
Handles the display and editing of content ideas, schedules, and GPT variation generation for each content type.

```typescript
import { useState } from 'react';
import { Content } from '../types';

interface ContentSlotProps {
  type: string;
  content: Content;
  updateContent: (type: string, field: string, value: string) => void;
}

const ContentSlot: React.FC<ContentSlotProps> = ({ type, content, updateContent }) => {
  const [variation, setVariation] = useState('');

  const generateVariation = async (platform: string) => {
    const res = await fetch('/api/generateVariation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idea: content.idea, platform }),
    });
    const data = await res.json();
    setVariation(data.variation);
  };

  return (
    <div>
      <h4>{type}</h4>
      <input
        type="text"
        value={content.idea}
        onChange={(e) => updateContent(type, 'idea', e.target.value)}
        className="border w-full p-1 mb-1"
      />
      {type === 'socialMedia' ? (
        <div>
          {Object.entries(content.schedule as { [platform: string]: string }).map(([platform, time]) => (
            <div key={platform} className="mb-1">
              <p>{platform}: {time}</p>
              <button
                onClick={() => generateVariation(platform)}
                className="bg-blue-500 text-white px-2 py-1 rounded"
              >
                Generate {platform} post
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>Schedule: {content.schedule as string}</p>
      )}
      {variation && <p className="mt-1">Variation: {variation}</p>}
    </div>
  );
};

export default ContentSlot;
```

### 5. `lib/defaultCalendar.ts`
Defines the default 31-day calendar for July 2025 with pre-planned themes, post types, and schedules.

```typescript
import { Calendar } from '../types';

const themes = [
  "Motivation", "Productivity", "Creativity", "Wellness", "Learning",
  "Innovation", "Leadership", "Teamwork", "Success", "Failure",
  "Goals", "Habits", "Mindset", "Time Management", "Communication",
  "Networking", "Branding", "Marketing", "Sales", "Customer Service",
  "Technology", "Trends", "Future", "Sustainability", "Diversity",
  "Inclusion", "Ethics", "Responsibility", "Community", "Philanthropy",
  "Personal Growth"
];

export const defaultCalendar: Calendar = {
  month: "July 2025",
  days: Array.from({ length: 31 }, (_, i) => ({
    date: `2025-07-${String(i + 1).padStart(2, '0')}`,
    theme: themes[i % themes.length],
    content: {
      socialMedia: {
        idea: `Share something about ${themes[i % themes.length]}`,
        schedule: {
          twitter: "10:00 AM",
          facebook: "2:00 PM",
          instagram: "6:00 PM",
        },
      },
      blog: {
        idea: `Write a blog post about ${themes[i % themes.length]}`,
        schedule: "9:00 AM",
      },
      video: {
        idea: `Create a video about ${themes[i % themes.length]}`,
        schedule: "3:00 PM",
      },
    },
  })),
};
```

### 6. `pages/api/generateVariation.ts`
API route to generate platform-specific content variations using the OpenAI API.

```typescript
import type { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { idea, platform } = req.body;
    const prompt = `Generate a ${platform} post based on this idea: ${idea}`;
    try {
      const response = await openai.completions.create({
        model: 'text-davinci-003',
        prompt: prompt,
        max_tokens: 100,
      });
      const variation = response.choices[0].text.trim();
      res.status(200).json({ variation });
    } catch (error) {
      res.status(500).json({ error: 'Failed to generate variation' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
```

### 7. `types.ts`
TypeScript type definitions for the calendar data structure.

```typescript
export interface Content {
  idea: string;
  schedule: string | { [platform: string]: string };
}

export interface Day {
  date: string;
  theme: string;
  content: {
    socialMedia: Content;
    blog: Content;
    video: Content;
  };
}

export interface Calendar {
  month: string;
  days: Day[];
}
```

### 8. `styles/globals.css`
Basic CSS for styling the calendar (append these rules to the existing file).

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

.grid {
  display: grid;
}

.grid-cols-7 {
  grid-template-columns: repeat(7, 1fr);
}

.gap-2 {
  gap: 0.5rem;
}

.border {
  border: 1px solid #ccc;
}

.p-2 {
  padding: 0.5rem;
}

.h-32 {
  height: 8rem;
  overflow-y: auto;
}

.text-center {
  text-align: center;
}

.font-bold {
  font-weight: bold;
}
```

**Note**: This assumes Tailwind CSS is included (default in `create-next-app`). If not, run `npm install -D tailwindcss postcss autoprefixer` and initialize Tailwind as per the official docs.

### 9. `package.json` (Partial Update)
Ensure the `openai` dependency is added. After running `npm install openai`, your `package.json` should include:

```json
{
  "dependencies": {
    "next": "latest",
    "react": "latest",
    "react-dom": "latest",
    "openai": "^4.0.0"
  }
}
```

---

## Features Overview

- **Calendar Grid**: Displays a 31-day grid for July 2025, starting on a Tuesday, with days organized into weeks.
- **Content Slots**: Each day includes slots for:
  - **Social Media** (Twitter, Facebook, Instagram) with optimal times: 10:00 AM, 2:00 PM, 6:00 PM.
  - **Blog** with an optimal time of 9:00 AM.
  - **Video** with an optimal time of 3:00 PM.
- **Content Themes**: Predefined daily themes (e.g., Motivation, Productivity) cycle through 31 days.
- **Editing**: Users can edit content ideas directly in the input fields.
- **GPT Variations**: Clicking the "Generate [platform] post" button fetches a platform-specific variation using OpenAI.
- **Persistence**: Changes are saved to local storage for persistence across sessions.

---

## Usage

- **View the Calendar**: Open `http://localhost:3000` to see the calendar for July 2025.
- **Edit Content**: Click into any content idea input field to modify it.
- **Generate Variations**: For social media slots, click the "Generate" button next to a platform to see an AI-generated post variation.
- **Reset (Manual)**: Clear local storage via browser tools to revert to the default calendar.

---

This code provides a fully functional Personal Brand Content Calendar as a Next.js web app, complete with all required features. You can extend it by adding schedule editing, error handling, or user authentication as needed.