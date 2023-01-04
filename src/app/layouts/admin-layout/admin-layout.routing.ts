import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { LoginComponent } from 'app/components/login/login.component';
import { AuthGuard } from 'Guards/auth.guard';

export const AdminLayoutRoutes: Routes = [
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // }]}, {
    // path: '',
    // children: [ {
    //   path: 'userprofile',
    //   component: UserProfileComponent
    // }]
    // }, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: MapsComponent
    //     }]
    //}, 
    {
        path: '',
        children: [{
            path: 'typography',
            canActivate: [AuthGuard],
            component: TableListComponent
        }]
    },
    {
        path: '',
        children: [{
            path: 'Pagos',
            canActivate: [AuthGuard],
            component: IconsComponent
        }]
    },
    {
        path: '',
        children: [{
            path: 'Ventas',
            canActivate: [AuthGuard],
            component: TypographyComponent
        }]
    },
    { path: '', children: [{ path: 'Login', component: LoginComponent }] },
    // { path: 'dashboard',      component: DashboardComponent },
    // { path: 'busquedaarticulos',   component: UserProfileComponent },
    // { path: 'infoclientes',     component: TableListComponent },
    // { path: 'ventas',     component: TypographyComponent },
    // { path: 'Pagos',          component: IconsComponent },
    // { path: 'maps',           component: MapsComponent },
    // { path: 'notifications',  component: NotificationsComponent },
    // { path: 'upgrade',        component: UpgradeComponent },
];
