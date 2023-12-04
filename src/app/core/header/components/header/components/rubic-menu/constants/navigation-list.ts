import { NavigationItem } from '@core/header/components/header/components/rubic-menu/models/navigation-item';
import { EXTERNAL_LINKS, ROUTE_PATH } from '@shared/constants/common/links';

const defaultSrc = 'assets/images/icons/navigation/';

type Section = 'Trade' | 'Social';

export const NAVIGATION_LIST = [
  {
    translateKey: 'navigation.changeNowRecentTrades',
    type: 'internal',
    link: 'changenow-recent-trades',
    imagePath: `${defaultSrc}history.svg`,
    target: '_self'
  },
  {
    translateKey: 'Token Claim',
    type: 'external',
    link: EXTERNAL_LINKS.AIRDROP,
    imagePath: `assets/images/rbc.svg`
  },
  {
    translateKey: 'navigation.sdk',
    type: 'external',
    link: EXTERNAL_LINKS.LANDING_SDK,
    imagePath: `${defaultSrc}sdk.svg`
  },
  {
    translateKey: 'navigation.setupWidget',
    type: 'external',
    link: EXTERNAL_LINKS.LANDING_SETUP_WIDGET,
    imagePath: `${defaultSrc}widget.svg`
  },
  {
    translateKey: 'navigation.faq',
    type: 'internal',
    link: 'faq',
    imagePath: `${defaultSrc}faq.svg`
  },
  {
    translateKey: 'navigation.about',
    type: 'external',
    link: EXTERNAL_LINKS.LANDING,
    imagePath: `${defaultSrc}team.svg`
  }
] as NavigationItem[];

export const MOBILE_NAVIGATION_LIST: { [key in Section]: NavigationItem[] } = {
  ['Trade']: [
    {
      translateKey: 'Swap',
      type: 'internal',
      link: ROUTE_PATH.NONE,
      active: false
    },

    {
      translateKey: 'Revoke Approval',
      type: 'internal',
      link: ROUTE_PATH.REVOKE_APPROVAL,
      active: false
    }
  ],

  ['Social']: [
    {
      translateKey: 'Twitter',
      type: 'external',
      link: 'https://twitter.com/CryptoRubic'
    },
    {
      translateKey: 'Telegram',
      type: 'external',
      link: 'https://t.me/cryptorubic_chat'
    },
    {
      translateKey: 'Discord',
      type: 'external',
      link: 'https://discord.gg/7EYzPbWKFQ'
    },
    {
      translateKey: 'Coinmarketcap',
      type: 'external',
      link: 'https://coinmarketcap.com/currencies/rubic'
    },
    {
      translateKey: 'Coingecko',
      type: 'external',
      link: 'https://www.coingecko.com/en/coins/rubic'
    }
  ]
};
