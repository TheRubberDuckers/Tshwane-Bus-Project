import type { Meta, StoryObj } from '@storybook/react';
import TimetableColumn from './TimetableColumn';

// Example data
const sampleTimes = [
  '05:00', '05:15', '05:30', '05:45', '06:00', '06:15', '06:30',
];

const meta: Meta<typeof TimetableColumn> = {
  title: 'Timetable/TimetableColumn',
  component: TimetableColumn,
};

export default meta;

type Story = StoryObj<typeof TimetableColumn>;

// ✅ Default story
export const Default: Story = {
  args: {
    label: 'Route A1',
    endpoints: 'Soshanguve → Pretoria CBD',
    times: sampleTimes,
    borderRight: true,
  },
};

export const PastTimes: Story = {
  args: {
    label: 'Route B2',
    endpoints: 'Mamelodi → Pretoria CBD',
    times: ['04:00', '04:15', '04:30', '05:00', '05:15'],
    borderRight: true,
  },
};

export const FutureTimes: Story = {
  args: {
    label: 'Route C3',
    endpoints: 'CBD → Hatfield',
    times: ['06:00', '06:15', '06:30', '06:45', '07:00'],
    borderRight: false,
  },
};
