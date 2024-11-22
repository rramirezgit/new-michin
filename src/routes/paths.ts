import { paramCase } from 'src/utils/change-case';

import { _id, _postTitles } from 'src/_mock/assets';

// ----------------------------------------------------------------------

const MOCK_ID = _id[1];

const MOCK_TITLE = _postTitles[2];

const ROOTS = {
  AUTH: '/auth',
  AUTH_DEMO: '/auth-demo',
  DASHBOARD: '/dashboard',
};

// ----------------------------------------------------------------------

export const getFullPath = (path: string) => `${paths.baseUrl}${path}`;

export const getSocialMediaPath = (
  city?: keyof typeof paths.socialMedia,
  socialMedia?: keyof (typeof paths.socialMedia)[keyof typeof paths.socialMedia]
) => paths.socialMedia[city ?? 'CDMX'][socialMedia ?? 'facebook'];

// 'CDMX' | 'GDL' | 'PUE'
export const paths = {
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || '', // Asegúrate de usar tu variable de entorno aquí
  michin: {
    tickets: '/tickets',
    user: {
      profile: '/user',
    },
  },
  general: {
    quienesSomos: '/quienes-somos',
    comingSoon: '/coming-soon',
  },
  PUE: {
    horariosDireccion: '/puebla-horarios-direccion',
    eventosMapa: '/puebla-eventos-y-mapa',
    actividadesInteracciones: '/puebla-actividades-e-interacciones',
    serviciosInstalaciones: '/puebla-servicios-e-instalaciones',
    politicasAccesos: '/puebla-politicas-de-accesos',
    preguntasFrecuentes: '/puebla-preguntas-frecuentes',
    contacto: '/puebla-contacto',
    terminosCondiciones: '/puebla-terminos-y-condiciones',
    avisoPrivacidad: '/puebla-aviso-de-privacidad',
    quienesSomos: '/puebla-quienes-somos',
    tickets: '/puebla-boletos-y-actividades',
  },
  CDMX: {
    horariosDireccion: '/cdmx-horarios-direccion',
    eventosMapa: '/cdmx-eventos-y-mapa',
    actividadesInteracciones: '/cdmx-actividades-e-interacciones',
    serviciosInstalaciones: '/cdmx-servicios-e-instalaciones',
    politicasAccesos: '/cdmx-politicas-de-accesos',
    preguntasFrecuentes: '/cdmx-preguntas-frecuentes',
    contacto: '/cdmx-contacto',
    terminosCondiciones: '/cdmx-terminos-y-condiciones',
    avisoPrivacidad: '/cdmx-aviso-de-privacidad',
    quienesSomos: '/cdmx-quienes-somos',
    tickets: '/tickets',
  },
  GDL: {
    horariosDireccion: '/guadalajara-horarios-direccion',
    eventosMapa: '/guadalajara-eventos-y-mapa',
    actividadesInteracciones: '/guadalajara-actividades-e-interacciones',
    serviciosInstalaciones: '/guadalajara-servicios-e-instalaciones',
    politicasAccesos: '/guadalajara-politicas-de-accesos',
    preguntasFrecuentes: '/guadalajara-preguntas-frecuentes',
    contacto: '/guadalajara-contacto',
    terminosCondiciones: '/guadalajara-terminos-y-condiciones',
    avisoPrivacidad: '/guadalajara-aviso-de-privacidad',
    quienesSomos: '/guadalajara-quienes-somos',
    tickets: '/guadalajara-boletos-y-actividades',
  },
  socialMedia: {
    CDMX: {
      facebook: 'https://www.facebook.com/acuariomichin.ciudaddemexico',
      instagram: 'https://www.instagram.com/acuariomichin.ciudaddemexico/',
      youtube: 'https://www.youtube.com/@AcuarioMichinCDMX',
    },
    PUE: {
      facebook: 'https://www.facebook.com/acuariomichinpuebla',
      instagram: 'https://www.instagram.com/acuariomichinpuebla/',
      youtube: 'https://www.youtube.com/channel/UCLtZuqWGqdzY0C7N75yoNSw',
    },
    GDL: {
      facebook: 'https://www.facebook.com/AcuarioMichinGuadalajara',
      instagram: 'https://www.instagram.com/acuariomichinguadalajara/',
      youtube: 'https://www.youtube.com/@AcuarioMichinGuadalajara',
    },
  },

  // minimals

  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: '/pricing',
  payment: '/payment',
  about: '/about-us',
  contact: '/contact-us',
  faqs: '/faqs',
  page403: '/error/403',
  page404: '/error/404',
  page500: '/error/500',
  components: '/components',
  docs: 'https://docs.minimals.cc',
  changelog: 'https://docs.minimals.cc/changelog',
  zoneStore: 'https://mui.com/store/items/zone-landing-page/',
  minimalStore: 'https://mui.com/store/items/minimal-dashboard/',
  freeUI: 'https://mui.com/store/items/minimal-dashboard-free/',
  figma: 'https://www.figma.com/design/cAPz4pYPtQEXivqe11EcDE/%5BPreview%5D-Minimal-Web.v6.0.0',
  product: {
    root: `/product`,
    checkout: `/product/checkout`,
    details: (id: string) => `/product/${id}`,
    demo: { details: `/product/${MOCK_ID}` },
  },
  post: {
    root: `/post`,
    details: (title: string) => `/post/${paramCase(title)}`,
    demo: { details: `/post/${paramCase(MOCK_TITLE)}` },
  },
  // AUTH
  auth: {
    login: '/auth/login',
    amplify: {
      signIn: `${ROOTS.AUTH}/amplify/sign-in`,
      verify: `${ROOTS.AUTH}/amplify/verify`,
      signUp: `${ROOTS.AUTH}/amplify/sign-up`,
      updatePassword: `${ROOTS.AUTH}/amplify/update-password`,
      resetPassword: `${ROOTS.AUTH}/amplify/reset-password`,
    },
    jwt: {
      signIn: `${ROOTS.AUTH}/jwt/sign-in`,
      signUp: `${ROOTS.AUTH}/jwt/sign-up`,
    },
    firebase: {
      signIn: `${ROOTS.AUTH}/firebase/sign-in`,
      verify: `${ROOTS.AUTH}/firebase/verify`,
      signUp: `${ROOTS.AUTH}/firebase/sign-up`,
      resetPassword: `${ROOTS.AUTH}/firebase/reset-password`,
    },
    auth0: {
      signIn: `${ROOTS.AUTH}/auth0/sign-in`,
    },
    supabase: {
      signIn: `${ROOTS.AUTH}/supabase/sign-in`,
      verify: `${ROOTS.AUTH}/supabase/verify`,
      signUp: `${ROOTS.AUTH}/supabase/sign-up`,
      updatePassword: `${ROOTS.AUTH}/supabase/update-password`,
      resetPassword: `${ROOTS.AUTH}/supabase/reset-password`,
    },
  },
  authDemo: {
    split: {
      signIn: `${ROOTS.AUTH_DEMO}/split/sign-in`,
      signUp: `${ROOTS.AUTH_DEMO}/split/sign-up`,
      resetPassword: `${ROOTS.AUTH_DEMO}/split/reset-password`,
      updatePassword: `${ROOTS.AUTH_DEMO}/split/update-password`,
      verify: `${ROOTS.AUTH_DEMO}/split/verify`,
    },
    centered: {
      signIn: `${ROOTS.AUTH_DEMO}/centered/sign-in`,
      signUp: `${ROOTS.AUTH_DEMO}/centered/sign-up`,
      resetPassword: `${ROOTS.AUTH_DEMO}/centered/reset-password`,
      updatePassword: `${ROOTS.AUTH_DEMO}/centered/update-password`,
      verify: `${ROOTS.AUTH_DEMO}/centered/verify`,
    },
  },
  // DASHBOARD
  dashboard: {
    root: ROOTS.DASHBOARD,
    mail: `${ROOTS.DASHBOARD}/mail`,
    chat: `${ROOTS.DASHBOARD}/chat`,
    blank: `${ROOTS.DASHBOARD}/blank`,
    kanban: `${ROOTS.DASHBOARD}/kanban`,
    calendar: `${ROOTS.DASHBOARD}/calendar`,
    fileManager: `${ROOTS.DASHBOARD}/file-manager`,
    permission: `${ROOTS.DASHBOARD}/permission`,
    general: {
      app: `${ROOTS.DASHBOARD}/app`,
      ecommerce: `${ROOTS.DASHBOARD}/ecommerce`,
      analytics: `${ROOTS.DASHBOARD}/analytics`,
      banking: `${ROOTS.DASHBOARD}/banking`,
      booking: `${ROOTS.DASHBOARD}/booking`,
      file: `${ROOTS.DASHBOARD}/file`,
      course: `${ROOTS.DASHBOARD}/course`,
    },
    user: {
      root: `${ROOTS.DASHBOARD}/user`,
      new: `${ROOTS.DASHBOARD}/user/new`,
      list: `${ROOTS.DASHBOARD}/user/list`,
      cards: `${ROOTS.DASHBOARD}/user/cards`,
      profile: `${ROOTS.DASHBOARD}/user/profile`,
      account: `${ROOTS.DASHBOARD}/user/account`,
      edit: (id: string) => `${ROOTS.DASHBOARD}/user/${id}/edit`,
      demo: {
        edit: `${ROOTS.DASHBOARD}/user/${MOCK_ID}/edit`,
      },
    },
    product: {
      root: `${ROOTS.DASHBOARD}/product`,
      new: `${ROOTS.DASHBOARD}/product/new`,
      details: (id: string) => `${ROOTS.DASHBOARD}/product/${id}`,
      edit: (id: string) => `${ROOTS.DASHBOARD}/product/${id}/edit`,
      demo: {
        details: `${ROOTS.DASHBOARD}/product/${MOCK_ID}`,
        edit: `${ROOTS.DASHBOARD}/product/${MOCK_ID}/edit`,
      },
    },
    invoice: {
      root: `${ROOTS.DASHBOARD}/invoice`,
      new: `${ROOTS.DASHBOARD}/invoice/new`,
      details: (id: string) => `${ROOTS.DASHBOARD}/invoice/${id}`,
      edit: (id: string) => `${ROOTS.DASHBOARD}/invoice/${id}/edit`,
      demo: {
        details: `${ROOTS.DASHBOARD}/invoice/${MOCK_ID}`,
        edit: `${ROOTS.DASHBOARD}/invoice/${MOCK_ID}/edit`,
      },
    },
    post: {
      root: `${ROOTS.DASHBOARD}/post`,
      new: `${ROOTS.DASHBOARD}/post/new`,
      details: (title: string) => `${ROOTS.DASHBOARD}/post/${paramCase(title)}`,
      edit: (title: string) => `${ROOTS.DASHBOARD}/post/${paramCase(title)}/edit`,
      demo: {
        details: `${ROOTS.DASHBOARD}/post/${paramCase(MOCK_TITLE)}`,
        edit: `${ROOTS.DASHBOARD}/post/${paramCase(MOCK_TITLE)}/edit`,
      },
    },
    order: {
      root: `${ROOTS.DASHBOARD}/order`,
      details: (id: string) => `${ROOTS.DASHBOARD}/order/${id}`,
      demo: {
        details: `${ROOTS.DASHBOARD}/order/${MOCK_ID}`,
      },
    },
    job: {
      root: `${ROOTS.DASHBOARD}/job`,
      new: `${ROOTS.DASHBOARD}/job/new`,
      details: (id: string) => `${ROOTS.DASHBOARD}/job/${id}`,
      edit: (id: string) => `${ROOTS.DASHBOARD}/job/${id}/edit`,
      demo: {
        details: `${ROOTS.DASHBOARD}/job/${MOCK_ID}`,
        edit: `${ROOTS.DASHBOARD}/job/${MOCK_ID}/edit`,
      },
    },
    tour: {
      root: `${ROOTS.DASHBOARD}/tour`,
      new: `${ROOTS.DASHBOARD}/tour/new`,
      details: (id: string) => `${ROOTS.DASHBOARD}/tour/${id}`,
      edit: (id: string) => `${ROOTS.DASHBOARD}/tour/${id}/edit`,
      demo: {
        details: `${ROOTS.DASHBOARD}/tour/${MOCK_ID}`,
        edit: `${ROOTS.DASHBOARD}/tour/${MOCK_ID}/edit`,
      },
    },
  },
};
