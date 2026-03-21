import type { Meta, StoryObj } from '@storybook/react';
import TimetableRow from './TimetableRow';

const meta: Meta<typeof TimetableRow> = {
  title: 'Timetable/TimetableRow',
  component: TimetableRow,
};

export default meta;

type Story = StoryObj<typeof TimetableRow>;

export const Default: Story = {
  args: {
    index: 1,
    time: '05:00',
    isPast: false,
    isNext: false,
  },
};

export const Past: Story = {
  args: {
    index: 2,
    time: '04:30',
    isPast: true,
    isNext: false,
  },
};

export const Next: Story = {
  args: {
    index: 3,
    time: '05:15',
    isPast: false,
    isNext: true,
  },
};

export const PastAndNext: Story = {
  args: {
    index: 4,
    time: '04:45',
    isPast: true,
    isNext: true,
  },
};
