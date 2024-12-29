/* eslint-disable @next/next/no-img-element */

import React, { useContext } from 'react';
import AppMenuitem from './AppMenuitem';
import { LayoutContext } from './context/layoutcontext';
import { MenuProvider } from './context/menucontext';
import Link from 'next/link';
import { AppMenuItem } from '@/types';

const AppMenu = () => {
    const { layoutConfig } = useContext(LayoutContext);

    const model: AppMenuItem[] = [
        {
            label: '',
            icon: 'pi pi-fw pi-briefcase', // General category icon
            to: '/pages',
            items: [
                {
                    label: 'Dashboard',
                    icon: 'pi pi-fw pi-home', // Home or main dashboard icon
                    to: '/',
                },
                {
                    label: 'Company & Service',
                    icon: 'pi pi-fw pi-sitemap', // Hierarchy or company services
                    items: [
                        {
                            label: 'Company',
                            icon: 'pi pi-fw pi-building', // Company or organization icon
                            to: '/pages/companies',
                        },
                        {
                            label: 'Company Code',
                            icon: 'pi pi-fw pi-key', // Code or identifier icon
                            to: '/pages/company-code',
                        },
                        {
                            label: 'Service Sub Type',
                            icon: 'pi pi-fw pi-cog', // Subcategories or settings icon
                            to: '/pages/variations',
                        },
                        {
                            label: 'Service Category',
                            icon: 'pi pi-fw pi-tags', // Tags or categorization icon
                            to: '/pages/service-category',
                        },
                        {
                            label: 'Service',
                            icon: 'pi pi-fw pi-box', // Service or package icon
                            to: '/pages/services',
                        },
                        {
                            label: 'Bundle',
                            icon: 'pi pi-fw pi-database', // Layers or bundles icon
                            to: '/pages/bundle',
                        },
                    ],
                },
                {
                    label: 'Financials',
                    icon: 'pi pi-fw pi-dollar', // Financial or money-related icon
                    items: [
                        {
                            label: 'Money Transactions',
                            icon: 'pi pi-fw pi-wallet', // Wallet for transactions
                            to: '/pages/money-transactions',
                        },
                        {
                            label: 'Payment Method',
                            icon: 'pi pi-fw pi-credit-card', // Credit card for payments
                            to: '/pages/payment-method',
                        },
                        {
                            label: 'Suppliers',
                            icon: 'pi pi-fw pi-truck', // Truck or supplier icon
                            to: '/pages/suppliers',
                        },
                        {
                            label: 'Purchase Products',
                            icon: 'pi pi-fw pi-shopping-cart', // Shopping cart for purchases
                            to: '/pages/purchase-products',
                        },
                        {
                            label: 'Payments',
                            icon: 'pi pi-fw pi-money-bill', // Money bill for payments
                            to: '/pages/payments',
                        },
                        {
                            label: 'Balance',
                            icon: 'pi pi-fw pi-chart-line', // Line chart for balance
                            to: '/pages/balance',
                        },
                    ],
                },
                {
                    label: 'Geographical',
                    icon: 'pi pi-fw pi-globe', // Globe for geographical data
                    items: [
                        {
                            label: 'Country',
                            icon: 'pi pi-fw pi-flag', // Flag for country
                            to: '/pages/country',
                        },
                        {
                            label: 'Province',
                            icon: 'pi pi-fw pi-map', // Map for provinces
                            to: '/pages/province',
                        },
                        {
                            label: 'District',
                            icon: 'pi pi-fw pi-compass', // Compass for district
                            to: '/pages/district',
                        },
                    ],
                },
                {
                    label: 'Reseller',
                    icon: 'pi pi-fw pi-users', // Group or reseller icon
                    to: '/pages/reseller',
                },
                {
                    label: 'Order',
                    icon: 'pi pi-fw pi-shopping-bag', // Bag for orders
                    to: '/pages/order',
                },
                {
                    label: 'Language',
                    icon: 'pi pi-fw pi-globe', // Globe for languages
                    to: '/pages/language',
                },
                {
                    label: 'Currency',
                    icon: 'pi pi-fw pi-money-bill', // Money bill for currency
                    to: '/pages/currencies',
                },
                {
                    label: 'Advertisement',
                    icon: 'pi pi-fw pi-bullhorn', // Bullhorn for advertisements
                    to: '/pages/advertisement',
                },
                {
                    label: 'General Settings',
                    icon: 'pi pi-fw pi-cog', // Cogwheel for settings
                    to: '/pages/general-settings',
                },
            ],
        },
    ];


    return (
        <MenuProvider>
            <ul className="layout-menu">
                {model.map((item, i) => {
                    return !item?.seperator ? <AppMenuitem item={item} root={true} index={i} key={item.label} /> : <li className="menu-separator"></li>;
                })}


            </ul>
        </MenuProvider>
    );
};

export default AppMenu;
