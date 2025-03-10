import {useTranslations} from 'next-intl';
import {setRequestLocale} from 'next-intl/server';
import {use} from 'react';
import PageTitle from '@/components/PageTitle';

type Props = {
  params: Promise<{locale: string}>;
};

export default function Index({params}: Props) {
  const {locale} = use(params);

  // Enable static rendering
  setRequestLocale(locale);

  const t = useTranslations('Index');
  return <PageTitle>{t('title')}</PageTitle>;
}
