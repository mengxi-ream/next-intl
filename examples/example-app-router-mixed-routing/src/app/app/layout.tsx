import {Metadata} from 'next';
import {NextIntlClientProvider} from 'next-intl';
import {getLocale} from 'next-intl/server';
import {ReactNode} from 'react';
import Document from '@/components/Document';
import AppNavigation from './AppNavigation';
import Logout from './Logout';
import {revalidatePath} from 'next/cache';
import {cookies} from 'next/headers';
import {COOKIE_NAME} from '@/config';
import AppNavigationLocaleButton from './AppNavigationLocaleButton';

type Props = {
  children: ReactNode;
};

export const metadata: Metadata = {
  title: 'next-intl-mixed-routing (app)'
};

export default async function LocaleLayout({children}: Props) {
  const locale = await getLocale();

  async function updateLocaleAction(data: FormData) {
    'use server';

    const store = await cookies();
    store.set(COOKIE_NAME, data.get('locale') as string);

    revalidatePath('/app');
  }

  return (
    <Document locale={locale}>
      <NextIntlClientProvider>
        <div className="flex">
          <div className="flex min-h-[100vh] w-[270px] shrink-0 flex-col justify-between bg-slate-100 p-8">
            <AppNavigation />
            <div className="flex items-center justify-between">
              <form action={updateLocaleAction} className="flex gap-3">
                <AppNavigationLocaleButton locale="en" />
                <AppNavigationLocaleButton locale="de" />
              </form>
              <Logout />
            </div>
          </div>
          <div className="p-8">{children}</div>
        </div>
      </NextIntlClientProvider>
    </Document>
  );
}
