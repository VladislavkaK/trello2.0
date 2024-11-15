import type { Metadata } from 'next';

import { Heading } from '@/components/ui/Heading';

import { NO_INDEX_PAGE } from '@/constants/seo.constants';

import { Pomodoro } from './Pomodoro';

export const metadata: Metadata = {
  title: 'Time',
  ...NO_INDEX_PAGE
};

export default function TimerPage() {
  return (
    <div>
      <Heading title='Timer' />
      <Pomodoro />
    </div>
  );
}
