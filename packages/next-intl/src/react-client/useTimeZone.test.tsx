import {render, screen} from '@testing-library/react';
import {it} from 'vitest';
import {NextIntlClientProvider, useTimeZone} from './index.js';

function Component() {
  const timeZone = useTimeZone();
  return <>{timeZone}</>;
}

it('works without a provider', () => {
  render(
    <NextIntlClientProvider locale="en">
      <Component />
    </NextIntlClientProvider>
  );
});

it('works with a provider', () => {
  render(
    <NextIntlClientProvider locale="en" timeZone="America/New_York">
      <Component />
    </NextIntlClientProvider>
  );
  screen.getByText('America/New_York');
});
