import { paths } from 'src/routes/paths';

import IconAM from 'src/components/svg/AM';
import { Iconify } from 'src/components/iconify';

import MenuPopUp from './main/nav/desktop/nav-desktop-top-area/menu-pop-up';

// ----------------------------------------------------------------------

export const navData = [
  {
    title: 'Planifica tu visita',
    path: '/pages',
    icon: <Iconify width={22} icon="solar:file-bold-duotone" />,
    children: <MenuPopUp />,
    faqs: {
      pathText: 'Preguntas frecuentes',
      path: paths.about,
      items: [
        [
          {
            title: 'Preguntas frecuentes',
            Description: 'Find out more about our story',
          },
          {
            title: 'Preguntas frecuentes',
            Description: 'Find out more about our story',
          },
          {
            title: 'Preguntas frecuentes',
            Description: 'Find out more about our story',
          },
          {
            title: 'Preguntas frecuentes',
            Description: 'Find out more about our story',
          },
          {
            title: 'Preguntas frecuentes',
            Description: 'Find out more about our story',
          },
        ],
      ],
    },
  },
  {
    title: 'Quiénes somos',
    icon: <Iconify width={22} icon="solar:notebook-bold-duotone" />,
    path: paths.docs,
  },
  {
    title: 'Preservación y Conservación',
    icon: <Iconify width={22} icon="solar:notebook-bold-duotone" />,
    icon2: (
      <IconAM
        width={30}
        height={24}
        style={{
          marginRight: 6,
        }}
      />
    ),
    path: paths.docs,
  },
];
