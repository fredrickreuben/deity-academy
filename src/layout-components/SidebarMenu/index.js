import React, { Fragment, Component } from 'react';

import PerfectScrollbar from 'react-perfect-scrollbar';

import RouterLink from '../ReactMetismenuRouterLink';

import MetisMenu from 'react-metismenu';

const sidebarMenuContent = [
  {
    label: 'Dashboards',
    icon: 'pe-7s-safe',
    content: [
      {
        label: 'Default',
        description:
          'This is a dashboard page example built using this template.',
        to: '/DashboardDefault'
      }
    ]
  },
  {
    label: 'Elements',
    icon: 'pe-7s-keypad',
    content: [
      {
        label: 'Buttons',
        description:
          'Wide selection of buttons that feature different styles for backgrounds, borders and hover options!',
        to: '/Buttons'
      },
      {
        label: 'Dropdowns',
        description:
          'A drop-down list is a graphical control element, similar to a list box, that allows the user to choose one value from a list.',
        to: '/Dropdowns'
      },
      {
        label: 'Navigation menus',
        description:
          'Navigation menus are one of the basic building blocks for any web or mobile app.',
        to: '/NavigationMenus'
      },
      {
        label: 'Progress Bars',
        description:
          'You can use the progress bars on their own or in combination with other widgets.',
        to: '/ProgressBars'
      },
      {
        label: 'Pagination',
        description:
          'Basic and dynamic pagination for use in your next awesome application.',
        to: '/Pagination'
      },
      {
        label: 'Scrollable',
        description:
          'Add scrolling areas to any elements with custom scrollbars or default browser ones.',
        to: '/Scrollable'
      },
      {
        label: 'Badges',
        description:
          'Badges and labels are used to offer extra small pieces of info for your content.',
        to: '/Badges'
      },
      {
        label: 'Icons',
        description:
          'Wide icons selection including from flag icons to FontAwesome and other icons libraries.',
        to: '/Icons'
      },
      {
        label: 'Utilities & Helpers',
        description:
          'These are helpers that speed up the dev time for various components and effects.',
        to: '/UtilitiesHelpers'
      }
    ]
  },
  {
    label: 'Cards',
    icon: 'pe-7s-box2',
    content: [
      {
        label: 'Cards examples 3',
        description:
          'Wide selection of cards with multiple styles, borders, actions and hover effects.',
        to: '/Cards3'
      }
    ]
  },
  {
    label: 'List Groups',
    icon: 'pe-7s-id',
    description:
      'These can be used with other components and elements to create stunning and unique new elements for your UIs.',
    to: '/ListGroups'
  },
  {
    label: 'Presentation Blocks',
    icon: 'pe-7s-box2',
    content: [
      {
        label: 'Landing page',
        description: '',
        to: '/LandingPage'
      }
    ]
  },
  {
    label: 'Widgets',
    icon: 'pe-7s-display2',
    content: [
      {
        label: 'Modal dialogs',
        description:
          'Wide selection of modal dialogs styles and animations available.',
        to: '/Modals'
      },
      {
        label: 'Notifications',
        description:
          'Show beautiful, animated growl like notifications or alerts on your pages screens.',
        to: '/Notifications'
      },
      {
        label: 'Carousels',
        description:
          'Create easy, simple to use and beautiful slideshows & carousels with these components.',
        to: '/Carousels'
      },
      {
        label: 'Popovers',
        description:
          'Add small overlay content, like those found in iOS, to any element for housing secondary information.',
        to: '/Popovers'
      },
      {
        label: 'Tooltips',
        description:
          'The tooltip or infotip or a hint is a common graphical user interface element.',
        to: '/Tooltips'
      },
      {
        label: 'Tabs',
        description:
          'Tabs are used to split content between multiple sections. Wide variety available.',
        to: '/Tabs'
      }
    ]
  },
  {
    label: 'Regular Tables',
    icon: 'pe-7s-albums',
    content: [
      {
        label: 'Tables examples 1',
        description: 'Tables are the backbone of almost all web applications.',
        to: '/RegularTables1'
      },
      {
        label: 'Tables examples 4',
        description: 'Tables are the backbone of almost all web applications.',
        to: '/RegularTables4'
      }
    ]
  },
  {
    label: 'Forms Elements',
    icon: 'pe-7s-menu',
    content: [
      {
        label: 'Layout',
        description:
          'Build whatever layout you need with our modular user interface framework.',
        to: '/FormsLayout'
      },
      {
        label: 'Controls',
        description:
          'Wide selection of forms controls, using a standardised code base, specifically for React.',
        to: '/FormsControls'
      }
    ]
  },
  {
    label: 'Charts',
    icon: 'pe-7s-graph1',
    content: [
      {
        label: 'Apex Charts',
        description:
          'Wonderful animated charts built with ApexCharts components.',
        to: '/ApexCharts'
      }
    ]
  },
  {
    label: 'Maps',
    icon: 'pe-7s-map-2',
    description: 'Implement in your applications Google or vector maps.',
    to: '/Maps'
  }
];

class SidebarMenu extends Component {
  render() {
    return (
      <Fragment>
        <PerfectScrollbar>
          <div className="sidebar-navigation">
            <div className="sidebar-header">
              <span>Navigation menu</span>
            </div>
            <MetisMenu
              content={sidebarMenuContent}
              LinkComponent={RouterLink}
              activeLinkFromLocation
              iconNamePrefix=""
              noBuiltInClassNames={true}
              classNameItemActive="active"
              classNameIcon="sidebar-icon"
              iconNameStateVisible="sidebar-icon-indicator"
              iconNameStateHidden="sidebar-icon-indicator"
              classNameItemHasVisibleChild="submenu-open"
              classNameItemHasActiveChild="active"
              classNameStateIcon="pe-7s-angle-down"
            />
          </div>
        </PerfectScrollbar>
      </Fragment>
    );
  }
}

export default SidebarMenu;
